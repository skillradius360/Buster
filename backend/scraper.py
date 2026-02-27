import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin, parse_qs
import yt_dlp
import re
import json
from typing import Any

HTTP = requests.Session()
HTTP.trust_env = False


def _decode_js_escaped_text(text: str) -> str:
    """Best-effort decode for JS-escaped JSON blobs embedded in HTML."""
    try:
        return bytes(text, "utf-8").decode("unicode_escape")
    except Exception:
        return text


def _extract_balanced_json_object(text: str, object_start: int) -> str | None:
    """Extract a {...} JSON object by brace matching starting at object_start."""
    if object_start < 0 or object_start >= len(text) or text[object_start] != "{":
        return None

    depth = 0
    in_string = False
    escape = False

    for idx in range(object_start, len(text)):
        ch = text[idx]

        if in_string:
            if escape:
                escape = False
            elif ch == "\\":
                escape = True
            elif ch == '"':
                in_string = False
            continue

        if ch == '"':
            in_string = True
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                return text[object_start:idx + 1]

    return None


def _extract_json_objects_after_marker(text: str, marker: str) -> list[str]:
    """Find all JSON objects that directly follow a marker like '\"gql_data\":'."""
    blobs: list[str] = []
    pos = 0

    while True:
        marker_index = text.find(marker, pos)
        if marker_index == -1:
            break

        start = marker_index + len(marker)
        while start < len(text) and text[start].isspace():
            start += 1

        if start < len(text) and text[start] == "{":
            blob = _extract_balanced_json_object(text, start)
            if blob:
                blobs.append(blob)
                pos = start + len(blob)
                continue

        pos = marker_index + len(marker)

    return blobs


def _json_load_loose(payload: str) -> dict[str, Any] | None:
    """Best-effort JSON loader for normal JSON and escaped JSON text."""
    candidates: list[str] = []
    stripped = payload.strip().rstrip(";")
    if not stripped:
        return None

    candidates.append(stripped)

    # Sometimes the payload itself is a JSON-encoded string containing JSON.
    if stripped.startswith('"') and stripped.endswith('"'):
        try:
            inner = json.loads(stripped)
            if isinstance(inner, str):
                candidates.append(inner)
        except Exception:
            pass

    decoded = _decode_js_escaped_text(stripped)
    if decoded != stripped:
        candidates.append(decoded)

    for candidate in candidates:
        try:
            loaded = json.loads(candidate)
            if isinstance(loaded, dict):
                return loaded
        except Exception:
            continue

    return None


def _get_nested_dict(data: dict[str, Any], path: tuple[str, ...]) -> dict[str, Any] | None:
    cur: Any = data
    for key in path:
        if not isinstance(cur, dict):
            return None
        cur = cur.get(key)
    return cur if isinstance(cur, dict) else None


def _extract_shortcode_media_candidates(payload: dict[str, Any]) -> list[dict[str, Any]]:
    """Extract likely shortcode_media dicts without scanning unrelated structures."""
    candidates: list[dict[str, Any]] = []
    seen_ids: set[int] = set()

    for path in (
        ("graphql", "shortcode_media"),
        ("data", "graphql", "shortcode_media"),
        ("gql_data", "shortcode_media"),
        ("shortcode_media",),
    ):
        media = _get_nested_dict(payload, path)
        if media and id(media) not in seen_ids:
            seen_ids.add(id(media))
            candidates.append(media)

    # Fallback for schema drift: shallow recursive search for shortcode_media.
    if not candidates:
        stack: list[Any] = [payload]
        while stack:
            node = stack.pop()
            if isinstance(node, dict):
                media = node.get("shortcode_media")
                if isinstance(media, dict) and id(media) not in seen_ids:
                    seen_ids.add(id(media))
                    candidates.append(media)
                stack.extend(node.values())
            elif isinstance(node, list):
                stack.extend(node)

    return candidates


def _normalize_image_url(url: Any) -> str | None:
    if not isinstance(url, str):
        return None
    normalized = url.replace("\\/", "/").replace("&amp;", "&").strip()
    if normalized.startswith("//"):
        normalized = "https:" + normalized
    if not normalized.startswith("http"):
        return None
    return normalized


def _extract_instagram_images_from_payload(payload: dict[str, Any]) -> list[str]:
    results: list[str] = []
    seen: set[str] = set()

    for media in _extract_shortcode_media_candidates(payload):
        sidecar_edges = (
            media.get("edge_sidecar_to_children", {}).get("edges", [])
            if isinstance(media.get("edge_sidecar_to_children"), dict)
            else []
        )

        # Carousel post: take child nodes only.
        if isinstance(sidecar_edges, list) and sidecar_edges:
            for edge in sidecar_edges:
                node = edge.get("node") if isinstance(edge, dict) else None
                if not isinstance(node, dict) or node.get("is_video"):
                    continue
                img_url = _normalize_image_url(node.get("display_url"))
                if img_url and img_url not in seen:
                    seen.add(img_url)
                    results.append(img_url)
            continue

        # Single image post fallback.
        if media.get("is_video"):
            continue
        img_url = _normalize_image_url(media.get("display_url"))
        if img_url and img_url not in seen:
            seen.add(img_url)
            results.append(img_url)

    return results


def _extract_instagram_embed_images(html: str) -> list[str]:
    """
    Extract Instagram media images from embed HTML via structured JSON payloads.
    Supports both legacy `window.__additionalDataLoaded(...)` and newer `gql_data`.
    """
    payload_texts: list[str] = []

    decoded_html = _decode_js_escaped_text(html)
    sources = [html] if decoded_html == html else [html, decoded_html]

    additional_data_pattern = r"window\.__additionalDataLoaded\([^,]+,(.*?)\);<\/script>"
    for source in sources:
        for match in re.finditer(additional_data_pattern, source, flags=re.DOTALL):
            payload_texts.append(match.group(1))

        payload_texts.extend(_extract_json_objects_after_marker(source, '"gql_data":'))
        payload_texts.extend(_extract_json_objects_after_marker(source, '"graphql":'))

    all_urls: list[str] = []
    seen_urls: set[str] = set()

    for payload_text in payload_texts:
        payload = _json_load_loose(payload_text)
        if not payload:
            continue

        for url in _extract_instagram_images_from_payload(payload):
            if url not in seen_urls:
                seen_urls.add(url)
                all_urls.append(url)

    return all_urls


def scrape_image_url(url: str) -> list[str]:
    """
    Attempts to scrape the main images from the given URL using:
    1. Direct file extensions (including via query params and nested URLs)
    2. Instagram Embed Parsing (for Carousels)
    3. yt-dlp (Universal Social Media Extractor for X, TikTok, YouTube)
    4. OpenGraph / Twitter Cards (BeautifulSoup Fallback)
    
    Returns a list of image URLs found.
    """
    print(f"Scraping -> {url}")
    found_urls = []
    
    # 0. Check if the URL itself contains another URL in the query parameters (e.g., reddit.com/media?url=https://...)
    parsed_query = parse_qs(urlparse(url).query)
    if 'url' in parsed_query:
        nested_url = parsed_query['url'][0]
        nested_path = urlparse(nested_url).path.lower()
        if any(nested_path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic']):
            return [nested_url]

    # 1. Direct Image Check (ignoring query parameters!)
    parsed_path = urlparse(url).path.lower()
    if any(parsed_path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic']):
        return [url]

    # 2. Instagram Embed Hack (best for carousels without login walls)
    if "instagram.com" in url.lower():
        try:
            # Clean the URL to point exactly to the post /embed/ page
            clean_url = url.split('?')[0].rstrip('/')
            if not clean_url.endswith('embed'):
                clean_url += '/embed/'
            
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'text/html',
                'Accept-Language': 'en-US,en;q=0.9'
            }
            embed_resp = HTTP.get(clean_url, headers=headers, timeout=15)
            if embed_resp.status_code == 200:
                print("Instagram Embed Page Reachable. Searching for carousel images...")

                final_insta_links = _extract_instagram_embed_images(embed_resp.text)
                if final_insta_links:
                    print(f"Insta Embed Success! Found {len(final_insta_links)} post image(s).")
                    return final_insta_links
        except Exception as e:
            print(f"Instagram Embed trick failed: {e}")

    # 3. Universal Social Media Extraction using yt-dlp
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True,
        'skip_download': True
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info:
                if 'thumbnails' in info and len(info['thumbnails']) > 0:
                    thumbs = sorted(info['thumbnails'], key=lambda x: x.get('width', 0) or 0, reverse=True)
                    print(f"yt-dlp found thumbnail: {thumbs[0]['url']}")
                    return [thumbs[0]['url']]
                if info.get('thumbnail'):
                    print(f"yt-dlp found thumbnail: {info['thumbnail']}")
                    return [info['thumbnail']]
    except Exception as e:
        print(f"yt-dlp fast extract failed or didn't apply (often expected): {url}")
        
    # 4. BeautifulSoup Fallback (OpenGraph tags)
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        }
        
        response = HTTP.get(url, headers=headers, timeout=15)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Look for OpenGraph image
        og_image = soup.find('meta', property='og:image')
        if og_image and og_image.get('content') and not "login" in og_image.get('content').lower():
            print(f"BeautifulSoup found OG image: {og_image['content']}")
            return [urljoin(url, og_image['content'])]

        # Look for Twitter card image
        twitter_image = soup.find('meta', attrs={'name': 'twitter:image'})
        if twitter_image and twitter_image.get('content'):
            print(f"BeautifulSoup found Twitter image: {twitter_image['content']}")
            return [urljoin(url, twitter_image['content'])]

        # Fallback: Find the first reasonably large image on the page
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                if not any(x in src.lower() for x in ['icon', 'logo', 'pixel', 'tracker']):
                     print(f"BeautifulSoup fallback to first image: {src}")
                     return [urljoin(url, src)]
    except Exception as e:
        print(f"Error scraping with BeautifulSoup {url}: {e}")
        
    return []

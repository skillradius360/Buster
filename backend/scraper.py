import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin, parse_qs
import yt_dlp

def scrape_image_url(url: str) -> str:
    """
    Attempts to scrape the main image from the given URL using:
    1. Direct file extensions (including via query params and nested URLs)
    2. yt-dlp (Universal Social Media Extractor for Instagram, X, TikTok, YouTube)
    3. OpenGraph / Twitter Cards (BeautifulSoup Fallback)
    """
    print(f"Scraping -> {url}")
    
    # 0. Check if the URL itself contains another URL in the query parameters (e.g., reddit.com/media?url=https://...)
    parsed_query = parse_qs(urlparse(url).query)
    if 'url' in parsed_query:
        nested_url = parsed_query['url'][0]
        # Recursively check the nested URL
        # We only return it if it's a direct image, otherwise we let the main logic continue
        nested_path = urlparse(nested_url).path.lower()
        if any(nested_path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic']):
            return nested_url

    # 1. Direct Image Check (ignoring query parameters!)
    parsed_path = urlparse(url).path.lower()
    if any(parsed_path.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.heic']):
        return url

    # 2. Universal Social Media Extraction using yt-dlp
    # yt-dlp is extremely good at bypassing login walls for IG, X, and others to grab thumbnails/media.
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'extract_flat': True, # don't download videos, just meta
        'skip_download': True
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            if info:
                # If it's an Instagram post with multiple images, try to get the first one's thumbnail
                if 'thumbnails' in info and len(info['thumbnails']) > 0:
                    # Sort to get the highest quality thumbnail
                    thumbs = sorted(info['thumbnails'], key=lambda x: x.get('width', 0) or 0, reverse=True)
                    print(f"yt-dlp found thumbnail: {thumbs[0]['url']}")
                    return thumbs[0]['url']
                
                # Check for direct thumbnail key
                if info.get('thumbnail'):
                    print(f"yt-dlp found thumbnail: {info['thumbnail']}")
                    return info['thumbnail']
    except Exception as e:
        print(f"yt-dlp fast extract failed or didn't apply (often expected): {url}")
        
    # 3. BeautifulSoup Fallback (OpenGraph tags)
    try:
        # We need headers to fake a browser
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()

        soup = BeautifulSoup(response.text, 'html.parser')

        # Look for OpenGraph image
        og_image = soup.find('meta', property='og:image')
        if og_image and og_image.get('content') and not "login" in og_image.get('content').lower():
            print(f"BeautifulSoup found OG image: {og_image['content']}")
            return urljoin(url, og_image['content'])

        # Look for Twitter card image
        twitter_image = soup.find('meta', attrs={'name': 'twitter:image'})
        if twitter_image and twitter_image.get('content'):
            print(f"BeautifulSoup found Twitter image: {twitter_image['content']}")
            return urljoin(url, twitter_image['content'])

        # Fallback: Find the first reasonably large image on the page
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                if not any(x in src.lower() for x in ['icon', 'logo', 'pixel', 'tracker']):
                     print(f"BeautifulSoup fallback to first image: {src}")
                     return urljoin(url, src)

        return None
    except Exception as e:
        print(f"Error scraping with BeautifulSoup {url}: {e}")
        return None

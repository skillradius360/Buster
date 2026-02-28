# Instagram Carousel Scraping Issue

## The Problem
Buster aims to scrape and analyze all images from an Instagram carousel post (e.g., `https://www.instagram.com/p/DUDmwcmjFX-/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==`). However, Instagram implements aggressive anti-scraping and CDN hotlinking protections.

Currently, the scraper is failing to reliably extract the 5 actual carousel images. Instead, it is either:
1. Returning unrelated images from the page (like profile pictures, recommended posts, or just the Instagram icon).
2. Returning only the *first* image of the carousel.
3. Returning broken images on the frontend due to CORS/Referer blocking by Instagram's CDN.

## What Has Been Tried & The Results

### 1. Direct `yt-dlp` Extraction
- **Approach**: Passed the URL to `yt-dlp` intending to use its Instagram extractor.
- **Result**: `yt-dlp` often requires cookies or a login to bypass Instagram's web barriers for multi-image posts. Without authentication, it only reliably grabs the first thumbnail or fails.

### 2. BeautifulSoup OpenGraph Parsing
- **Approach**: Scraped the main URL directly and looked for `<meta property="og:image">`.
- **Result**: Only returns the cover (first) image of the carousel. Cannot access the subsequent slides.

### 3. Instagram `/embed/` Hack (Regex approach)
- **Approach**: Modify the URL to point to `instagram.com/p/.../embed/` to bypass the login wall. Then, used a regex (`re.findall(r'\"(https?:\/\/[^\"]+\.(?:jpg|jpeg|png|webp|heic)[^\"]*)\"', html)`) to grab all image links on the page, filtering out small resolutions.
- **Result**: Failed. It accidentally grabbed profile avatars, UI icons, and the "More posts from this user" thumbnails because the regex was too broad.

### 4. BeautifulSoup on `/embed/` (Class matching)
- **Approach**: Used `soup.find_all('img', class_='EmbeddedMediaImage')` on the embed page.
- **Result**: Failed. Instagram only renders the *first* active slide of the carousel in the actual DOM `<img class="EmbeddedMediaImage">` to save load time. The other 4 slides are hidden inside a minified Javascript JSON object.

### 5. Regex for `"display_url"` in `/embed/`
- **Approach**: Realizing the carousel data is in a JS object, used strict regex `re.findall(r'"display_url":"(https?:\/\/[^"]+)"', embed_resp.text)`.
- **Result**: Failed. According to the user, this is currently returning just the Instagram icon as a single image. The regex likely matched an unexpected `display_url` structure, or the embed payload fundamentally changed its key names for the actual slide images vs UI elements.

## The Core Technical Blocks
1. **Hidden Carousel Data**: Instagram's embed payload stores carousel slides inside `window.__additionalDataLoaded` JSON, specifically nested deep under `graphql` -> `shortcode_media` -> `edge_sidecar_to_children`. 
2. **Regex Unreliability**: Minified React/Relay state strings change frequently. Relying on simple string matching (like `"display_url"`) catches UI components and tracking pixels instead of the high-res photos.
3. **CORS/Hotlink Protection**: Even when the correct CDN links `.fna.fbcdn.net` are found, rendering them directly in an `<img src="...">` on `localhost` triggers a `403 Forbidden` from Facebook's CDN because it detects a Cross-Origin Referer.
    - *Note*: We bypass this currently by having the FastAPI backend download the image bytes into memory and base64 encoding them for the frontend (`res.base64_image`), which works perfectly, *if* the backend scrapes the right URLs in the first place.

## Instructions for the Next LLM / Developer
1. Open `backend/scraper.py`. Look at the `scrape_image_url` function, specifically the `instagram.com` block.
2. The current logic using `re.findall(r'"display_url":"(https?:\/\/[^"]+)"', embed_resp.text)` is broken.
3. **The Fix**: You must cleanly extract and parse the JSON state from the embed page. 
   - Extract the JSON string using `re.search(r'window\.__additionalDataLoaded\([^,]+,(.*?)\);<\/script>', html)`.
   - Use `json.loads()` to parse it.
   - Navigate to `data['graphql']['shortcode_media']['edge_sidecar_to_children']['edges']`.
   - Loop through the edges and extract `node['display_url']` (skipping `is_video: true`).
4. Ensure the backend returns the correct `list[str]` of valid `.fbcdn.net` high-res carousel images, so `main.py` can download and process all 5 of them.

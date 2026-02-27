# Buster 🕵️‍♂️

**Buster** is an AI-powered deepfake and AI-generated image detector. Paste a link from Instagram, X, YouTube, TikTok, Reddit, or any website, and Buster will perform a forensic-grade analysis to determine if the image is REAL or FAKE. 

It handles complex scraping (including multi-image Instagram carousels and bypassing login walls using `yt-dlp` and embed hacks) and routes the extracted images through a multi-model **Ensemble System** to catch even the most hyper-realistic V2 Gen-AI images.

## Features
- **Universal Scraper:** Extracts high-resolution images from social media links.
- **Carousel Support:** Detects and processes all images within Instagram carousel posts.
- **Ensemble AI Gate:** Runs images simultaneously against top Hugging Face Vision models.
- **Instant Verdicts:** Flags images with a confidence percentage and matching model attribution.

## Tech Stack
- **Frontend**: Next.js (React), TailwindCSS
- **Backend**: FastAPI (Python), yt-dlp, BeautifulSoup4, Hugging Face Inference API

## How to Run
You need to run both the backend and frontend simultaneously. See their respective READMEs for setup instructions:
- [Backend Setup & API Info](./backend/README.md)
- [Frontend Setup](./frontend/buster/README.md)

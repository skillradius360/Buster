# Buster Backend ⚙️

The powerhouse of **Buster**. It extracts images from almost anywhere using an advanced scraper, downloads the bytes directly into memory, and passes them to "The Gate", an ensemble of top-tier AI detecting machine learning models.

## AI Ensemble Models Used
The system simultaneously tests images against these 3 specific Hugging Face computer vision models. If *any* of them detect a fake signature over **45%**, the image is flagged.
1. [PrithivMLmods/Deep-Fake-Detector-v2-Model](https://huggingface.co/prithivMLmods/Deep-Fake-Detector-v2-Model)
   - Specialized in catching hyper-realistic V2 Gen-AI image generators like Midjourney V6.
2. [umm-maybe/AI-image-detector](https://huggingface.co/umm-maybe/AI-image-detector)
   - Exceptional at spotting standard AI artifacts and diffusion model traits.
3. [dima806/deepfake_vs_real_image_detection](https://huggingface.co/dima806/deepfake_vs_real_image_detection)
   - Highly accurate at identifying Deepfake manipulations, primarily focusing on human faces.

## Installation 

1. Create a Python Virtual Environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

2. Install Requirements:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure Environment Variables:
   - Create a `.env` file referencing the `.env.example` structure.
   - You MUST add your personal `HUGGING_FACE_TOKEN` with Inference privileges enabled.

4. Run the FastAPI Server:
   ```bash
   uvicorn main:app --reload
   ```
   *The server runs on http://localhost:8000.*

## Core Routes
- `POST /analyze` 
  - Send JSON `{"url": "https://..."}` 
  - Retrieves multiple images if a carousel link is passed, executes the ensemble AI processing, and returns a verified array of multi-image analysis payloads.

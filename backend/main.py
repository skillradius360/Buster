import os
import requests
import base64
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

from scraper import scrape_image_url

# Load environment variables (like HUGGING_FACE_TOKEN)
load_dotenv()
HF_TOKEN = os.getenv("HUGGING_FACE_TOKEN", "")

app = FastAPI(title="Buster API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalyzeRequest(BaseModel):
    url: str

def query_hf_api(model_id: str, image_bytes: bytes, json_payload: dict = None):
    # Hugging Face recently moved their API from api-inference.huggingface.co -> router.huggingface.co/hf-inference
    url = f"https://router.huggingface.co/hf-inference/models/{model_id}"
    headers = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}
    
    if json_payload:
        response = requests.post(url, headers=headers, json=json_payload)
    else:
        headers["Content-Type"] = "application/octet-stream"
        response = requests.post(url, headers=headers, data=image_bytes)
        
    if response.status_code != 200:
        raise Exception(f"Hugging Face API Error ({response.status_code}): {response.text}")
    return response.json()

def image_gate(image_bytes: bytes) -> str:
    """
    THE GATE: Uses a general Vision-Language model (CLIP) to categorize the image,
    and returns the best model ID to use for the Deepfake detection.
    """
    print("GATE: Analyzing image content to pick the perfect model...")
    gate_model = "openai/clip-vit-base-patch32"
    
    b64_image = base64.b64encode(image_bytes).decode('utf-8')
    payload = {
        "inputs": b64_image,
        "parameters": {
            "candidate_labels": [
                "a photo of a person's face", 
                "a landscape, art, or generic scene", 
                "a general object"
            ]
        }
    }
    
    try:
        results = query_hf_api(gate_model, None, json_payload=payload)
        top_label = results[0]['label']
        print(f"GATE RESULT: Image classified as -> '{top_label}'")
        
        if "face" in top_label:
            return "dima806/deepfake_vs_real_image_detection"
        elif "landscape" in top_label or "art" in top_label:
            return "Nahrawy/AI_Generated_Image_Detection"
        else:
            return "umm-maybe/AI-image-detector"
            
    except Exception as e:
        print(f"GATE FAILED: {e}. Falling back to default general model.")
        return "umm-maybe/AI-image-detector"

@app.get("/")
def read_root():
    return {"message": "Buster Backend is running! (Hugging Face API Mode)"}

@app.post("/analyze")
def analyze_url(request: AnalyzeRequest):
    if not HF_TOKEN:
        print("WARNING: No HUGGING_FACE_TOKEN found in .env. API calls might fail due to rate limits.")

    print(f"Analyzing URL: {request.url}")
    
    # 1. Scrape the image
    image_url = scrape_image_url(request.url)
    if not image_url:
        raise HTTPException(status_code=400, detail="Could not extract a valid image from the provided URL.")
    print(f"Found image: {image_url}")
    
    # 2. Download the image bytes
    try:
        if image_url.startswith("data:"):
            # It's a base64 encoded string from yt-dlp or scraper
            header, encoded = image_url.split(",", 1)
            image_bytes = base64.b64decode(encoded)
        else:
            headers = {'User-Agent': 'Mozilla/5.0'}
            response = requests.get(image_url, headers=headers, timeout=10)
            response.raise_for_status()
            image_bytes = response.content
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to download image: {e}")

    # 3. Enter The Gate
    best_model_id = image_gate(image_bytes)
    print(f"ROUTING TO MODEL: {best_model_id}")

    # 4. Run the chosen model
    try:
        predictions = query_hf_api(best_model_id, image_bytes)
        print("Model predictions:", predictions)
        
        # Sort by confidence
        if isinstance(predictions, list) and len(predictions) > 0:
            if isinstance(predictions[0], dict) and 'score' in predictions[0]:
                predictions.sort(key=lambda x: x['score'], reverse=True)
                top_prediction = predictions[0]
                return {
                    "status": "success",
                    "url": request.url,
                    "scraped_image_url": image_url,
                    "model_used": best_model_id,
                    "result": top_prediction["label"].upper(),
                    "confidence": top_prediction["score"],
                    "raw_predictions": predictions
                }
        return {
             "status": "success",
             "url": request.url,
             "scraped_image_url": image_url,
             "model_used": best_model_id,
             "raw_response": str(predictions)
        }
            
    except Exception as e:
         raise HTTPException(status_code=500, detail=f"Inference failed via Hugging Face API: {e}")




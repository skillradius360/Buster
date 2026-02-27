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

# Ignore machine-level proxy env vars (some setups point to dead localhost proxies).
HTTP = requests.Session()
HTTP.trust_env = False

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
    url = f"https://router.huggingface.co/hf-inference/models/{model_id}"
    headers = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}
    
    if json_payload:
        response = HTTP.post(url, headers=headers, json=json_payload, timeout=45)
    else:
        headers["Content-Type"] = "application/octet-stream"
        response = HTTP.post(url, headers=headers, data=image_bytes, timeout=45)
        
    if response.status_code != 200:
        raise Exception(f"Hugging Face API Error ({response.status_code}): {response.text}")
    return response.json()

def analyze_ensemble(image_bytes: bytes) -> dict:
    """
    THE GATE: Ensemble Analysis System
    Instead of relying on one model, we test the image against the best modern detectors.
    If ANY model detects > 45% AI signatures (lowering threshold to catch ultra-realistic Midjourney V6), we flag it!
    """
    print("GATE: Running Ensemble Analysis...")
    
    models = [
        "prithivMLmods/Deep-Fake-Detector-v2-Model", # Excellent for hyper-realistic V2 Gen-AI
        "umm-maybe/AI-image-detector",               # Excellent for general artifacts
        "dima806/deepfake_vs_real_image_detection"   # Excellent for face deepfakes
    ]
    
    highest_fake_score = 0.0
    best_fake_result = None
    
    highest_real_score = 0.0
    best_real_result = None
    
    fake_labels = ['fake', 'artificial', 'deepfake', 'ai']
    
    for model_id in models:
        try:
            print(f"  -> Testing against {model_id}...")
            predictions = query_hf_api(model_id, image_bytes)
            
            if isinstance(predictions, list) and len(predictions) > 0 and 'score' in predictions[0]:
                for p in predictions:
                    label = p['label'].lower()
                    score = p['score']
                    
                    if any(f_lbl in label for f_lbl in fake_labels):
                        if score > highest_fake_score:
                            highest_fake_score = score
                            best_fake_result = {"model": model_id, "confidence": score, "raw": predictions}
                    else:
                        if score > highest_real_score:
                            highest_real_score = score
                            best_real_result = {"model": model_id, "confidence": score, "raw": predictions}
                            
        except Exception as e:
            print(f"  -> Model {model_id} failed or timed out: {e}")
            pass
            
    # Decision Engine: 
    # If the combined ensemble fake score is surprisingly high (> 45%), we call it FAKE.
    # Hyper-realistic AI images often score around 49-51%.
    if highest_fake_score > 0.45:
        return {
            "model_used": best_fake_result["model"],
            "result": "FAKE",
            "confidence": highest_fake_score,
            "raw_predictions": best_fake_result["raw"]
        }
    elif best_real_result:
        return {
            "model_used": best_real_result["model"],
            "result": "REAL",
            "confidence": highest_real_score,
            "raw_predictions": best_real_result["raw"]
        }
    else:
        raise Exception("Ensemble could not produce a valid prediction from any model.")

@app.get("/")
def read_root():
    return {"message": "Buster Backend is running! (Ensemble API Mode)"}

@app.post("/analyze")
def analyze_url(request: AnalyzeRequest):
    if not HF_TOKEN:
        print("WARNING: No HUGGING_FACE_TOKEN found in .env. API calls might fail due to rate limits.")

    print(f"Analyzing URL: {request.url}")
    
    # 1. Scrape the image(s)
    image_urls = scrape_image_url(request.url)
    if not image_urls:
        raise HTTPException(status_code=400, detail="Could not extract any valid images from the provided URL.")
    
    print(f"Found {len(image_urls)} image(s) to process.")
    
    final_results = []
    
    for idx, image_url in enumerate(image_urls):
        print(f"--- Processing Image {idx+1}/{len(image_urls)} ---")
        # 2. Download the image bytes
        try:
            if image_url.startswith("data:"):
                # It's a base64 encoded string from yt-dlp or scraper
                header, encoded = image_url.split(",", 1)
                image_bytes = base64.b64decode(encoded)
            else:
                headers = {'User-Agent': 'Mozilla/5.0'}
                response = HTTP.get(image_url, headers=headers, timeout=15)
                response.raise_for_status()
                image_bytes = response.content
        except Exception as e:
            print(f"Failed to download image {image_url}: {e}")
            continue

        # 3. Enter The Gate Ensemble
        try:
            ensemble_decision = analyze_ensemble(image_bytes)
            print(f"DECISION: {ensemble_decision['result']} via {ensemble_decision['model_used']} (Conf: {ensemble_decision['confidence']})")
            
            final_results.append({
                "scraped_image_url": image_url,
                "base64_image": "data:image/jpeg;base64," + base64.b64encode(image_bytes).decode('utf-8'),
                "model_used": ensemble_decision['model_used'],
                "result": ensemble_decision['result'],
                "confidence": ensemble_decision['confidence'],
                "raw_predictions": ensemble_decision['raw_predictions']
            })
        except Exception as e:
             print(f"Inference failed for image {image_url}: {e}")
             continue
             
    if not final_results:
        raise HTTPException(status_code=500, detail="Analysis failed for all extracted images.")

    return {
        "status": "success",
        "url": request.url,
        "results": final_results
    }




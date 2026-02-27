from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("HUGGING_FACE_TOKEN", "")

def test_inference_client():
    client = InferenceClient(token=token)
    
    from PIL import Image
    import io
    img = Image.new('RGB', (224, 224), color = 'red')
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='JPEG')
    img_bytes = img_byte_arr.getvalue()
    
    try:
        # Zero-shot classification gate
        gate_res = client.post(json={"inputs": "i love you", "parameters": {"candidate_labels": ["good", "bad"]}}, model="openai/clip-vit-base-patch32")
        print("GATE TEXT SUCCESS:", gate_res)
    except Exception as e:
        print("GATE TEXT FAIl:", e)

    try:
        res = client.image_classification(img_bytes, model="dima806/deepfake_vs_real_image_detection")
        print("dima success:", res)
    except Exception as e:
        print("dima FAIL:", e)

if __name__ == "__main__":
    test_inference_client()

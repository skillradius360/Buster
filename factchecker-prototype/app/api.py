"""
api.py
------
FastAPI application for the Instagram Fact-Checker.

Endpoints:
  - GET  /api/fact-check?url=...&version=v1|v2
  - POST /api/fact-check
"""

import logging
from typing import Optional, Literal

from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict

import scraper
import preprocessor
import fact_checker
import fact_checker_v2


# ============================================================
# LOGGING CONFIG
# ============================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Instagram Fact-Checker API",
    description="Verify Instagram posts using AI vision, web search, and reasoning",
    version="1.0.0",
)

# ============================================================
# CORS CONFIG (IMPORTANT FOR FRONTEND)
# ============================================================

# Allow all origins - API is publicly accessible
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# PYDANTIC MODELS
# ============================================================

class FactCheckRequest(BaseModel):
    url: str = Field(..., description="Instagram post URL")
    version: Literal["v1", "v2"] = Field("v1", description="Fact-checker version")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "url": "https://www.instagram.com/p/DUDmwcmjFX-/",
                "version": "v1"
            }
        }
    )


class ClaimDetail(BaseModel):
    claim: str
    verdict: str
    evidence: Optional[str] = None


class FactCheckResponse(BaseModel):
    post_url: str
    owner: str
    verdict: Literal["REAL", "FAKE", "MISLEADING", "NOT ENOUGH INFO"]
    confidence: Literal["LOW", "MEDIUM", "HIGH"]
    explanation: str
    key_sources: list[str] = []
    extracted_claims: Optional[list[str]] = None
    claim_details: Optional[list[ClaimDetail]] = None
    engine: Optional[str] = None

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "post_url": "https://www.instagram.com/p/DUDmwcmjFX-/",
                "owner": "aiwith.akash",
                "verdict": "MISLEADING",
                "confidence": "MEDIUM",
                "explanation": "The claim is partially supported by evidence...",
                "key_sources": ["https://reuters.com", "https://bbc.com"],
                "extracted_claims": ["Everyone has access to AI now"],
                "engine": "v1-pipeline"
            }
        }
    )


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None


# ============================================================
# ROUTES
# ============================================================

@app.get("/")
async def root():
    return {
        "status": "ok",
        "message": "Instagram Fact-Checker API",
        "docs": "/docs",
    }


@app.get("/api/fact-check", response_model=FactCheckResponse)
async def fact_check_get(
    url: str = Query(...),
    version: Literal["v1", "v2"] = Query("v1")
):
    logger.info(f"GET request received for URL: {url}")
    request = FactCheckRequest(url=url, version=version)
    return await _process_fact_check(request)


@app.post("/api/fact-check", response_model=FactCheckResponse)
async def fact_check_post(request: FactCheckRequest):
    logger.info(f"POST request received for URL: {request.url}")
    return await _process_fact_check(request)


# ============================================================
# MAIN PROCESSING LOGIC
# ============================================================

async def _process_fact_check(request: FactCheckRequest) -> FactCheckResponse:

    url = request.url.strip()
    version = request.version

    if not url:
        raise HTTPException(status_code=400, detail="URL cannot be empty")

    logger.info("Starting scrape...")

    # 1️⃣ Scrape
    try:
        post_data = scraper.scrape(url)
    except scraper.VideoPostError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scraping failed: {str(e)}")

    logger.info("Preprocessing...")

    # 2️⃣ Preprocess
    try:
        preprocessed = preprocessor.preprocess(post_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Preprocessing failed: {str(e)}")

    logger.info(f"Running fact-check engine {version}...")

    # 3️⃣ Fact-check
    try:
        if version == "v2":
            result = fact_checker_v2.run(preprocessed)
        else:
            result = fact_checker.run(preprocessed)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fact-checking failed: {str(e)}")

    logger.info("Building response...")

    # 4️⃣ Build response
    claim_details = None
    if version == "v2" and "claim_details" in result:
        claim_details = [
            ClaimDetail(**cd) if isinstance(cd, dict) else cd
            for cd in result.get("claim_details", [])
        ]

    return FactCheckResponse(
        post_url=result.get("post_url", ""),
        owner=result.get("owner", "unknown"),
        verdict=result.get("verdict", "NOT ENOUGH INFO"),
        confidence=result.get("confidence", "LOW"),
        explanation=result.get("explanation", ""),
        key_sources=result.get("key_sources", []),
        extracted_claims=result.get("extracted_claims"),
        claim_details=claim_details,
        engine=result.get("engine", f"{version}-pipeline")
    )


# ============================================================
# EXCEPTION HANDLERS
# ============================================================

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTPException: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": f"HTTP {exc.status_code}",
            "detail": exc.detail
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.exception("Unhandled exception occurred")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "detail": str(exc)
        }
    )


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 10000)) or 10000
    uvicorn.run("api:app", host="0.0.0.0", port=port)
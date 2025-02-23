# api/main.py
import logging
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Allow all methods (POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)
# Define request model
class URLRequest(BaseModel):
    url: str

# Utility function to capitalize header keys
def capitalize_header_key(key: str) -> str:
    return "-".join(part.capitalize() for part in key.split("-"))

# Define the endpoint
@app.post("/analyze")
async def analyze_url(request: URLRequest):
    try:
        logger.info(f"Received request to analyze URL: {request.url}")
        async with httpx.AsyncClient() as client:
            response = await client.get(request.url, timeout=10.0)

        headers = {capitalize_header_key(key): value for key, value in response.headers.items()}
        body = response.text
        http_version = f"HTTP/{response.http_version}"

        service_name = headers.get("Server", "Unknown")

        result = {
            "headers": headers,
            "body": body,
            "http_version": http_version,
            "analysis": {
                "service_name": service_name,
                "status_code": response.status_code,
                "content_length": headers.get("Content-Length", "N/A")
            }
        }
        logger.info(f"Successfully analyzed URL: {request.url}")
        return result

    except httpx.RequestError as e:
        logger.error(f"Error fetching URL {request.url}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching URL: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

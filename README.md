# HTTP Response Automation

## Overview
A web application that sends HTTP requests to a user-provided URL, retrieves the response, and displays headers and analysis in a structured format. Built with FastAPI (backend) and Next.js with TypeScript (frontend).

## Objectives
- Send HTTP requests using Python and FastAPI.
- Process and extract response headers and body.
- Display results in a user-friendly UI with highlighted key information (HTTP version, service name).
- Implement error handling and logging.

## Features
- Dynamic URL input via a text box.
- Separate cards for headers and response analysis.
- Highlighted HTTP version and service name.
- Type-safe frontend with TypeScript using global CSS.

## Setup
1. **Backend**:
   - Install dependencies: `pip install fastapi uvicorn httpx pydantic`
   - Run: `uvicorn main:app --reload`

2. **Frontend**:
   - Install: `npx create-next-app@latest http-analyzer --typescript`
   - Run: `npm run dev`

## Usage
### Docker Deployment
1. `docker pull sarthakpriyadarshi/http-analyzer-app:latest`
2. `docker run -p 3000:3000 -p 8000:8000 sarthakpriyadarshi/http-analyzer-app`

### Local Deployment

1. Start the backend (`http://localhost:8000`).
2. Start the frontend (`http://localhost:3000`).
3. Enter a URL (e.g., `https://example.com`) and click "Go".

## Submission
- Submitted by: Sarthak Priyadarshi
- Date: 23 February 2025
- Via: Google Form (as per Albus Security instructions)
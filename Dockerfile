# Use a base image with both Python and Node.js
FROM node:18-bullseye AS base

# Set the working directory
WORKDIR /app

# ---- Install Backend Dependencies ----
# Copy and install Python dependencies
COPY http_server/requirements.txt /backend/
RUN apt-get update && apt-get install -y python3 python3-pip && \
    pip3 install --no-cache-dir -r /backend/requirements.txt

# ---- Install Frontend Dependencies ----
# Copy frontend dependencies and install them
COPY package.json package-lock.json ./
RUN npm install

# ---- Copy Application Code ----
COPY . .

# Build the Next.js frontend
RUN npm run build

# Expose necessary ports
EXPOSE 3000 8000

# ---- Run Both Frontend & Backend ----
CMD ["sh", "-c", "uvicorn http_server.main:app --host 0.0.0.0 --port 8000 & npm run start"]

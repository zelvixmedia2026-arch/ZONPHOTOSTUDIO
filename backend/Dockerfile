# Use an official Python runtime
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies required for rembg and opencv
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose the port Railway uses
EXPOSE 8000

# Start the FastAPI server
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
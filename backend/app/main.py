from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.background import router as background_router
from app.config import OUTPUT_DIR

app = FastAPI(
    title="Z ON PHOTOSTUDIO API",
    description="Local AI background removal and replacement by Zelvix Media",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/outputs",
    StaticFiles(directory=str(OUTPUT_DIR)),
    name="outputs",
)

app.include_router(background_router)

@app.get("/")
async def root():
    return {
        "name": "Z ON PHOTOSTUDIO API",
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs",
    }
import time
import requests
from sqlalchemy.orm import Session
from .crud import update_ingestion_status
import os

NESTJS_API = os.getenv("NESTJS_API")

def process_ingestion(db: Session, ingestion_id: int):
    # Set status to IN_PROGRESS
    update_ingestion_status(db, ingestion_id, "IN_PROGRESS")

    # Simulate ingestion process (Replace with actual logic)
    time.sleep(5)

    # Set status to COMPLETED
    update_ingestion_status(db, ingestion_id, "COMPLETED")

    # Notify NestJS backend
    try:
        requests.put(f"{NESTJS_API}/ingestion/{ingestion_id}/status", json={"status": "COMPLETED"})
    except Exception as e:
        print("Failed to notify NestJS API:", str(e))

    return {"message": "Ingestion completed", "status": "COMPLETED"}

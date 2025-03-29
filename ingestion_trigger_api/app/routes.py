from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import get_db
from .schemas import IngestionRequest
from .services import process_ingestion

router = APIRouter()

@router.post("/start-ingestion")
def start_ingestion(request: IngestionRequest, db: Session = Depends(get_db)):
    ingestion = process_ingestion(db, request.ingestion_id)
    return ingestion

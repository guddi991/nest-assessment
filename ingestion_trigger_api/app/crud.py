from sqlalchemy.orm import Session
from .models import Ingestion

def get_ingestion(db: Session, ingestion_id: int):
    return db.query(Ingestion).filter(Ingestion.id == ingestion_id).first()

def update_ingestion_status(db: Session, ingestion_id: int, status: str):
    ingestion = get_ingestion(db, ingestion_id)
    if ingestion:
        ingestion.status = status
        db.commit()
        return ingestion
    return None

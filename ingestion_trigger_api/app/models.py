from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class Ingestion(Base):
    __tablename__ = "ingestion"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String(20), default="PENDING")
    createdAt = Column(DateTime, default=datetime.utcnow)

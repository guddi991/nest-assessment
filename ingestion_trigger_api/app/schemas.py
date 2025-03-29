from pydantic import BaseModel

class IngestionRequest(BaseModel):
    ingestion_id: int

class IngestionResponse(BaseModel):
    id: int
    status: str

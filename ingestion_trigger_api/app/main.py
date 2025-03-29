from fastapi import FastAPI
from .database import engine, Base
from .routes import router

# Initialize DB Tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(title="Ingestion Trigger API")

# Include Routes
app.include_router(router)

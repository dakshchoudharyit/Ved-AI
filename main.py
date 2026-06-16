from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
import os
from rag.retriever import retrieve

from database import SessionLocal, engine
from models import Base, MedicalReport

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

# Gemini model
model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

# FastAPI app
app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)


class AnalysisRequest(BaseModel):
    name: str
    age: int
    symptoms: str


@app.get("/")
def home():
    return {
        "message": "Medical AI Assistant Running"
    }


@app.post("/analyze")
def analyze(request: AnalysisRequest):

    medical_context = retrieve(
        request.symptoms
    )

    prompt = f"""
You are a medical AI assistant.

Use the provided medical knowledge
when generating your answer.

Medical Knowledge:
{medical_context}

Patient Name: {request.name}
Age: {request.age}

Symptoms:
{request.symptoms}

Provide:

1. Possible Causes
2. Recommendations
3. Warning Signs

Do not provide a definitive diagnosis.
Keep the answer concise.
"""

    response = model.generate_content(
        prompt
    )

    db = SessionLocal()

    try:

        report = MedicalReport(
            patient_name=request.name,
            age=request.age,
            symptoms=request.symptoms,
            analysis=response.text
        )

        db.add(report)
        db.commit()

    finally:
        db.close()

    return {
        "analysis": response.text,
        "context": medical_context
    }

@app.get("/reports")
def get_reports():

    db = SessionLocal()

    try:
        reports = db.query(
            MedicalReport
        ).order_by(
            MedicalReport.id.desc()
        ).all()

        result = []

        for report in reports:
            result.append({
                "id": report.id,
                "patient_name": report.patient_name,
                "age": report.age,
                "symptoms": report.symptoms,
                "analysis": report.analysis,
                "created_at": str(report.created_at)
            })

        return result

    finally:
        db.close()
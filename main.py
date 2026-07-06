from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.security import OAuth2PasswordBearer
import os
from rag.retriever import retrieve
from schemas import UserRegister, UserLogin
from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)
from models import User

from database import SessionLocal, engine, Base
from models import User, MedicalReport, ChatHistory

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

# Create table
Base.metadata.create_all(bind=engine)
from sqlalchemy import inspect

class AnalysisRequest(BaseModel):
    name: str
    age: int
    symptoms: str


@app.get("/")
def home():
    return {
        "message": "Medical AI Assistant Running"
    }

@app.post("/register")
def register(user: UserRegister):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        db.close()
        return {
            "message": "Email already registered"
        }
    print(user.password)
    print(len(user.password))
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        age=user.age
    )

    db.add(new_user)
    db.commit()

    db.close()

    return {
        "message": "User registered successfully"
    }
@app.post("/login")
def login(user: UserLogin):

    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        db.close()
        return {
            "message": "Invalid Email or Password"
        }

    if not verify_password(
        user.password,
        existing_user.password
    ):
        db.close()
        return {
            "message": "Invalid Email or Password"
        }

    token = create_access_token(
        {
            "user_id": existing_user.id,
            "email": existing_user.email
        }
    )

    db.close()

    return {
    "message": "Login Successful",
    "access_token": token,
    "token_type": "bearer",
    "user": {
        "id": existing_user.id,
        "name": existing_user.name,
        "email": existing_user.email,
        "age": existing_user.age
    }
}
@app.get("/me")
def get_me(current_user: User = Depends(get_current_user)):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "age": current_user.age
    }
@app.post("/analyze")
def analyze(
    request: AnalysisRequest,
    current_user: User = Depends(get_current_user)
):

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
            user_id=current_user.id,
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
def get_reports(
    current_user: User = Depends(get_current_user)
):

    db = SessionLocal()

    try:
        reports = db.query(
            MedicalReport
        ).filter(
            MedicalReport.user_id == current_user.id
        ).order_by(
            MedicalReport.id.desc()
        ).all()

        result = []

        for report in reports:
            result.append({
                "id": report.id,
                "symptoms": report.symptoms,
                "analysis": report.analysis,
                "created_at": str(report.created_at)
            })

        return result

    finally:
        db.close()
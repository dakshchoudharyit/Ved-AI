from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    TIMESTAMP
)
Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    age = Column(Integer)

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    patient_id = Column(
        Integer,
        ForeignKey("patients.id")
    )

    user_message = Column(Text)
    ai_response = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

class MedicalReport(Base):
    __tablename__ = "medical_reports"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String(100))
    age = Column(Integer)
    symptoms = Column(Text)
    analysis = Column(Text)
    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )
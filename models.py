from sqlalchemy import Column, Integer, String, Text, TIMESTAMP, ForeignKey
from sqlalchemy.sql import func

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    age = Column(Integer)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
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

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    symptoms = Column(Text)

    analysis = Column(Text)

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )
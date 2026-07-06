from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: int


class UserLogin(BaseModel):
    email: EmailStr
    password: str
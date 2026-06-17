from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

from app.core.database import get_db
from app.core.security import (
    hash_password, verify_password,
    create_access_token, get_current_user,
)
from app.core.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/auth", tags=["auth"])


class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str
    role: str = "member"


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


@router.post("/register", response_model=Token)
async def register(data: UserCreate, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(
        text("SELECT id FROM users WHERE email = :email"), {"email": data.email}
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    result = await db.execute(
        text("""
            INSERT INTO users (email, name, role, hashed_password)
            VALUES (:email, :name, :role, :pw)
            RETURNING id, email, name, role
        """),
        {"email": data.email, "name": data.name, "role": data.role, "pw": hash_password(data.password)},
    )
    await db.commit()
    user = dict(result.mappings().first())
    token = create_access_token({"sub": str(user["id"]), "email": user["email"], "role": user["role"]})
    return Token(access_token=token, user=user)


@router.post("/token", response_model=Token)
async def login(form: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    row = await db.execute(
        text("SELECT id, email, name, role, hashed_password FROM users WHERE email = :e AND is_active = true"),
        {"e": form.username},
    )
    user = row.mappings().first()
    if not user or not verify_password(form.password, user["hashed_password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    user_dict = dict(user)
    token = create_access_token({"sub": str(user_dict["id"]), "email": user_dict["email"], "role": user_dict["role"]})
    return Token(access_token=token, user={k: v for k, v in user_dict.items() if k != "hashed_password"})


@router.get("/me")
async def me(current_user: dict = Depends(get_current_user)):
    return current_user

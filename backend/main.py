import os
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Yahaya Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio-blue-iota-27.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
MAIL_TO = os.environ.get("MAIL_TO", "ramadhanyahya16@gmail.com")


class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str


@app.get("/")
def root():
    return {"status": "backend running"}


@app.post("/contact")
def contact(msg: ContactMessage):
    if not RESEND_API_KEY:
        # No Resend API key — just log it
        print(f"[CONTACT] {msg.name} <{msg.email}>: {msg.message}")
        return {"success": True, "message": "Imehifadhiwa (bila kutuma email)"}

    try:
        response = requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {RESEND_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "from": "onboarding@resend.dev",
                "to": MAIL_TO,
                "subject": f"Portfolio Contact: {msg.name}",
                "text": (
                    f"Jina: {msg.name}\n"
                    f"Barua pepe: {msg.email}\n\n"
                    f"Ujumbe:\n{msg.message}"
                ),
            },
        )

        if response.status_code == 200:
            return {"success": True, "message": "Email imetumwa!"}
        else:
            print(f"Resend error: {response.text}")
            raise HTTPException(status_code=500, detail="Imeshindwa kutuma")

    except HTTPException:
        raise
    except Exception as e:
        print(f"Kosa: {e}")
        raise HTTPException(status_code=500, detail="Imeshindwa kutuma email")

import os, smtplib
from email.mime.text import MIMEText
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

app = FastAPI(title="Yahaya Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

@app.get("/")
def root(): return {"status": "ok"}

@app.post("/api/contact")
def contact(msg: ContactMessage):
    host = os.getenv("SMTP_HOST"); user = os.getenv("SMTP_USER"); pwd = os.getenv("SMTP_PASS")
    to = os.getenv("CONTACT_TO", "ramadhanyahya16@gmail.com")
    if not (host and user and pwd):
        # No SMTP configured — just log it
        print(f"[CONTACT] {msg.name} <{msg.email}>: {msg.message}")
        return {"ok": True, "stored": False}
    try:
        body = f"From: {msg.name} <{msg.email}>\n\n{msg.message}"
        m = MIMEText(body); m["Subject"] = f"Portfolio contact — {msg.name}"
        m["From"] = user; m["To"] = to
        with smtplib.SMTP_SSL(host, int(os.getenv("SMTP_PORT", "465"))) as s:
            s.login(user, pwd); s.sendmail(user, [to], m.as_string())
        return {"ok": True, "stored": True}
    except Exception as e:
        raise HTTPException(500, str(e))

# Yahaya Ramadhani Nasoro — Portfolio

Futuristic AI Engineer portfolio. Next.js 14 (frontend) + FastAPI (backend).

## Frontend (Next.js) — run in VS Code
Requires **Node.js 18+**.

```bash
cd frontend
npm install
cp .env.local.example .env.local   # edit if backend running
npm run dev
```
Open http://localhost:3000

Build for production: `npm run build && npm start`.
Deploy: push to GitHub → import on **Vercel**.

## Backend (FastAPI) — optional, only for contact form
Requires **Python 3.10+**.

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
API: http://localhost:8000

Deploy: push to GitHub → connect on **Render** (uses `render.yaml`).

### SMTP env vars (optional)
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO`.
Without these the contact form still works — messages are logged to console.

## Troubleshooting in VS Code
- If you see "next not recognized" → run `npm install` first.
- If port 3000 is busy → `npm run dev -- -p 3001`.
- If background looks blank → hard refresh (Ctrl+Shift+R).

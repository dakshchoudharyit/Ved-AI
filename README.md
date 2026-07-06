# 🏥 VED AI - AI Powered Medical Assistant

VED AI is a full-stack AI-powered medical assistant that helps users analyze symptoms using Google's Gemini AI and Retrieval-Augmented Generation (RAG). The application provides secure user authentication, stores previous medical reports, and offers an intuitive dashboard for managing AI-generated health analyses.

> ⚠️ Disclaimer: This application is intended for educational purposes only and should not be considered a substitute for professional medical advice.

---

## ✨ Features

- 🔐 Secure User Authentication (JWT)
- 👤 User Registration & Login
- 🤖 AI-Powered Symptom Analysis using Gemini
- 📚 Retrieval-Augmented Generation (RAG)
- 📄 Medical Report History
- 🗄️ MySQL Database Integration
- ⚡ FastAPI REST Backend
- ⚛️ React Frontend
- 🔒 Protected Dashboard
- 📱 Responsive & Modern UI

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Axios
- CSS

### Backend

- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib (bcrypt)
- Python

### AI

- Google Gemini API
- Sentence Transformers
- FAISS
- RAG Pipeline

### Database

- MySQL

---

## 📂 Project Structure

```
VED-AI/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│
├── rag/
│
├── auth.py
├── database.py
├── models.py
├── schemas.py
├── main.py
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/ved-ai.git
cd ved-ai
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

---

### 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_secret_key
```

---

### 5. Run Backend

```bash
uvicorn main:app --reload
```

Backend runs on

```
http://127.0.0.1:8000
```

---

### 6. Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## 📸 Screenshots

### Login

> Add Screenshot

### Dashboard

> Add Screenshot

### AI Analysis

> Add Screenshot

---

## 🎥 Demo

Coming Soon

---

## 📌 Future Improvements

- 🌙 Dark Mode
- 📄 PDF Medical Report Export
- 📈 Health Analytics Dashboard
- 💬 AI Chat History
- 👤 User Profile Management
- ☁️ Cloud Deployment
- 🐳 Docker Support

---

## 📖 Learning Outcomes

This project helped me learn:

- FastAPI
- JWT Authentication
- React Routing
- SQLAlchemy ORM
- MySQL Integration
- Retrieval-Augmented Generation (RAG)
- Google Gemini API
- REST API Development
- Full-Stack Application Architecture

---

## 📄 License

This project is developed for educational and portfolio purposes.

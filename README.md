# 🏥 Medical AI Assistant

An AI-powered healthcare application that analyzes patient symptoms and generates context-aware medical insights using Gemini AI and Retrieval-Augmented Generation (RAG).

## 🚀 Features

* AI-powered symptom analysis using Gemini AI
* Retrieval-Augmented Generation (RAG)
* Semantic search using FAISS vector database
* Medical knowledge retrieval using Sentence Transformers
* Patient report storage and history management
* Responsive React frontend
* FastAPI backend with REST APIs
* MySQL database integration

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS

### Backend

* FastAPI
* Python

### Database

* MySQL
* SQLAlchemy ORM

### AI & RAG

* Gemini AI
* Sentence Transformers
* FAISS

## 📌 System Workflow

1. User enters symptoms through the React frontend.
2. FastAPI receives the request.
3. Symptoms are converted into embeddings using Sentence Transformers.
4. FAISS retrieves the most relevant medical knowledge.
5. Retrieved context is passed to Gemini AI.
6. Gemini generates a context-aware medical analysis.
7. The report is stored in MySQL.
8. Results are displayed to the user.

## 🧠 RAG Architecture

User Symptoms
↓
Sentence Transformer Embeddings
↓
FAISS Similarity Search
↓
Relevant Medical Context Retrieval
↓
Gemini AI
↓
Medical Analysis

## 📂 Project Structure

```text
medical-ai-assistant/
│
├── frontend/
├── data/
├── rag/
│   ├── build_index.py
│   ├── retriever.py
│
├── main.py
├── database.py
├── models.py
├── requirements.txt
├── .env.example
└── README.md
```

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/dakshchoudharyit/Medical-AI-Assistant.git
cd Medical-AI-Assistant
```

### Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

### Run Backend

```bash
uvicorn main:app --reload
```

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🎯 Future Improvements

* PDF-based medical document retrieval
* User authentication and authorization
* Advanced medical knowledge base
* Cloud deployment
* Source citations for retrieved content

## 👨‍💻 Author

Daksh Choudhary

B.Tech Information Technology
Delhi Technological University

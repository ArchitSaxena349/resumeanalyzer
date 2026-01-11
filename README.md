# ResumeAI - Intelligent Resume Analyzer

A premium, AI-powered resume analysis tool built with the MERN stack (MongoDB, Express, React, Node.js). It leverages **Groq (Llama 3.1)** for ultra-fast, intelligent resume parsing and feedback.

![ResumeAI Demo](https://placehold.co/600x400?text=Resume+AI+Dashboard)

## 🚀 Features

- **⚡ Instant Analysis**: Powered by Groq's `llama-3.1-8b-instant` model for sub-second responses.
- **📄 Role-Aware Parsing**: Dynamically detects the candidate's role (e.g., "Developer", "Designer") for relevant feedback.
- **🎯 ATS Scoring**: Calculates a compatibility score (0-100) based on industry standards.
- **🎨 Premium UI**: Polished interface with drag-and-drop uploads, visual score gauges, and glassmorphism effects.
- **📊 Detailed Dashboard**:
    - Executive Summary
    - Strengths & Weaknesses
    - Missing Keywords
    - Actionable Improvement Suggestions

## 🛠️ Tech Stack

### Frontend
- **React 19** & **Vite**: High-performance client.
- **Tailwind CSS v4**: Modern, variable-based styling with a sophisticated color system.
- **Framer Motion**: Smooth entrance and interaction animations.
- **Lucide React**: Clean, modern iconography.

### Backend
- **Node.js & Express**: Robust REST API.
- **MongoDB**: For storing analysis history.
- **Groq SDK**: Interfacing with Llama 3 models.
- **PDF Parse**: Extracting raw text from uploaded resumes.

## 📦 Installation & Run

### 1. Prerequisites
- Node.js installed (v18+ recommended).
- MongoDB running locally or a cloud URI.
- A **Groq API Key** (Get one at [console.groq.com](https://console.groq.com)).

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file in the /server directory with:
# MONGODB_URI=mongodb://localhost:27017/resume-analyzer
# GROQ_API_KEY=gsk_...
# PORT=5000

node index.js
```
*Server runs at `http://localhost:5000`*

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
*Client runs at `http://localhost:5173`*

## 📝 License
MIT License
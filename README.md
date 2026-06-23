# 🚀 AI Resume Analyzer
![Visitors](https://komarev.com/ghpvc/?username=jashodhaborana09&style=for-the-badge&color=blue)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
![Contributions](https://img.shields.io/badge/Contributions-Welcome-blue?style=for-the-badge)
![Open Source](https://img.shields.io/badge/Open%20Source-Yes-success?style=for-the-badge)
An AI-powered Resume Analysis and Job Matching platform that helps candidates optimize their resumes, improve ATS scores, and align their profiles with job descriptions using Generative AI.

## 🌐 Live Demo

**Frontend:** https://ai-resume-analyzer-frontend-sigma.vercel.app

**Backend API:** https://ai-resume-analyzer-zr9w.onrender.com

---

## 📌 Overview

AI Resume Analyzer is a full-stack web application designed to help students, job seekers, and professionals improve their resumes using AI-driven insights.

The platform analyzes uploaded resumes, generates ATS-friendly recommendations, evaluates strengths and weaknesses, and compares resumes against job descriptions to provide a match score and optimization suggestions.

---

## ✨ Features

### 📄 Resume Upload & Parsing

* Upload PDF resumes
* Extract resume content automatically
* Store resume history

### 🤖 AI Resume Analysis

* ATS Score Generation
* Resume Summary
* Missing Skills Detection
* Recruiter Feedback
* Resume Improvement Suggestions

### 🎯 Job Description Matching

* Compare resume with job descriptions
* Match Percentage Calculation
* Matching Skills Identification
* Missing Skills Detection
* Recommended Keywords
* Optimization Tips

### 🔐 Authentication System

* User Registration
* Secure Login
* JWT Authentication
* Protected Routes

### 📊 Dashboard

* Resume Analysis History
* ATS Score Tracking
* Job Match Results
* User Profile Management

### 🌙 Modern UI

* Responsive Design
* Dark Mode Support
* Mobile-Friendly Interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer

### AI Integration

* OpenRouter API
* Google Gemini Models

### Deployment

* Vercel (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## 🏗️ System Architecture

User → React Frontend → Express Backend → OpenRouter AI

User → React Frontend → Express Backend → MongoDB Atlas

---

## 📁 Project Structure

```bash
AI-Resume-Analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/jashodhaborana09/ai-resume-analyzer.git

cd ai-resume-analyzer
```

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

PORT=5000

OPENROUTER_API_KEY=your_openrouter_api_key
```

Run Backend

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run Frontend

```bash
npm run dev
```

---

## 🔑 Environment Variables

### Backend

```env
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
PORT=
OPENROUTER_API_KEY=
```

### Frontend

```env
VITE_API_URL=
```

---

## 📈 Future Enhancements

* Resume PDF Report Generation
* Resume Version Tracking
* AI Interview Preparation
* Resume Templates Generator
* LinkedIn Profile Analyzer
* Career Roadmap Suggestions
* Multi-language Resume Analysis
* Advanced ATS Simulation

---

## 🧠 Learning Outcomes

Through this project:

* Built a production-ready MERN application
* Integrated Generative AI APIs
* Implemented JWT Authentication
* Managed cloud database deployment
* Deployed full-stack applications
* Solved real-world CORS, API, and deployment challenges

---

## 👨‍💻 Author

### Jashodha Borana

B.Tech Student | Aspiring Software Engineer | AI & Full Stack Enthusiast

GitHub:
https://github.com/jashodhaborana09

LinkedIn:
(Add your LinkedIn profile URL)

---

## ⭐ Support

If you found this project helpful, please consider giving it a star on GitHub.

⭐ Star the repository
🍴 Fork the project
📢 Share with others

---

## 📜 License

This project is licensed under the MIT License.


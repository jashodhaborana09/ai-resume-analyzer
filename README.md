# AI Resume Analyzer

A production-ready AI Resume Analyzer built with modern MERN architecture and Gemini API integration.

## Features

- Secure JWT authentication with registration, login, and protected routes
- Resume upload with drag-and-drop, PDF/DOCX validation, and upload progress
- Resume parsing for name, email, phone, education, skills, experience, certifications, and projects
- AI-powered analysis using Google Gemini API with ATS score, skill analysis, recruiter feedback, and suggestions
- Job description matching with match percentage, missing skills, and optimization tips
- Resume history with downloadable PDF reports and delete history
- Responsive dashboard with Recharts, animated cards, and dark mode
- Bonus AI cover letter generator and interview question generator

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS, React Router, Axios, Framer Motion, React Hook Form, React Hot Toast, Recharts
- Backend: Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, Multer, pdf-parse, dotenv, bcryptjs
- AI: Google Gemini API
- Deployment: Vercel (frontend), Render (backend)

## Installation

1. Clone the repository.
2. Install dependencies from the root:

```bash
npm install
```

3. Create environment files:

- `backend/.env`
- `frontend/.env`

4. Run the development stack:

```bash
npm run dev
```

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-1.5-pro
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Setup

- Frontend available at `http://localhost:5173`
- Backend available at `http://localhost:5000`

## Deployment

- Frontend: Deploy the `frontend` folder to Vercel and set `VITE_API_URL` to your backend URL.
- Backend: Deploy the `backend` folder to Render and set environment variables.
- Database: Use MongoDB Atlas and add the backend host to the allowed IP list.

## Future Enhancements

- LinkedIn profile analyzer
- Resume version comparison
- Admin analytics dashboard
- Multi-language support
- Email delivery for generated reports

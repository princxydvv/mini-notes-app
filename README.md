# Mini Notes App

A full-stack Notes application built to satisfy the assignment requirements.

## Features
- Create note
- Read all notes
- Update note
- Delete note
- Search notes by title
- Loading states for all major actions

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose

## Folder Structure

```bash
mini-notes-app/
  backend/
    config/
    controllers/
    models/
    routes/
    server.js
  frontend/
    src/
      api/
      components/
      App.jsx
      main.jsx
```

## Backend Setup
```bash
cd backend
npm install
cp .env.example .env
```

Update `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Run backend:
```bash
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

Update `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

## Deployment
### Backend on Render
- Create a new Web Service
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add environment variables from `.env`

### Frontend on Vercel
- Import project
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`
- Add `VITE_API_URL` environment variable pointing to deployed backend

## Assignment Coverage
This app covers all requirements in the assignment PDF:
- CRUD operations
- Search functionality
- Loading indicators
- MongoDB storage
- Deployable frontend and backend

# Sasi Ananth K — Full-Stack Personal Portfolio

A responsive personal portfolio built with **React, JavaScript, Node.js, Express, and MongoDB**.

## Internship task requirements covered

| Thiranex requirement | Implementation |
|---|---|
| Frontend: HTML/CSS/JavaScript or React | React + CSS + JavaScript (`frontend/`) |
| Backend: Node.js/Express or Django/Flask | Node.js + Express REST API (`backend/`) |
| Database: MySQL/MongoDB/PostgreSQL | MongoDB with Mongoose models |
| Deploy the website | Deployment instructions for Vercel + Render below |

## Run locally

### Requirements
Install Node.js (LTS) from https://nodejs.org/ and Git from https://git-scm.com/.

### 1. Configure MongoDB
1. Create a free MongoDB Atlas account: https://www.mongodb.com/atlas.
2. Create a cluster and a database user.
3. In Atlas Network Access, allow your current IP address for development.
4. Copy the Node.js connection string.
5. Copy `backend/.env.example` to `backend/.env`.
6. Replace the sample `MONGODB_URI` with your real connection string. Do not share or upload `.env`.

### 2. Start backend
Open a terminal in the project folder:
```bash
cd backend
npm install
```
Create `backend/.env` using `.env.example`, then run:
```bash
npm run dev
```
API: http://localhost:5000
Health check: http://localhost:5000/api/health

### 3. Start frontend
Open a second terminal in the project folder:
```bash
cd frontend
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Personalize before submitting
Edit `frontend/src/data.js`. Verify your email, GitHub, LinkedIn, education, skills, certificates and project details. Remove any project or certificate that you have not actually completed/earned. Add real GitHub/demo links where available.

## API endpoints
- `GET /api/health` — backend and database status
- `GET /api/projects` — reads portfolio projects from MongoDB
- `POST /api/contact` — validates and stores a contact message in MongoDB

The backend seeds example project records only when the Projects collection is empty. Replace those examples with your genuine projects before final submission.

## GitHub upload
Create a **public** repository named `personal-portfolio` at https://github.com/new.
From the project root, run:
```bash
git init
git add .
git commit -m "Add full-stack personal portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/personal-portfolio.git
git push -u origin main
```
Replace `YOUR_GITHUB_USERNAME` with your GitHub username. Never commit `.env` or passwords.

## Deployment
### Backend on Render
1. Push this project to GitHub.
2. In Render, create a new **Web Service** and connect the repository.
3. Set **Root Directory** to `backend`.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `CLIENT_URL` = your deployed Vercel frontend URL (after creating it)
7. Deploy and copy the backend URL.

### Frontend on Vercel
1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Add environment variable `VITE_API_URL` = your Render backend URL (no trailing slash).
4. Deploy.
5. Copy the Vercel website URL.
6. Return to Render and set `CLIENT_URL` to the Vercel URL, then redeploy the backend if needed.

## Final checks before Thiranex submission
- [ ] Replace and verify all personal placeholders in `frontend/src/data.js`.
- [ ] Add genuine project descriptions and working links.
- [ ] Configure MongoDB Atlas and confirm `/api/health` reports database connected.
- [ ] Test that projects load from the API.
- [ ] Submit a test contact form and confirm the message is saved.
- [ ] Check the site on mobile and desktop.
- [ ] Push the final code to GitHub.
- [ ] Deploy frontend and backend.
- [ ] Paste the GitHub repository URL in Thiranex. Add the live website URL in the README too.

**Important:** A GitHub repository link is a source-code submission. A deployed Vercel URL is the live website. The task asks for deployment, so complete both if possible.

 🏡 Real Estate Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) real estate platform that allows users to register, login, and browse property listings. Agents can add/manage properties, and clients can explore properties with details, and contact options.

🚀 Live Demo: https://real-estate-app-jii0.onrender.com/

📁 GitHub Repository: https://github.com/karan9992/real-estate-app

📌 Features
👤 Authentication

User registration & login

JWT-based authentication

Secure cookies for session management

🏠 Property Management

Add, update, and delete properties (Agent)

View all properties (Client)

Property images, price, location, and details

🌐 Frontend

Built using React (Vite)

Axios for API integration

Responsive design using Tailwind

🛠 Backend

Node.js & Express

MongoDB with Mongoose

Protected routes using Middleware

📂 Project Structure
real-estate-app/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   └── real-estate-app/
│       ├── src/
│       └── dist/
└── README.md

⚙️ Tech Stack
Category	Technology
Frontend	React (Vite), Axios, Tailwind
Backend	Node.js, Express
Database	MongoDB Atlas, Mongoose
Auth	JWT, Cookie-parser
Deployment	Render

🚀 Installation (Local Setup)
🛢 Backend Setup
cd backend
npm install


Create a .env file in the backend folder:

PORT=3000
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
FRONTEND_URL=https:/your-frontend-key.com
FRONTEND_LOCAL_URL=http://localhost:5173
NODE_ENV=development


Run backend:

npm start

💻 Frontend Setup
cd frontend/real-estate-app
npm install


Create .env file in frontend:

VITE_API_URL=http://localhost:3000


Run frontend:

npm run dev

HOW TO USE:
On Landing page 
Register New user
you can choose which role you want agent/ client
1. Agent - can add, delete, edit properties  and view which clients are interested
2. Client - can view all properties and add any property to interested

   Login-
based on your role after login you will be either directed to client or agent page


🌐 Deployment
Backend Deployment (Render):

Deploy Node.js app

Add environment variables in Render dashboard

Set build command: npm install

Set start command: node server.js

Frontend Deployment (Render/Vercel/Netlify):

Set build command: npm run build

Publish dist/ folder

📌 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
GET	/api/client/properties	Get all properties
POST	/api/agent/property	Add property
PUT	/api/agent/property/:id	Update property
DELETE	/api/agent/property/:id	Delete property






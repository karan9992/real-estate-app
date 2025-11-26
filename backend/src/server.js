const express = require('express');
const connectDb = require('./config/db');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Routes
const clientRoutes = require('./routes/clientRoutes');
const authRoutes = require('./routes/authRoutes');
const agentRoutes = require('./routes/agentRoutes');

// Connect DB
connectDb();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/client", clientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/agent", agentRoutes);

// 🚀 Serve frontend (Vite) in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/real-estate-app/dist");
  app.use(express.static(frontendPath));

  app.use((req, res, next) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

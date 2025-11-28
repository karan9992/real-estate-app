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


const frontendUrl = process.env.FRONTEND_URL;
const localFrontendUrl = process.env.FRONTEND_LOCAL_URL
// CORS Options
const corsOptions = {
  origin: 'https://real-estate-app-jii0.onrender.com', //'http://localhost:5173',//
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 👉 Must be placed before routes
app.use(cors(corsOptions));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api/client", clientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/agent", agentRoutes);

// 🔥 Fix 404 fallback route for production (Vite)
// if (process.env.NODE_ENV === "production") {
//   const frontendPath = path.resolve(__dirname, "../../frontend/real-estate-app/dist");
//   app.use(express.static(frontendPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(frontendPath, "index.html"));
//   });
// }

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../../frontend/real-estate-app/dist");
  app.use(express.static(frontendPath));
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port: ${PORT}`);
});

const express = require('express')
const connectDb = require('./config/db')
const app = express();
const cors = require('cors')
const PORT = 3000;
const clientRoutes = require('./routes/clientRoutes')
const authRoutes = require('./routes/authRoutes')
const agentRoutes = require('./routes/agentRoutes')
const cookieParser = require('cookie-parser');

require('dotenv').config();


const path = require("path");



connectDb()

//middleware
app.use(cors({
  origin:  process.env.FRONTEND_URL,
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//routes



app.use("/api/client", clientRoutes)     // client routes

app.use("/api/auth", authRoutes)        //auth routes

app.use("/api/agent", agentRoutes)      // agent routes



// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/real-estate-app/build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/real-estate-app/build/index.html"));
  });
}
app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
})
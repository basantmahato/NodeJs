const express = require("express");
const http = require("http"); // Required for Socket.io
const { Server } = require("socket.io"); // Required for Socket.io
const connectDB = require("./db/db");
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // Assuming this exists based on your file list
const adminRoutes = require("./routes/adminRoutes"); // Assuming this exists
const contentRoutes = require("./routes/contentRoutes"); // NEW

const app = express();
const server = http.createServer(app); // Wrap express app

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for now (change to your frontend URL in production)
    methods: ["GET", "POST"]
  }
});

app.use(cors());
const port = 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
// Pass 'io' to content routes so we can emit alerts inside the controller
app.use('/api/content', contentRoutes(io)); 


// --- REAL-TIME SOCKET LOGIC ---
let activeUsers = 0;

io.on("connection", (socket) => {
  activeUsers++;
  console.log(`User connected. Total active: ${activeUsers}`);

  // Emit updated count to all admins (or everyone)
  io.emit("active-users", activeUsers);

  socket.on("disconnect", () => {
    activeUsers--;
    console.log(`User disconnected. Total active: ${activeUsers}`);
    io.emit("active-users", activeUsers);
  });
});

// CHANGE: app.listen -> server.listen
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
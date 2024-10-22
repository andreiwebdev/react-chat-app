require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);

    socket.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server is listening on port 3001");
});

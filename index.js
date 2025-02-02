import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url"; // Needed for ES modules
import { Server } from "socket.io";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-production-432e.up.railway.app/",
  },
});

// Middleware
app.use(cors({ origin: "https://chat-production-432e.up.railway.app/" }));

// Serve index.html correctly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages from the client
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

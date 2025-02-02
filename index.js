import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url"; // Needed for ES modules
import { Server } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
    });})


server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

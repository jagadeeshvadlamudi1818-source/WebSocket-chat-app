require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // serves public/index.html

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat", (text) => {
    io.emit("chat", text); // send to EVERYONE
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server running on http://localhost:3000");
});
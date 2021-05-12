
const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const server = app.listen("3030", () => {
  console.log("Server Running on Port 3030...");
});

io = socket(server);

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    console.log(data);
    io.emit('receive_message', msg);
  });
});
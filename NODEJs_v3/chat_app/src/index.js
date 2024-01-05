import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import BadWordsFilter from "bad-words";
import { generateMessage, generateUrlMessage } from "./utils/message.js";
import { addUser, getUser, getUsersInRoom, removeUser } from "./utils/user.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

//creating --filename and --dirname variable because they are not part of javascript
// console.log(import.meta.url + "\n");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");
// console.log(__filename + "\n" + __dirname + "\n" + publicDirectory);
//creating a public directory for serving public content

app.use(express.static(publicDirectory));

io.on("connection", (socket) => {
  console.log("new websocket connection.");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit("serverMessage", generateMessage("Admin", "Welcome !"));
    socket.broadcast
      .to(user.room)
      .emit(
        "serverMessage",
        generateMessage("Admin", `${user.username} joined the chat.`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("userMessage", (formData, callback) => {
    const user = getUser(socket.id);
    const filter = new BadWordsFilter();
    if (filter.isProfane(formData)) {
      return callback("Profanity is not allowed.");
    }
    io.to(user.room).emit(
      "serverMessage",
      generateMessage(user.username, formData)
    );
    callback();
  });

  socket.on("sendLocation", (location, ack) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "userLocation",
      generateUrlMessage(user.username, location)
    );
    ack();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "serverMessage",
        generateMessage("Admin", `${user.username} has left the chat.`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// app.get("/", (req, res) => {
//   res.sendFile(publicDirectory + "/index1.html");
// });

server.listen(5000, () => {
  console.log("server is running on port 5000");
});

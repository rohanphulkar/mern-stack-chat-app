require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const Chat = require("./models/chatModel");
const Message = require("./models/messageModel");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send({ error: "something went wrong!" });
});
app.use("/user", cors(), userRoutes);
app.use("/chat", cors(), chatRoutes);
app.use("/message", cors(), messageRoutes);

http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Socket.io

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`joined room, ${room}`);
  });
  socket.on("send-message", async (msg, room) => {
    const message = await Message.create({
      chat: msg.chat,
      sender: msg.sender,
      content: msg.content,
    });
    console.log("this is the room ", room);
    socket.to(room).emit("receive-message", msg);
  });
});

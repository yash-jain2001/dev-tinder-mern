const socket = require("socket.io");
const crypto = require("crypto");
const chat = require("../models/chat");
const Chat = require("../models/chat");
const ConnectionRequestModel = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const { FRONTEND_URL } = require("../config/config");

const initializeSocket = (server) => {
  const allowedOrigins = [
    FRONTEND_URL ? FRONTEND_URL.replace(/\/$/, "") : null,
    "http://localhost:5173",
    "http://localhost:3000",
  ].filter(Boolean);

  const io = socket(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    // handle events here
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      console.log(firstName + " has joined room : " + roomId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName,lastName, userId, targetUserId, text }) => {
        //save message in DB
        try {
          const roomId = getSecretRoomId(userId, targetUserId);
          console.log(firstName + " has sent a message : " + text);
          
          //check if userId and targetUserId are friends
          ConnectionRequestModel.findOne({
            senderId:userId,
            receiverId:targetUserId,
            status:"ACCEPTED"
          }) 
          
          
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({ senderId: userId, text });
          await chat.save();
          io.to(roomId).emit("messageRecieved", { firstName,lastName,text,});
        } catch (err) {
          console.log("Error while saving message : " + err);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;

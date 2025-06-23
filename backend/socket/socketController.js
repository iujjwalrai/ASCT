const Message = require("../models/Message");

const socketHandler = (io) => {
  const users = {}; // userId -> socket.id (includes both users and admin)

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // Register socket (either user or admin)
    socket.on("register", ({ userId }) => {
      users[userId] = socket.id;
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    // Send message (can be from admin or user)
    socket.on("send_message", async ({ from, to, message }) => {
      try {
        const msg = await Message.create({ from, to, message });

        const receiverSocket = users[to];
        if (receiverSocket) {
          io.to(receiverSocket).emit("receive_message", msg);
        }
      } catch (err) {
        console.error("Socket message error:", err.message);
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
      for (let uid in users) {
        if (users[uid] === socket.id) {
          delete users[uid];
          break;
        }
      }
    });
  });
};

module.exports = socketHandler;

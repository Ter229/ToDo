import { Server } from "socket.io";

export function setupSocket(server) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });
  console.log(
    "Socket.IO server started with CORS for:",
    "http://localhost:5173"
  );

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", (message) => {
      console.log("New message:", message);
      io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected:${socket.id}`);
    });
  });
}

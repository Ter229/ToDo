import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cors from "cors";
import http from "http";
import { setupSocket } from "./socket.js";

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

app.use(express.json());
app.use(cors());

const users = [];

app.post("/register", async (req, res) => {
  console.log("Received registration request:", req.body);
  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: `Hello, ${req.user.username}! This is your profile.` });
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

app.post("/profile", authenticateToken, (req, res) => {
  const { avatar } = req.body;
  const user = users.find((user) => user.username === req.user.username);

  if (!user) return res.status(400).json({ message: "User not found" });

  user.avatar = avatar;
  res.json({ message: "Avatar updated successfully", avatar });
});

const server = http.createServer(app);
setupSocket(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import gameRoutes from "./routes/game.routes.js"; // Import game routes

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();



const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors({
  origin: "https://socialty-g9qg.vercel.app", // Your frontend URL
  methods: ["POST", "GET", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies and credentials
}));


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/games", gameRoutes);




server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});

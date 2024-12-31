import express from 'express';
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import {connectDB} from "./lib/db.js";
import messageRoutes from "./routes/message.route.js";
import {app, server} from "./lib/socket.js";

import path from 'path';

dotenv.config();

const PORT = process.env.PORT ;
const __dirname = path.resolve();


app.use(cookieParser());
app.use(cors(
 {
  origin: "http://localhost:5174",
      credentials: true
 }
))
app.use(express.json()); // Allow you to extract the json data out of body
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
console.log("Server started on port: " + PORT );
 connectDB();

});
import express from "express";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { connectDb } from "./db/db.connection.js";
import { routeConfig as AuthRoute } from "./routes/auth.route.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

AuthRoute(app);

app.use((err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(400).json({
      message: err.message,
      err,
      success: false,
    });
  }
});

const PORT = process.env.PORT || 5000;
connectDb()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error connection server: ${error}`);
  });

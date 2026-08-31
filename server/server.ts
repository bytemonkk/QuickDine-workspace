import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
await connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

// API Endpoints
app.use("/api/auth", authRouter);

// server Error handler 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("unhandle Error", err);
      res.status(500).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
      })
})
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
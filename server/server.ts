import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routes/authRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

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

// Authentication API Endpoint
app.use("/api/auth", authRouter);

// Restaurant API Endpoint
app.use("/api/restaurants", restaurantRouter);

// Bookings API Endpoint
app.use("/api/bookings", bookingRouter);

// owner's API Endpoint
app.use("/api/owner", ownerRouter);

// admin's API Endpoint
app.use("/api/admin", adminRouter);

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
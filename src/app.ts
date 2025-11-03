import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser"; // 👈 ADD THIS
import toolsRoutes from "./routes/toolsRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();

const app = express();

// ✅ Enable CORS before routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // 👈 allow cookies
  })
);

app.use(express.json());
app.use(cookieParser()); 

// ✅ API routes
app.use("/api/tools", toolsRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health check
app.get("/", (_, res) => {
  res.send("✅ WebTools API is running!");
});

export default app;

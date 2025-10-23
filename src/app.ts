import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import toolsRoutes from "./routes/toolsRoutes";

dotenv.config();

const app = express();

// ✅ Enable CORS before routes
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ API routes
app.use("/api/tools", toolsRoutes);

// ✅ Health check
app.get("/", (_, res) => {
  res.send("✅ WebTools API is running!");
});

export default app;

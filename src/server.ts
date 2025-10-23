import express from "express";
import cors from "cors";
import { createServer } from "http";
import app from "./app";

app.use(express.json());

// ✅ Allow your local frontend to access your Render backend
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

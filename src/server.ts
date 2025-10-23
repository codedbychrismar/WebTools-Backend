import { createServer } from "http";
import app from "./app";
import express from "express";
import cors from "cors";

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
}));


const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
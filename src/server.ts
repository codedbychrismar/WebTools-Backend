import { createServer } from "http";
import app from "./app";
import express from "express";

app.use(express.json());


const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
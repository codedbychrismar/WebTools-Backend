import express from "express";
import dotenv from "dotenv";
import toolsRoutes from "./routes/toolsRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/tools", toolsRoutes);

app.get("/", (_, res) => {
  res.send("✅ WebTools API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

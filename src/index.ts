import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import clientRoutes from "./routes/clientRoutes";
import cors from "cors";
import { main as synthesizeData } from "./scripts/synthesizeData";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
     
    });
    console.log("MongoDB connected");

    await synthesizeData(); // вызываем функцию синтеза данных

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error("Error starting server:", error.message);
    process.exit(1);
  }
};

startServer();

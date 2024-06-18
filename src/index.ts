import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import clientRoutes from "./routes/clientRoutes";
import { config } from "dotenv";

const url = "mongodb://127.0.0.1:27017/aton";

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);

mongoose
  .connect(process.env.MONGO_URI || url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));

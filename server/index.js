// app.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connectDb from "./services/db.js";
import cors from "cors";

const app = express();
dotenv.config();
connectDb();

const PORT = process.env.PORT || 3000;

// Define middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Mount routes
app.use("/user", userRoute);
app.use("/message/send", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

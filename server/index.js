// app.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connectDb from "./services/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();
connectDb();

const PORT = process.env.PORT || 3000;
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Define middleware
app.use(express.static(path.join(__dirname, "public")));

const whitelist = ["https://shadowfy.onrender.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Mount routes
app.use("/user", userRoute);
app.use("/message/send", messageRoute);
app.use("/message", messageRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

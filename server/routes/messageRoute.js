// messageRoute.js
import express from "express";
const router = express.Router();
import {
  messageGenerator,
  getAllMessage,
} from "../controllers/generateMessage.js";

router.route("/:uniqueLink").post(messageGenerator).get(getAllMessage);

export default router;

// messageRoute.js
import express from "express";
const router = express.Router();
import path from "path";
import {
  messageGenerator,
  getAllMessage,
} from "../controllers/generateMessage.js";

router.get("/:uniqueLink", (req, res) => {
  const currentFileUrl = import.meta.url;
  const currentFilePath = new URL(currentFileUrl).pathname;
  const currentDirPath = path.dirname(currentFilePath);
  const filePath = path.join(currentDirPath, "../../public/messageBox.html");
  res.sendFile(filePath);
});

router.route("/:uniqueLink").post(messageGenerator);
router.get("/all/:uniqueLink", getAllMessage);

export default router;

import express from "express";
const router = express.Router();
import generateUniqueLinkFromName from "../controllers/linkGenerator.js";
import path from "path";

router.get("/onboard", (req, res) => {
  const currentFileUrl = import.meta.url;
  const currentFilePath = new URL(currentFileUrl).pathname;
  const currentDirPath = path.dirname(currentFilePath);
  const filePath = path.join(currentDirPath, "../../public/index.html");
  res.sendFile(filePath);
});
router.route("/onboard").post(generateUniqueLinkFromName);

export default router;

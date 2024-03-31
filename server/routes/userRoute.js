import express from "express";
const router = express.Router();
import generateUniqueLinkFromName from "../controllers/linkGenerator.js";

router.post("/onboard", generateUniqueLinkFromName);

export default router;

import express from "express";
import verifyToken from "../utils/authMiddleware";
import { createHomework, updateHomework } from "../controllers/homeworkController";

const router = express.Router();

router.post("/createHomework", verifyToken, createHomework);
router.put("/updateHomework/:homeworkId", verifyToken, updateHomework);

export default router;
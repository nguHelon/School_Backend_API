import express from "express";
import verifyToken from "../utils/authMiddleware";
import { createSubject } from "../controllers/subjectController";

const router = express.Router();

router.post("/createSubject/", verifyToken, createSubject);

export default router;
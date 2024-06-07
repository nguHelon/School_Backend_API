import express from "express";
import verifyToken from "../utils/authMiddleware";
import { createSubject, getAllSubjects, getSubjectById, updateSubject } from "../controllers/subjectController";

const router = express.Router();

router.get("/getAllSubjects", verifyToken, getAllSubjects);
router.get("/getSubjectById/:subjectId", verifyToken, getSubjectById);
router.post("/createSubject", verifyToken, createSubject);
router.post("/updateSubject/:subjectId", verifyToken, updateSubject);

export default router;
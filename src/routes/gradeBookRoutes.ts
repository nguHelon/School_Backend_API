import express from "express";
import verifyToken from "../utils/authMiddleware";
import { createGradebookRecord, getAllGradebookRecords, getGradebookRecordById, updateGradebookRecord } from "../controllers/gradeBookController";

const router = express.Router();

router.get("/getAllGradebookRecords", verifyToken, getAllGradebookRecords);
router.get("/getGradebookRecordById/:gradebookRecordId", verifyToken, getGradebookRecordById);
router.post("/createGradebookRecord", verifyToken, createGradebookRecord);
router.put("/upateGradebookRecord/:gradeBookRecordId", verifyToken, updateGradebookRecord);

export default router;
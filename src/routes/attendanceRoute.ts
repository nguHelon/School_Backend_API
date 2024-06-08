import express from "express";
import verifyToken from "../utils/authMiddleware";
import { createAttendanceRecord, getAllAttendanceRecords, getAttendanceRecordById, updateAttendanceRecord } from "../controllers/attendanceController";

const router = express.Router();

router.get("/getAllAttendanceRecords", verifyToken, getAllAttendanceRecords);
router.get("/getAttendanceRecordById/:attendanceRecordId", verifyToken, getAttendanceRecordById);
router.post("/createAttendanceRecord", verifyToken, createAttendanceRecord);
router.put("/updateAttendanceRecord/:attendanceRecordId", verifyToken, updateAttendanceRecord);

export default router;
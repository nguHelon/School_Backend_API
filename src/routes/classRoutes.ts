import express from "express";
import verifyToken from "../utils/authMiddleware";
import { assignClassTeacher, createClass, getAllClasses, getClassById, updateClass } from "../controllers/classController";

const router = express.Router();

router.get("/getAllClasses", verifyToken, getAllClasses);
router.get("/getClassById/:classId", verifyToken, getClassById);
router.post("/createClass", verifyToken, createClass);
router.patch("/assignClassTeacher/:teacherId/:classId", verifyToken, assignClassTeacher);
router.put("/updateClass/:classId", verifyToken, updateClass);

export default router
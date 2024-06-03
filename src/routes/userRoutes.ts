import express from "express";
import { createUser, updateUser, getAllUser, setStudentParent, getAllTeachers, getAllStudents, getAllParents, getAllAdmins } from "../controllers/userController";
import verifyToken from "../utils/authMiddleware";

const router = express.Router();

router.post("/createUser", verifyToken, createUser);
router.put("/updateUser/:id", verifyToken, updateUser);
router.get("/getAllUsers", verifyToken, getAllUser);
router.patch("/setStudentParent/:id", verifyToken, setStudentParent);
router.get("/getAllTeachers", verifyToken, getAllTeachers);
router.get("/getAllStudents", verifyToken, getAllStudents);
router.get("/getAllParents", verifyToken, getAllParents);
router.get("/getAllAdmins", verifyToken, getAllAdmins);

export default router;
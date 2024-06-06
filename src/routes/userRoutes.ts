import express from "express";
import { createUser, updateUser, getAllUser, setStudentParent, getUserByRole } from "../controllers/userController";
import verifyToken from "../utils/authMiddleware";

const router = express.Router();

router.post("/createUser", verifyToken, createUser);
router.put("/updateUser/:id", verifyToken, updateUser);
router.get("/getAllUsers", verifyToken, getAllUser);
router.patch("/setStudentParent/:id", verifyToken, setStudentParent);
router.get("/getUserByRole", verifyToken, getUserByRole);

export default router;
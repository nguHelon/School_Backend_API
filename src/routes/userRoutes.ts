import express from "express";
import { createUser } from "../controllers/userController";
import verifyToken from "../utils/authMiddleware";

const router = express.Router();

router.post("/createUser", verifyToken, createUser);
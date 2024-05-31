import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import errorHandler from "../utils/errorMiddleware";
import { PrismaClient } from '@prisma/client'

dotenv.config();
const prisma = new PrismaClient();

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (user) {

            const isPasswordMatched = await bcrypt.compare(password, user.password);

            if (!isPasswordMatched) {
                next(errorHandler(401, "wrong credentials. Please try again!"));
                return;
            }

            const token = jwt.sign({ id: user.id, role: user.role}, process.env.TOKEN_SECRET as string);
            const { password: userPassword, ...userData } = user;

            res
                .cookie("access_token", token)
                .status(200)
                .json(userData);

        } else {
            next(errorHandler(404, "this user does not exist"));
        }


    } catch (err) {
        next(err);
    }

}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.clearCookie("access_token");
        res.status(200).json("logged out succesfully");

    } catch (err) {
        next(err);
    }
}

export {
    login,
    logout
}
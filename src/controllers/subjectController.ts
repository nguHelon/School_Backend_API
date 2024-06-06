import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { customRequest } from "../utils/types";
import { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorMiddleware";

const prisma = new PrismaClient();

const createSubject = async (req: customRequest, res: Response, next: NextFunction) => {
    const { teacherIdQueryParam } = req.query;
    const { name, teacherId } = req.body;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to manage classes"));
            return;
        }

        if (role == "ADMIN") {
            const subject = await prisma.subject.create({
                data: {
                    name,
                    teacherId: parseInt(teacherIdQueryParam as string)
                }
            });

            console.log(subject);
            res.status(200).json(subject);
            return;
        }

        const subject = await prisma.subject.create({
            data: {
                name,
                teacherId
            }
        });

        console.log(subject);
        res.status(200).json(subject);
        return;

    } catch (err) {
        next(err);
    }
}

export {
    createSubject,
}
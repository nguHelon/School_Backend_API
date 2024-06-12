import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { customRequest } from "../utils/types";
import { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorMiddleware";

const prisma = new PrismaClient();

const createHomework = async (req: customRequest, res: Response, next: NextFunction) => {
    const { ...homeworkData } = req.body;
    const { role, id } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to create homeworks"));
            return;
        }

        if (role == "TEACHER") {

            const subjectById = await prisma.subject.findUnique({
                where: {
                    id: homeworkData.subjectId
                }
            });

            if (subjectById?.teacherId !== id) {
                next(errorHandler(400, "You can not create a homework for a subject that is not assigned to you"));
                return;
            }

            const classById = await prisma.class.findUnique({
                where: {
                    id: homeworkData.classId
                }
            });

            if (classById?.teacherId !== id) {
                next(errorHandler(400, "You can not create a homework for a subject in a class that is not assigned to you"));
                return;
            }

            return;
        }

        const dateObj = new Date(homeworkData.dueDate);

        if (isNaN(dateObj.getTime())) {
            return next(errorHandler(400, "Invalid date format"));
        }

        const homework = await prisma.homework.create({
            data: { ...homeworkData, dueDate: dateObj }
        });

        console.log(homework);
        res.status(200).json(homework);

    } catch (err) {
        next(err);
    }
}

const updateHomework = async (req: customRequest, res: Response, next: NextFunction) => {
    const { homeworkId } = req.params;
    const { ...homeworkData } = req.body;
    const { role, id } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to update homeworks"));
            return;
        }

        const homeworkToBeUpdated = await prisma.homework.findUnique({
            where: {
                id: parseInt(homeworkId)
            }
        });

        if (!homeworkToBeUpdated) {
            next(errorHandler(404, "this Subject doesnt exist"))
            return;
        }

        if (role == "TEACHER") {

            const subjectById = await prisma.subject.findUnique({
                where: {
                    id: homeworkData.subjectId
                }
            });

            if (subjectById?.teacherId !== id) {
                next(errorHandler(400, "You can not create a homework for a subject that is not assigned to you"));
                return;
            }

            const classById = await prisma.class.findUnique({
                where: {
                    id: homeworkData.classId
                }
            });

            if (classById?.teacherId !== id) {
                next(errorHandler(400, "You can not create a homework for a subject in a class that is not assigned to you"));
                return;
            }

            return;
        }

        const updatedHomework = await prisma.homework.update({
            where: {
                id: parseInt(homeworkId)
            },
            data: { ...homeworkData }
        });

        console.log(updatedHomework);
        res.status(200).json(updatedHomework);

    } catch (err) {
        next(err);
    }

}

export {
    createHomework,
    updateHomework
}
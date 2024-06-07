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
            next(errorHandler(401, "Sorry you are not authorized to manage subjects"));
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

const updateSubject = async (req: customRequest, res: Response, next: NextFunction) => {
    const { subjectId } = req.params;
    const { name, teacherId } = req.body;
    const { role, id } = req.user as JwtPayload;

    try {

        const subjectToBeUpdated = await prisma.subject.findUnique({
            where: {
                id: parseInt(subjectId)
            }
        });

        if (subjectToBeUpdated?.teacherId !== id && role !== "ADMIN") {
            next(errorHandler(400, "Sorry either you are trying to update a subject that is not assigned to you or you are not admin"));
        }

        if (!subjectToBeUpdated) {
            next(errorHandler(404, "this Subject doesnt exist"))
        }

        const updatedSubject = await prisma.subject.update({
            where: {
                id: parseInt(subjectId)
            },
            data: {name, teacherId}
        });

        console.log(updatedSubject);
        res.status(200).json(updatedSubject);

    } catch (err) {
        next(err);
    }
}

const getAllSubjects = async (req: customRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get subject data"));
            return;
        }

        const subjects = await prisma.subject.findMany();

        res.status(200).json(subjects);

    } catch (err) {
        next(err);
    }
}

const getSubjectById = async (req: customRequest, res: Response, next: NextFunction) => {
    const { subjectId } = req.params;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get subject data"));
        }

        const subjectById = await prisma.subject.findUnique({
            where: {
                id: parseInt(subjectId)
            }
        });

        if (!subjectById) {
            next(errorHandler(404, "subject doesnt exist"));
        }

        console.log(subjectById);
        res.status(200).json(subjectById);

    } catch (err) {
        next(err);
    }
}


export {
    createSubject,
    updateSubject,
    getAllSubjects,
    getSubjectById
}
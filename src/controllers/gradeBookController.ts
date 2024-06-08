import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { customRequest } from "../utils/types";
import { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorMiddleware";

const prisma = new PrismaClient();

const createGradebookRecord = async (req: customRequest, res: Response, next: NextFunction) => {
    const { ...gradeBookRecordData } = req.body;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to create gradeBook records"));
            return;
        }

        const gradebookRecord = await prisma.gradebook.create({
            data: { ...gradeBookRecordData }
        });

        console.log(gradebookRecord);
        res.status(200).json(gradebookRecord);

    } catch (err) {
        next(err);
    }
}

const updateGradebookRecord = async (req: customRequest, res: Response, next: NextFunction) => {
    const { gradeBookRecordId } = req.params;
    const { ...gradeBookRecordData } = req.body;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to create gradeBook records"));
            return;
        }

        const gradebookRecordToBeUpdated = await prisma.gradebook.findUnique({
            where: {
                id: parseInt(gradeBookRecordId)
            }
        });

        if (!gradebookRecordToBeUpdated) {
            next(errorHandler(404, "this gradebook record doesnt exist"))
            return;
        }

        const updatedGradebookRecord = await prisma.gradebook.update({
            where: {
                id: parseInt(gradeBookRecordId)
            },
            data: { ...gradeBookRecordData }
        });

        console.log(updatedGradebookRecord);
        res.status(200).json(updatedGradebookRecord);

    } catch (err) {
        next(err);
    }
}

const getAllGradebookRecords = async (req: customRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get gradebook data"));
            return;
        }

        const gradebookRecords = await prisma.gradebook.findMany();

        res.status(200).json(gradebookRecords);

    } catch (err) {
        next(err);
    }
}

const getGradebookRecordById = async (req: customRequest, res: Response, next: NextFunction) => {
    const { gradebookRecordId } = req.params;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get gradebook data"));
        }

        const gradebookRecordById = await prisma.gradebook.findUnique({
            where: {
                id: parseInt(gradebookRecordId)
            }
        });

        if (!gradebookRecordById) {
            next(errorHandler(404, "gradebook record doesnt exist"));
        }

        console.log(gradebookRecordById);
        res.status(200).json(gradebookRecordById);

    } catch (err) {
        next(err);
    }
}

export {
    createGradebookRecord,
    updateGradebookRecord,
    getAllGradebookRecords,
    getGradebookRecordById
}
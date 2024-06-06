import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { customRequest } from "../utils/types";
import { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorMiddleware";

const prisma = new PrismaClient();

const createClass = async (req: customRequest, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const { role, id } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to manage classes"));
            return;
        }

        if (role == "TEACHER") {
            const createdClass = await prisma.class.create({ 
                data: { 
                    name,
                    teacherId: id
                } 
            })

            console.log(createdClass);
            res.status(200).json(createdClass);
            return;
        }

        const createdClass = await prisma.class.create({ data: { name } })

        console.log(createdClass);
        res.status(200).json(createdClass);

    } catch (err) {
        next(err);
    }
}

const updateClass = async (req: customRequest, res: Response, next: NextFunction) => {
    const { classId } = req.params;
    const { name } = req.body;
    const { id, role } = req.user as JwtPayload;

    try {

        const classToBeUpdated = await prisma.class.findUnique({
            where: {
                id: parseInt(classId)
            }
        });

        if (classToBeUpdated?.teacherId !== id && role !== "ADMIN") {
            next(errorHandler(400, "Sorry either you are trying to update a class that is not assigned to you or you are not admin"));
        }

        if (!classToBeUpdated) {
            next(errorHandler(404, "this class doesnt exist"))
        }

        const updatedClass = await prisma.class.update({
            where: {
                id: parseInt(classId)
            },
            data: {
                name
            }
        });

        console.log(updatedClass);
        res.status(200).json(updatedClass);

    } catch (err) {
        next(err);
    }
}

const assignClassTeacher = async (req: customRequest, res: Response, next: NextFunction) => {
    const { teacherId, classId } = req.params;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "Sorry only admins can assign a class to a teacher"));
            return;
        }

        const classToBeUpdated = await prisma.class.findUnique({
            where: {
                id: parseInt(classId)
            }
        });

        if (!classToBeUpdated) {
            next(errorHandler(404, "class doesnt exist"));
        }

        const updatedClass = await prisma.class.update({
            where: {
                id: parseInt(classId)
            },
            data: {
                teacherId: parseInt(teacherId)
            }
        });

        console.log(updatedClass);
        res.status(200).json(updatedClass);

    } catch (err) {
        next(err);
    }
}

const getAllClasses = async (req: customRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get class data"));
            return;
        }

        const classes = await prisma.class.findMany();

        res.status(200).json(classes);

    } catch (err) {
        next(err);
    }
}

const getClassById = async (req: customRequest, res: Response, next: NextFunction) => {
    const { classId } = req.params;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get class data"));
        }

        const classById = await prisma.class.findUnique({
            where: {
                id: parseInt(classId)
            }
        });

        if (!classById) {
            next(errorHandler(404, "class doesnt exist"));
        }

        console.log(classById);
        res.status(200).json(classById);

    } catch (err) {
        next(err);
    }
}

export {
    createClass,
    assignClassTeacher,
    updateClass,
    getAllClasses,
    getClassById
}
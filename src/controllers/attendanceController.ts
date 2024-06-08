import { Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { customRequest } from "../utils/types";
import { JwtPayload } from "jsonwebtoken";
import errorHandler from "../utils/errorMiddleware";

const prisma = new PrismaClient();

const createAttendanceRecord = async (req: customRequest, res: Response, next: NextFunction) => {
    const { date, status, studentId, classId } = req.body;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to create attendance records"));
            return;
        }

        const dateObj = new Date(date);

        if (isNaN(dateObj.getTime())) {
            return next(errorHandler(400, "Invalid date format"));
        }

        const attendanceRecord = await prisma.attendance.create({
            data: {
                date: dateObj, status, studentId, classId
            }
        });

        console.log(attendanceRecord);
        res.status(200).json(attendanceRecord);

    } catch (err) {
        next(err);
    }
}

const updateAttendanceRecord = async (req: customRequest, res: Response, next: NextFunction) => {
    const { attendanceRecordId } = req.params;
    const { ...attendanceData } = req.body;
    const { role, id: teacherId } = req.user as JwtPayload;

    try {

        if (role !== "TEACHER" && role !== "ADMIN") {
            next(errorHandler(401, "Sorry you are not authorized to update attendance records"));
            return;
        }

        const attendanceRecordToBeUpdated = await prisma.attendance.findUnique({
            where: {
                id: parseInt(attendanceRecordId)
            }
        });

        if (!attendanceRecordToBeUpdated) {
            next(errorHandler(404, "this Subject doesnt exist"))
            return;
        }

        const assignedClass = await prisma.class.findUnique({
            where: {
                id: attendanceRecordToBeUpdated?.classId
            }
        });

        if (role == "TEACHER") {
            if (assignedClass?.teacherId !== teacherId) {
                next(errorHandler(400, "Sorry you can not update the attenance record of a class that has not been assigned to you"));
                return;
            }
        }

        const updatedRecord = await prisma.attendance.update({
            where: {
                id: parseInt(attendanceRecordId)
            },
            data: { ...attendanceData }
        })

        console.log(updatedRecord);
        res.status(200).json(updatedRecord);

    } catch (err) {
        next(err);
    }
}

const getAllAttendanceRecords = async (req: customRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get attendance data"));
            return;
        }

        const attendanceRecords = await prisma.attendance.findMany();

        res.status(200).json(attendanceRecords);

    } catch (err) {
        next(err);
    }
}

const getAttendanceRecordById = async (req: customRequest, res: Response, next: NextFunction) => {
    const { attendanceRecordId } = req.params;
    const { role } = req.user as JwtPayload;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(401, "You are not authorized to get attendance data"));
        }

        const attendanceRecordById = await prisma.subject.findUnique({
            where: {
                id: parseInt(attendanceRecordId)
            }
        });

        if (!attendanceRecordById) {
            next(errorHandler(404, "attendance record doesnt exist"));
        }

        console.log(attendanceRecordById);
        res.status(200).json(attendanceRecordById);

    } catch (err) {
        next(err);
    }
}

export {
    createAttendanceRecord,
    updateAttendanceRecord,
    getAllAttendanceRecords,
    getAttendanceRecordById
}
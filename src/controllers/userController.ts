import { Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import errorHandler from "../utils/errorMiddleware";
import { customRequest, Role } from "../utils/types";
import { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();

const createUser = async (req: customRequest, res: Response, next: NextFunction) => {
    const { password, role, ...userData } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.findUnique({
            where: {
                email: userData.email
            }
        })

        if (user) {
            next(errorHandler(400, "This email is already used by another user"));
            return;
        }

        if (req.user && (req.user as JwtPayload).role == "ADMIN") {;
            const savedUser = await prisma.user.create({
                data: { password: hashedPassword, role, ...userData }
            });

            if (role == "TEACHER") {
                const saveTeacher = await prisma.teacher.create({
                    data: {
                        userId: savedUser.id
                    }
                })

                console.log(saveTeacher);
            } else if (role == "PARENT") {
                const saveParent = await prisma.parent.create({
                    data: {
                        userId: savedUser.id
                    }
                })

                console.log(saveParent);
            } else if (role == "STUDENT") {
                const saveStudent = await prisma.student.create({
                    data: { 
                        userId: savedUser.id
                    }
                })

                console.log(saveStudent);
            }                    

            console.log(savedUser);
            return res.status(200).json(savedUser);
        } else {
            next(errorHandler(401, "Sorry only admins are authorized to create users"));
        }
        
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req: customRequest, res: Response, next: NextFunction) => {
    const { id } = req.params
    const { role, password, ...updateData } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (user) {

            if (user.id == parseInt(id) || role == "ADMIN") {

                if (password) {
                    updateData.password = await bcrypt.hash(password, 10);
                }

                const updatedUser = await prisma.user.update({
                    where: {
                        id: parseInt(id)
                    },
                    data: updateData
                })
                
                console.log(updatedUser);
                res.status(200).json(updatedUser);
            } else {
                next(errorHandler(401, "You are unauthorized to update another persons data"));
            }

        } else {
            next(errorHandler(404, "Can't update user that does not exist"));
        }


    } catch (err) {
        next(err);
    }
}

const getAllUser = async (req: customRequest, res: Response, next: NextFunction) => {
    try {

        if ((req.user as JwtPayload).role !== "ADMIN") {
            next(errorHandler(401, "You are not authorize to get user data"));
            return;
        }

        const users = await prisma.user.findMany();

        res.status(200).json(users);

    } catch (err) {
        next(err);
    }
}

const setStudentParent = async (req: customRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { parentId } = req.body;

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id)
            }
        })

        if (user) {
            
            if (user.role !== "STUDENT") {
                next(errorHandler(400, "This route is to set the parents of students only"))
                return;
            }

            if ((req.user as JwtPayload).role == "ADMIN") {
                const updatedUser = await prisma.student.update({
                    where: {
                        userId: parseInt(id)
                    },
                    data: {
                        parentId: parentId
                    }
                })

                console.log(updatedUser);
                res.status(200).json(updatedUser);
            } else {
                next(errorHandler(400, "Only admins can edit user information"));
                return;
            }

        } else {
            next(errorHandler(404, "This is student does not exist"));
            return;
        }

    } catch (err) {
        next(err);
    }
}

const getUserByRole = async (req: customRequest, res: Response, next: NextFunction) => {
    const { role } = req.user as JwtPayload;
    const { role: userRole } = req.query;

    try {

        if (role !== "ADMIN") {
            next(errorHandler(400, "Sorry only admins can retrieve user data"));
            return;
        }

        if (!userRole || typeof role !== "string") {
            next(errorHandler(400, "Invalid or missing role parameters"));
            return;
        } else {
            let userByRole;

            if (userRole == "ADMIN") {
                
                userByRole = await prisma.user.findMany({
                    where: {
                        role: userRole as Role,
                    },                    
                });
    
                console.log(userByRole);
                res.status(200).json(userByRole);
                return;
            }

            userByRole = await prisma.user.findMany({
                where: {
                    role: userRole as Role,
                },
                include: {
                    [(userRole as string).toLowerCase()]: true
                }
            });

            console.log(userByRole);
            res.status(200).json(userByRole);
            
        }        

    } catch (err) {
        next(err);
    }
}

export {
    createUser,
    updateUser,
    getAllUser,
    setStudentParent,
    getUserByRole
}
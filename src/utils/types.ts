import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface customRequest extends Request {
    user?: JwtPayload | string;
}

export enum Role {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
    PARENT = 'PARENT'
}
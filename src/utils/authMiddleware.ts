import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors, JwtPayload} from "jsonwebtoken";
import errorHandler from "./errorMiddleware";
import { customRequest } from "./types";

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.access_token;

    if (!token) {
        next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: VerifyErrors | null , user: JwtPayload | string | undefined) => {
        if (err) {
            next(errorHandler(403, "forbidden"));
        }

        (req as customRequest).user = user;
        next();
    })
}

export default verifyToken;
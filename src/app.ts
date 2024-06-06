import express, { Request, Response, NextFunction} from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import classRouter from "./routes/classRoutes";
import subjectRouter from "./routes/subjectRoutes";

const app = express();

app.use(express.json({ limit: "30mb"}));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/class", classRouter);
app.use("/subject", subjectRouter);

interface errType {
    statusCode: number,
    message: string
}

app.use((err: errType, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})

app.get("/", (req: Request, res: Response) => {
    console.log("hello");
    res.status(200).json("welcome to backend");
})

export default app;
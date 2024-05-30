interface CustomError extends Error {
    statusCode: number;
}

const errorHandler = (statusCode: number, message: string) => {
    const err = new Error() as CustomError;
    err.message = message;
    err.statusCode = statusCode;

    return err;
}

export default errorHandler;
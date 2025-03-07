import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
    status?: number;
}

export function errorHandler(
    err: CustomError | string, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    if (typeof err === 'string') {
        // Custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // JWT authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // Handle errors with custom status codes
    const statusCode = err.status || 500;

    return res.status(statusCode).json({ message: err.message || 'Internal Server Error' });
}

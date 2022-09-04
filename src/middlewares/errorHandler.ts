import { Request, Response, NextFunction } from "express";

export default function handleError(error: any, req: Request, res: Response, next: NextFunction) {
    return res.status(error.status || 500).send(error.message || "Internal server error")
}
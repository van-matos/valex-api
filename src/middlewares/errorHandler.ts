import { Request, Response, NextFunction } from "express";

export default function handleError(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.type === "invalid_key") {
        res.status(401).send(error.message);
        return;
    }

    if (error.type === "invalid_employee") {
        res.status(404).send(error.message);
        return;
    }

    if (error.type === "duplicate_type") {
        res.status(405).send(error.message);
        return;
    }

    console.log(error);
    res.sendStatus(500);
    return;
}
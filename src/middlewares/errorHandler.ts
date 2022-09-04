import { Request, Response, NextFunction } from "express";

export default function handleError(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.type === "invalid_key" || error.type === "invalid_security_code") {
        res.status(401).send(error.message);
        return;
    }

    if (error.type === "card_expired" || error.type === "card_is_not_blocked") {
        res.status(403).send(error.message);
        return;
    }

    if (error.type === "invalid_entity") {
        res.status(404).send(error.message);
        return;
    }

    if (error.type === "duplicate_type" || "invalid_password") {
        res.status(405).send(error.message);
        return;
    }

    console.log(error);
    res.sendStatus(500);
    return;
}
import { Request, Response } from "express";

import { createNewCard } from "../services/cardServices";

export async function addNewCard(req: Request, res: Response) {
    const employeeId: number = Number(req.params.id);
    const APIKey = req.headers['x-api-key'];
    const cardType = req.body.type;

    await createNewCard(APIKey, cardType, employeeId);

    return res.sendStatus(201);
}
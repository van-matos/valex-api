import { Request, Response } from "express";

import * as cardServices from "../services/cardServices";

export async function activateCard(req: Request, res: Response) {
    const cardId: number = Number(req.params.cardId)
    const { securityCode, password } = req.body;

    await cardServices.activateCard(cardId, password, securityCode);

    res.status(200).send("Card activated.");
}

export async function addNewCard(req: Request, res: Response) {
    const employeeId: number = Number(req.params.employeeId);
    const APIKey = req.headers['x-api-key'];
    const cardType = req.body.type;

    const cardInfo = await cardServices.createNewCard(APIKey, cardType, employeeId);

    res.status(201).send({cardInfo});
}

export async function getCardStatement(req: Request, res: Response) {
    const cardId: number = Number(req.params.cardId);

    const cardStatement: Object = await cardServices.getCardStatement(cardId);

    res. status(200).send(cardStatement);
}
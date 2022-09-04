import { Request, Response } from "express";
import * as rechargeServices from "../services/rechargeServices";

export async function newRecharge(req: Request, res: Response) {
    const cardId: number = Number(req.params.cardId);
    const APIKey = req.headers['x-api-key'];
    const { amount } = req.body;

    await rechargeServices.newRecharge(APIKey, cardId, amount);

    res.sendStatus(201);
}
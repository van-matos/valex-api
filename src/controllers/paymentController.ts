import { Request, Response } from "express";
import * as paymentServices from "../services/paymentServices";

export async function newPayment(req: Request, res: Response) {
    const businessId = Number(req.params.businessId);
    const { cardId, password, amount } = req.body;

    console.log(cardId);

    await paymentServices.newPayment(businessId, cardId, password, amount);

    res.sendStatus(201);
}
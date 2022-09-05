import * as cardRepository from "../repositories/cardRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as cardServices from "../services/cardServices";

export async function checkAvailableBalance(
    card: cardRepository.Card,
    amount: number
) {
    const cardStatement = await cardServices.getCardStatement(card.id);

    if (cardStatement.balance < amount)
        throw {
            status: 400,
            message: "Insufficient funds"
        }
    
    return;
}

export async function insertPayment(
    cardId: number,
    businessId: number,
    amount: number
) {
    const paymentData = {
        cardId,
        businessId,
        amount
    };

    await paymentRepository.insert(paymentData);
    
    return;
}
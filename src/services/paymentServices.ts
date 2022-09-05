import * as cardRepository from "../repositories/cardRepository";
import * as businessServices from "../services/businessServices";
import * as cardUtils from "../utils/cardUtils";
import * as paymentUtils from "../utils/paymentUtils";

export async function newPayment(
    businessId: number,  
    cardId: number,
    password: string,
    amount: number
) {
    const card = await cardRepository.findById(cardId);
    if (!card) 
        throw { status: 404, message: "Card not found" };

    const business = await businessServices.BusinessIsRegistered(businessId);

    if (!cardUtils.comparePasswords(card.password || "", password))
        throw { status: 401, message: "Access denied" };
    
    cardUtils.checkCardBlocked(card);

    cardUtils.verifyExpiration(card.expirationDate)

    await cardUtils.checkCardBusinessTypes(card, business);

    await paymentUtils.checkAvailableBalance(card, amount);

    await paymentUtils.insertPayment(cardId, businessId, amount);
}

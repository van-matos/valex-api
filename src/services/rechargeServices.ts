import * as companyRepository from "../repositories/companyRepository";
import * as cardRepository from "../repositories/cardRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardUtils from "../utils/cardUtils";

export async function newRecharge(
    APIKey: any,
    cardId: number,
    amount: number
) {
    const verifyKey = await companyRepository.findByApiKey(APIKey);
    if (!verifyKey)
        throw { status: 401, message: "Company not registered" };

    const card = await cardRepository.findById(cardId);
    if (!card)
        throw { status: 404, message: "Card not found" };

    cardUtils.checkCardBlocked(card);

    cardUtils.verifyExpiration(card.expirationDate);

    const rechargeData = {
        cardId,
        amount
    };

    console.log(rechargeData);

    await rechargeRepository.insert(rechargeData);

    return;
}
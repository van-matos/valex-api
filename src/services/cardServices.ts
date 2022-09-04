import * as cardMethods from "../repositories/cardRepository";
import * as companyMethods from "../repositories/companyRepository";
import * as employeeMethods from "../repositories/employeeRepository"
import * as cardUtils from "../utils/cardUtils";
import * as errorUtils from "../utils/errorUtils";

export async function activateCard(
    cardId: number,
    password: string,
    securityCode: string
) {
    const card = await cardMethods.findById(cardId);

    if (!card)
        throw errorUtils.notFound("card");

    if (cardUtils.verifyExpiration(card.expirationDate))
        throw errorUtils.expiredCard();

    if (card.password)
        throw errorUtils.cardActivated();

    if (cardUtils.decryptSecurityCode(cardUtils.encrypter(), card.securityCode) !== securityCode)
        throw errorUtils.invalidSecurityCode();

    if (!cardUtils.verifyPassword(password))
        throw errorUtils.invalidPassword();

    const encryptedPassword = cardUtils.encryptPassword(password);

    const cardData = {
        password: encryptedPassword,
        isBlocked: false
    }

    await cardMethods.update(cardId, cardData);
}

export async function createNewCard(
    APIKey: any,
    cardType: cardMethods.TransactionTypes,
    employeeId: number
) {
    const verifyKey = await companyMethods.findByApiKey(APIKey);
    if (!verifyKey)
        throw errorUtils.unauthorizedCompany();

    const verifyEmployee = await employeeMethods.findById(employeeId);
    if (!verifyEmployee)
        throw errorUtils.notFound("employee");

    const verifyCard = await cardMethods.findByTypeAndEmployeeId(cardType, employeeId);
    if (verifyCard)
        throw errorUtils.duplicateCardType(cardType);

    const securityCode = cardUtils.generateSecurityCode();

    const cardData: cardMethods.CardInsertData = {
        employeeId,
        number: cardUtils.generateCardNumber(),
        cardholderName: cardUtils.formatCardName(verifyEmployee.fullName),
        securityCode: cardUtils.encryptSecurityCode(cardUtils.encrypter(), securityCode),
        expirationDate: cardUtils.generateExpirationDate(),
        password: "",
        isVirtual: false,
        isBlocked: true,
        type: cardType
    };

    await cardMethods.insert(cardData)

    const cardInfo = {
        number: cardData.number,
        securityCode: securityCode
    }

    return cardInfo;
}
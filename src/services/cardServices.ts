import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as cardUtils from "../utils/cardUtils";

export async function activateCard(
    cardId: number,
    password: string,
    securityCode: string
) {
    const card = await cardRepository.findById(cardId);

    if (!card) 
        throw { status: 404, message: "Card not found" };

    if (card.password)
        throw { status: 403, message: "Card already activated" }; 

    cardUtils.verifyExpiration(card.expirationDate);

    cardUtils.decryptSecurityCode(cardUtils.encrypter(), card.securityCode, securityCode)

    cardUtils.verifyPassword(password)

    const encryptedPassword = cardUtils.encryptPassword(password);

    const cardData = {
        password: encryptedPassword,
        isBlocked: false
    }

    await cardRepository.update(cardId, cardData);
}

export async function createNewCard(
    APIKey: any,
    cardType: cardRepository.TransactionTypes,
    employeeId: number
) {
    const verifyKey = await companyRepository.findByApiKey(APIKey);
    if (!verifyKey)
        throw { status: 401, message: "Company not registered" };

    const verifyCard = await cardRepository.findByTypeAndEmployeeId(cardType, employeeId);
    if (verifyCard)
        throw { status: 405, message: "Employee already has card of this type"};
    
    const verifyEmployee = await employeeRepository.findById(employeeId);
    if (!verifyEmployee)
        throw { status: 401, message: "Employee not registered" };

    const securityCode = cardUtils.generateSecurityCode();

    const cardData: cardRepository.CardInsertData = {
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

    await cardRepository.insert(cardData)

    const cardInfo = {
        number: cardData.number,
        securityCode: securityCode
    }

    return cardInfo;
}

export async function getCardStatement(cardId: number) {
    const card = await cardRepository.findById(cardId);
    if (!card) 
        throw { status: 404, message: "Card not found" };

    const recharges = await rechargeRepository.findByCardId(cardId);    
    const transactions = await paymentRepository.findByCardId(cardId);

    const balance = await cardUtils.calculateBalance(recharges, transactions);

    const cardStatement = {
        balance,
        transactions,
        recharges
    };

    return cardStatement;
}

export async function blockCard(
    cardId: number, 
    password: string
) {
    const card = await cardRepository.findById(cardId);
    if (!card) 
        throw { status: 404, message: "Card not found" };

    if (!cardUtils.comparePasswords(card.password || "", password)) 
        throw { status: 401, message: "Access denied" };
    
    cardUtils.verifyExpiration(card.expirationDate);
    
    cardUtils.checkCardBlocked(card);

    const cardData = {
        isBlocked: true,
    };

    await cardRepository.update(cardId, cardData);

    return;
}

export async function unblockCard(
    cardId: number, 
    password: string
) {
    const card = await cardRepository.findById(cardId);
    if (!card) 
        throw { status: 404, message: "Card not found" };

    if (!cardUtils.comparePasswords(card.password || "", password)) 
        throw { status: 401, message: "Access denied" };

    cardUtils.verifyExpiration(card.expirationDate);

    cardUtils.checkCardUnblocked(card);

    const cardData = {
        isBlocked: false,
    };

    await cardRepository.update(cardId, cardData);
    
    return;
}
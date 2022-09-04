import * as cardMethods from "../repositories/cardRepository";
import * as companyMethods from "../repositories/companyRepository";
import * as employeeMethods from "../repositories/employeeRepository"
import * as cardUtils from "../utils/cardUtils";
import * as errorUtils from "../utils/errorUtils";

export async function createNewCard(
    APIKey: any,
    cardType: cardMethods.TransactionTypes,
    employeeId: number) {

    const verifyKey = await companyMethods.findByApiKey(APIKey);
    if (!verifyKey) throw errorUtils.unauthorizedCompany();

    const verifyEmployee = await employeeMethods.findById(employeeId);
    if (!verifyEmployee) throw errorUtils.employeeNotFound();

    const verifyCard = await cardMethods.findByTypeAndEmployeeId(cardType, employeeId);
    if (verifyCard) throw errorUtils.duplicateCardType(cardType);

    const cardData: cardMethods.CardInsertData = {
        employeeId,
        number: cardUtils.generateCardNumber(),
        cardholderName: cardUtils.formatCardName(verifyEmployee.fullName),
        securityCode: cardUtils.encryptSecurityCode(),
        expirationDate: cardUtils.generateExpirationDate(),
        password: '',
        isVirtual: true,
        isBlocked: true,
        type: cardType
    };

    await cardMethods.insert(cardData)
}
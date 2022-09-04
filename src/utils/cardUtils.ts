import Cryptr from "cryptr";
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

export function encryptSecurityCode() {
    const CRYPTR_KEY: string = process.env.CRYPTR_KEY || "valex";
    const cryptr = new Cryptr(CRYPTR_KEY);

    const securityCode: string = faker.finance.creditCardCVV();

    return cryptr.encrypt(securityCode);
}

export function formatCardName(fullName: string) {
    const nameSplit = fullName.split(" ");
    const nameArray: string[] = [];

    for (let i = 0; i < nameSplit.length; i++) {
        if (i === 0 || i === nameSplit.length - 1) nameArray.push(nameSplit[i].toUpperCase())
        if (i !== 0 && i !== nameSplit.length - 1) {
            if (nameSplit[i].length >= 3) {
                nameArray.push(nameSplit[i][0].toUpperCase())
            }
        }
    }
    return nameArray.join(" ");
}

export function generateCardNumber() {
    const cardNumber: string = faker.finance.creditCardNumber();

    return cardNumber;
}

export function generateExpirationDate() {
    return dayjs().add(5, "year").format("MM/YY");
}
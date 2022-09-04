import { hashSync } from "bcrypt";
import Cryptr from "cryptr";
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';



export function decryptSecurityCode(cryptr: Cryptr, dbSecurityCode: string) {
    const decryptedSecrityCode = cryptr.decrypt(dbSecurityCode);

    return decryptedSecrityCode; 
}

export function encrypter() {
    const CRYPTR_KEY: string = process.env.CRYPTR_KEY || "valex";
    const cryptr = new Cryptr(CRYPTR_KEY);

    return cryptr;
}

export function encryptPassword(password: string) {
    const encryptedPassword = hashSync(password, 10);

    return encryptedPassword;
}

export function encryptSecurityCode(cryptr: Cryptr, securityCode: string) {
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

export function generateSecurityCode() {
    const securityCode: string = faker.finance.creditCardCVV();

    return securityCode;
}

export function verifyExpiration(date: string) {
    if (dayjs(date).diff(dayjs().format("MM/YY")) < 0) return true;

    return false;
}

export function verifyPassword(password: string) {
    const passwordRGX = /^[0-9]{4,6}$/;

    return passwordRGX.test(password);
}




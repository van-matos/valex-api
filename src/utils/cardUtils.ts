import bcrypt from "bcrypt";
import Cryptr from "cryptr";
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';

import * as cardRepository from "../repositories/cardRepository";
import * as businessRepository from "../repositories/businessRepository";

export async function calculateBalance(recharges: any[], payments: any[]) {
    const rechargesTotal = calculateAmount(recharges);
    const paymentsTotal = calculateAmount(payments);

    function calculateAmount(transactions: any[]) {
        const transactionsTotal = transactions.map(
            (transaction: { amount: number}) => transaction.amount
        );
        
        if (transactions.length === 0) return 0;

        return transactionsTotal.reduce((total, current) => total + current);
    }

    return rechargesTotal - paymentsTotal;
}

export function checkCardBlocked(card: cardRepository.Card) {
    if (card.isBlocked)
        throw { status: 403, message: "Card is blocked" };
}

export async function checkCardBusinessTypes(
    card: cardRepository.Card,
    business: businessRepository.Business
) {
    if (business.type !== card.type) {
        throw {
            status: 400,
            message: "Este estabelecimento não é do mesmo tipo do cartão!",
        };
    }
    return;
}

export function comparePasswords(cardPassword: string , password: string) {
    return bcrypt.compareSync(password, cardPassword);
}

export function decryptSecurityCode(cryptr: Cryptr, cardSecurityCode: string, securityCode: string) {
    const decryptedSecrityCode = cryptr.decrypt(cardSecurityCode);

    if (decryptedSecrityCode !== securityCode)
        throw { status: 401, message: "Access denied" };   
}

export function encrypter() {
    const CRYPTR_KEY: string = process.env.CRYPTR_KEY || "valex";
    const cryptr = new Cryptr(CRYPTR_KEY);

    return cryptr;
}

export function encryptPassword(password: string) {
    const encryptedPassword = bcrypt.hashSync(password, 10);

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
    if (dayjs(date).diff(dayjs().format("MM/YY")) < 0)
        throw { status: 403, message: "Card expired" };

    return false;
}

export function verifyPassword(password: string) {
    const passwordRGX = /^[0-9]{4,6}$/;

    if (!passwordRGX.test(password))
        throw { status: 405, message: "Invalid password" }; 
    ;
}
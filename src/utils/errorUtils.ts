export function cardActivated() {
    return { type: "activated_card", message: "Card already activated."};
}

export function duplicateCardType(entity: string) {
    return { type: "duplicate_type", message: `This employee already has a ${entity} card.`};
}

export function expiredCard() {
    return { type: "expired_card", message: "Card expired."};
}

export function invalidPassword() {
    return { type: "invalid_password", message: "Invalid password."};
}

export function invalidSecurityCode() {
    return { type: "invalid_security_code", message: "Invalid security code."};
}

export function notFound(entity: string) {
    return { type: "invalid_entity", message: `Invalid ${entity} ID.`};
}

export function unauthorizedCompany() {
    return { type: "invalid_key", message: "Invalid API Key."};
}
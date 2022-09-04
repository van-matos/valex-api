export function unauthorizedCompany() {
    return { type: "invalid_key", message: "Invalid API Key."}
}

export function employeeNotFound() {
    return { type: "invalid_employee", message: "Employee not found."};
}

export function duplicateCardType(entity: string) {
    return { type: "duplicate_type", message: `This employee already has a ${entity} card.`};
}
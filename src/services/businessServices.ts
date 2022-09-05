import * as businessRepository from "../repositories/businessRepository";

export async function BusinessIsRegistered(businessId: number) {
    const business = await businessRepository.findById(businessId);
    if (!business) {
       throw { status: 404, message: "Business not found" };
    }

    return business;
}
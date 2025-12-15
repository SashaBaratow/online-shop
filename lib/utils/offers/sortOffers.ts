import type { Offer } from '@/types';

export function sortOffersByPrice(offers: Offer[]): Offer[] {
    return [...offers].sort((a, b) => a.price.amount - b.price.amount);
}

export function sortOffersByDelivery(offers: Offer[]): Offer[] {
    return [...offers].sort(
        (a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime(),
    );
}

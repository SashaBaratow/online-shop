import { describe, expect, it } from 'vitest';
import { sortOffersByDelivery, sortOffersByPrice } from './sortOffers';
import {Offer} from "@/types";

const offers: Offer[] = [
    {
        id: '1',
        productId: 'p1',
        seller: 'A',
        rating: 4,
        stockQty: 10,
        price: { amount: 200, currency: 'KGS' },
        deliveryDate: '2025-12-20T00:00:00.000Z',
    },
    {
        id: '2',
        productId: 'p1',
        seller: 'B',
        rating: 5,
        stockQty: 5,
        price: { amount: 100, currency: 'KGS' },
        deliveryDate: '2025-12-15T00:00:00.000Z',
    },
    {
        id: '3',
        productId: 'p1',
        seller: 'C',
        rating: 3,
        stockQty: 7,
        price: { amount: 150, currency: 'KGS' },
        deliveryDate: '2025-12-18T00:00:00.000Z',
    },
];

describe('sortOffers', () => {
    it('sortOffersByPrice sorts by price asc and does not mutate input', () => {
        const input = [...offers];
        const result = sortOffersByPrice(input);

        expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
        expect(input.map((o) => o.id)).toEqual(['1', '2', '3']); // не мутировали
    });

    it('sortOffersByDelivery sorts by deliveryDate asc', () => {
        const result = sortOffersByDelivery(offers);
        expect(result.map((o) => o.id)).toEqual(['2', '3', '1']);
    });
});

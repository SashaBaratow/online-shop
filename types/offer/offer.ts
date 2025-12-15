export type Currency = 'KGS' | 'USD' | 'EUR';

export interface Money {
    amount: number;
    currency: Currency;
}

export interface Offer {
    id: string;
    productId: string;
    seller: string;
    rating?: number;
    stockQty?: number;
    price: Money;
    deliveryDate: string;
}
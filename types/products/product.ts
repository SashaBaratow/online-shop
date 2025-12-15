import {Money} from "@/types/offer/offer";

export interface Product {
    id: string;
    title: string;
    slug: string;
    sku: string;
    preview: {
        url: string;
        alt?: string;
    };
    price: Money;
    rating?: number;
    category?: string;
    tags?: string[];
    stockTotal: number;
    deliveryNearest?: string;
    createdAt: string;
    updatedAt: string;
}
import {Product} from "@/types/products/product";
import {Offer} from "@/types";

export type Attribute = {
    attributeId: string;
    code: string,
    label: string;
    type: 'string' | 'number' | 'boolean' | 'color';
    value: string[] | number | string;
    unit?: string;
}

export interface ProductDetails extends Product {
    description: string;
    bigImage: {
        url: string;
        alt?: string;
    }
    attributes: Attribute[];

    offers: Offer[];
}

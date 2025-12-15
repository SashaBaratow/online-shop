import type { ProductDetails } from '../../types/index';
import { randomId, randomFromArray, randomNumber } from './helpers';
import {generateOffers} from "@/lib/mock/generateOffers";

const categories = ['phones', 'laptops', 'accessories'];

export function generateProducts(count = 100): ProductDetails[] {
    return Array.from({ length: count }).map((_, index) => {
        const id = randomId();
        const price = randomNumber(10000, 150000);

        return {
            id,
            title: `Товар ${index + 1}`,
            slug: `product-${index + 1}`,
            description: 'Подробное описание товара. Очень полезное.',
            sku: `sku_${id}`,
            preview: {
                url: 'https://placehold.co/600x400.png',
                alt: 'Product image',
            },
            bigImage: {
                url: 'https://placehold.co/210x210.png',
                alt: 'Product image',
            },
            price: {
                amount: price,
                currency: 'KGS',
            },
            rating: Number((Math.random() * 5).toFixed(1)),
            category: randomFromArray(categories),
            tags: ['new', 'popular'],
            attributes: [
                {
                    attributeId: 'brand',
                    code: 'brand',
                    label: 'Бренд',
                    type: 'string',
                    value: randomFromArray(['apple', 'samsung', 'xiaomi']),
                },
                {
                    attributeId: 'memory',
                    code: 'memory',
                    label: 'память',
                    type: 'number',
                    value: randomNumber(1, 5),
                    unit: 'GB',
                },
            ],
            offers: generateOffers(id, price),
            stockTotal: 35,
            deliveryNearest: '2025-12-20T00:00:00.000Z',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
    });
}

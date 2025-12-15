import {Offer} from "@/types";
import {randomFromArray, randomId, randomNumber} from "@/lib/mock/helpers";


const sellers = [
    'TechnoMart',
    'Gadget Store',
    'Mobile KG',
    'BestSeller',
    'Shop24',
    'MegaTech',
];

function addDaysISO(days: number) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString();
}

export function generateOffers(productId: string, basePrice: number): Offer[] {
    const count = randomNumber(2, 4);

    return Array.from({ length: count }).map((_, idx) => {
        const sellerName = randomFromArray(sellers);
        const sellerRating = Number((Math.random() * 5).toFixed(1));
        const stockCount = Number((Math.random() * 25).toFixed(1));
        const delta = randomNumber(-3000, 6000);
        const amount = Math.max(1000, basePrice + delta);

        const deliveryDate = addDaysISO(randomNumber(1, 7));

        return {
            id: randomId(),
            productId,
            seller: sellerName,
            rating: sellerRating,
            stockQty: stockCount,
            price: {
                amount,
                currency: 'KGS',
            },
            deliveryDate,
        };
    });
}
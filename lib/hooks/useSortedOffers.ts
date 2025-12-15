import { useMemo } from 'react';
import type { Offer } from '@/types';
import {sortOffersByDelivery, sortOffersByPrice} from "@/lib/utils/offers/sortOffers";

type SortKey = 'price' | 'deliveryDate';

export function useSortedOffers(
    offers: Offer[] | undefined,
    sort: SortKey,
) {
    return useMemo(() => {
        if (!offers) return [];

        if (sort === 'price') {
            return sortOffersByPrice(offers);
        }

        return sortOffersByDelivery(offers);
    }, [offers, sort]);
}

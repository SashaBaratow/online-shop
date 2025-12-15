import {Product} from "@/types";

export type ProductsListResponse = {
    items: Product[];
    meta: {
        total: number;
        perPage: number;
        page: number;
        lastPage: number;
    };
};

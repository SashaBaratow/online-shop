import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient';
import { keepPreviousData } from '@tanstack/react-query';
import {ProductsListResponse} from "@/types";

export function useProducts(page: number) {
    return useQuery({
        queryKey: ['products', page],
        queryFn: () => apiClient.get<ProductsListResponse>('/products', { page }),
        placeholderData: keepPreviousData,
        staleTime: 30_000,
    });
}

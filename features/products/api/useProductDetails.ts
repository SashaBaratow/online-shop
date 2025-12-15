import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/apiClient';
import type { ProductDetails } from '@/types';

export function useProductDetails(id?: string) {

    return useQuery({
        queryKey: ['product', id],
        queryFn: () => apiClient.get<ProductDetails>(`/products/${id}`),
        enabled: Boolean(id),
        staleTime: 5 * 60_000, // 5 минут
        gcTime: 30 * 60_000, // 30 минут
    });
}

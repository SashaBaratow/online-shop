'use client';

import { useEffect, useRef, useState } from 'react';
import { useProducts } from '@/features/products/api/useProducts';
import type { Product } from '@/types';
import { useInfiniteScroll } from '@/lib/hooks/useInfiniteScroll';
import {ErrorBlock} from "@/components/ui";
import {ProductsSkeleton} from "@/app/(home)/_components/productsSkeleton";
import {ProductsGrid} from "@/app/(home)/_components/productsGrid";

export default function HomePage() {
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<Product[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const { data, isLoading, isError, error, refetch, isFetching, isPlaceholderData } =
        useProducts(page)

    const maxPage = data?.meta?.lastPage ?? 1;
    const hasMore = page < maxPage;

    useEffect(() => {
        if (!data) return;
        if (isPlaceholderData) return;

        setItems((prev) => [...prev, ...data.items]);

    }, [data, isPlaceholderData]);

    useInfiniteScroll(
        bottomRef,
        () => {
            if (isFetching) return;
            if (!hasMore) return;
            setPage((p) => p + 1);
        },
        hasMore,
    );
    useEffect(() => {
        setItems([]);
        setPage(1);
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="mb-6 text-center text-2xl font-semibold">Marketplace Mockup</h1>

            {isError && (
                <ErrorBlock
                    title="Ошибка загрузки"
                    message={(error as Error).message}
                    onRetry={() => refetch()}
                    isRetrying={isFetching}
                />
            )}

            {isLoading && items.length === 0 && <ProductsSkeleton count={10} />}

            {items.length > 0 && <ProductsGrid products={items}/>}

            <div ref={bottomRef} className="h-10" />

            {isFetching && items.length > 0 && <ProductsSkeleton count={5} />}

            {!hasMore && items.length > 0 && (
                <p className="mt-6 text-center text-sm text-slate-500">End of list</p>
            )}
        </div>
    );
}


'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

import { useProductDetails } from '@/features/products/api/useProductDetails';
import {Button, ErrorBlock} from "@/components/ui";
import {ProductDetailsSkeleton} from "@/app/products/[id]/_conponents/productDetailsSkeleton";
import {useSortedOffers} from "@/lib/hooks/useSortedOffers";
import Image from "next/image";

type SortKey = 'price' | 'deliveryDate';

function formatMoney(amount: number, currency: string) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatDate(iso: string) {
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(iso));
}

function Stars({ value }: { value: number }) {
    const filled = Math.round(value);
    return (
        <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < filled ? '' : 'opacity-30'}>
          ★
        </span>
            ))}
            <span className="ml-1 text-xs text-slate-500">{value.toFixed(1)}</span>
        </div>
    );
}

export default function ProductPage() {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const { data, isLoading, isError, error, refetch, isFetching } = useProductDetails(id);

    const [sort, setSort] = useState<SortKey>('price');

    const sortedOffers = useSortedOffers(data?.offers, sort);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-6">
                <ProductDetailsSkeleton />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-6">
                <ErrorBlock
                    title="Ошибка загрузки товара"
                    message={(error as Error).message}
                    onRetry={() => refetch()}
                    isRetrying={isFetching}
                />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="mx-auto max-w-7xl px-4 py-6">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_0.9fr]">
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-slate-100 text-slate-500 sm:aspect-square">
                        <Image
                            src={data?.bigImage?.url}
                            alt={data?.bigImage?.alt || data?.title}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <h1 className="text-xl font-semibold leading-tight text-[#111111]">{data.title}</h1>

                    <div className="mt-2">
                        <Stars value={data.rating ?? 1} />
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                        <div>
                            <span className="text-slate-400">Артикул:</span>{' '}
                            <span className="font-medium text-slate-700">{data.sku}</span>
                        </div>
                    </div>

                    <div className="mt-4 space-y-3 text-sm">
                        {data?.attributes?.map((a) => (
                            <div key={a.attributeId} className="flex gap-3">
                                <div className="w-32 shrink-0 text-slate-500">{a.label}</div>
                                <div className="font-medium text-slate-800">
                                    {String(a.value)}
                                    {a.unit ? ` ${a.unit}` : ''}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5">
                        <Button className="w-full" variant="primary">
                            Характеристики и описание
                        </Button>
                    </div>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                        <div className="text-xs text-slate-500">Сортировка:</div>
                        <div className="flex gap-2">
                            <Button
                                variant={sort === 'price' ? 'primary' : 'secondary'}
                                className="px-3 py-1.5 text-xs"
                                onClick={() => setSort('price')}
                            >
                                По цене
                            </Button>
                            <Button
                                variant={sort === 'deliveryDate' ? 'primary' : 'secondary'}
                                className="px-3 py-1.5 text-xs"
                                onClick={() => setSort('deliveryDate')}
                            >
                                По дате доставки
                            </Button>
                        </div>
                    </div>

                    <div className="mt-3 max-h-[520px] space-y-3 overflow-auto pr-1 lg:max-h-[560px]">
                        {sortedOffers.map((o) => (
                            <div key={o.id} className="rounded-xl border bg-white p-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <div className="text-sm font-semibold text-slate-900">{o.seller}</div>

                                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                            <span className="text-green-600">★</span>
                                            <span>Рейтинг {o.rating ? o?.rating.toFixed(1) : 1}</span>
                                            <span className="text-slate-300">•</span>
                                            <span>{formatDate(o.deliveryDate)}</span>
                                        </div>
                                    </div>

                                    <div className="text-sm font-semibold text-slate-900">
                                        {formatMoney(o.price.amount, o.price.currency)}
                                    </div>
                                </div>

                                <div className="mt-2 text-xs text-slate-500">
                                    В наличии: {Math.floor(o.stockQty ?? 0)}
                                </div>
                            </div>
                        ))}

                        {sortedOffers.length === 0 && (
                            <div className="rounded-xl border p-3 text-sm text-slate-500">
                                Нет предложений
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
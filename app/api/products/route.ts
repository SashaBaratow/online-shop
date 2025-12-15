import { NextResponse } from 'next/server';
import type { Product, ProductDetails } from '@/types';
import {products} from "@/lib/mock/products";

export const runtime = 'nodejs';

const PER_PAGE = 15;

function toProductListItem(p: ProductDetails): Product {

    const nearestMs =
        p.offers.length > 0
            ? p.offers
                .map((o) => new Date(o.deliveryDate).getTime())
                .reduce((min, t) => Math.min(min, t), Number.POSITIVE_INFINITY)
            : undefined;

    const deliveryNearest = nearestMs ? new Date(nearestMs).toISOString() : undefined;

    return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        sku: p.sku,
        preview: p.preview,
        price: p.price,
        rating: p.rating,
        category: p.category,
        tags: p.tags,
        stockTotal: Math.floor(p.offers.reduce((sum, o) => sum + (o.stockQty ?? 0), 0)),
        deliveryNearest,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
    };
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const pageRaw = Number(searchParams.get('page') ?? 1);
    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? pageRaw : 1;

    const total = products.length;
    const lastPage = Math.max(1, Math.ceil(total / PER_PAGE));

    const start = (page - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    const items = products.slice(start, end).map(toProductListItem);

    return NextResponse.json(
        {
            items,
            meta: {
                total,
                perPage: PER_PAGE,
                page,
                lastPage,
            },
        },
        { headers: { 'Cache-Control': 'no-store' } },
    );
}
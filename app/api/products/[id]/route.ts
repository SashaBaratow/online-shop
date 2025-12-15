import { NextResponse } from 'next/server';
import { products } from '@/lib/mock/products';
import type { ProductDetails } from '@/types';

export const runtime = 'nodejs';

type Params = { id: string };

export async function GET(
    _req: Request,
    ctx: { params: Promise<Params> })
{
    const { id } = await ctx.params;
    const product = (products as ProductDetails[]).find((p) => p.id === id);

    if (!product) {
        return NextResponse.json(
            { message: 'Sorry Product not found' },
            { status: 404, headers: { 'Cache-Control': 'no-store' } },
        );
    }

    return NextResponse.json(product, {
        status: 200,
        headers: { 'Cache-Control': 'no-store' },
    });
}

import {Product} from "@/types";
import Link from "next/link";
import Image from 'next/image';


type ProductCardData = Pick<
    Product,
    'id' | 'title' | 'price' | 'preview' | 'rating' | 'stockTotal' | 'deliveryNearest'
>;

export function ProductCard({product}: { product: ProductCardData }) {

    return (
        <Link
            href={`/products/${product.id}`}
            className="block"
        >
            <div className="rounded-xl border bg-white p-3 shadow-sm transition cursor-pointer hover:shadow-md">
                <div
                    className="mb-3 flex aspect-square items-center justify-center rounded-lg bg-slate-100 text-sm text-slate-500">
                    <Image
                        src={product.preview.url}
                        alt={product.preview.alt || product.title}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                </div>

                <h2 className="text-sm font-medium text-[#111111]">{product.title}</h2>

                <p className="mt-1 text-sm font-semibold text-blue-600">
                    ${product.price.amount}
                </p>

                <div className="mt-1 text-xs text-yellow-500">
                    {'★'.repeat(Math.round(product.rating && product.rating > 1 ? product.rating : 3.1 ))}
                </div>

                <p className="mt-1 text-xs text-slate-500">
                    In stock: {product.stockTotal}
                </p>

                <p className="text-xs text-slate-500">
                    Delivery:{' '}
                    {product.deliveryNearest
                        ? new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: '2-digit' }).format(
                            new Date(product.deliveryNearest),
                        )
                        : '—'}
                </p>
            </div>
        </Link>
    );
}

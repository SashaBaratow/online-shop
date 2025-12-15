import {Product} from "@/types";
import {ProductCard} from "@/app/(home)/_components/productCard";

type ProductCardData = Pick<
    Product,
    'id' | 'title' | 'price' | 'preview' | 'rating' | 'stockTotal'
>;

export function ProductsGrid({ products }: { products: ProductCardData[] }) {
    return (
        <div
            className="
        grid gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
      "
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}



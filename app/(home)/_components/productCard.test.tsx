import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './productCard';

vi.mock('next/link', () => {
    return {
        default: ({ href, children, ...props }: any) => (
            <a href={href} {...props}>
                {children}
            </a>
        ),
    };
});

describe('ProductCard', () => {
    it('renders product data (including delivery)', () => {
        render(
            <ProductCard
                product={{
                    id: 'p1',
                    title: 'Product A',
                    price: { amount: 12345, currency: 'KGS' },
                    preview: { url: 'https://placehold.co/600x400', alt: 'img' },
                    rating: 4.2,
                    stockTotal: 35,
                    deliveryNearest: '2025-12-20T00:00:00.000Z',
                }}
            />,
        );

        expect(screen.getByText('Product A')).toBeInTheDocument();
        expect(screen.getByText('$12345')).toBeInTheDocument();
        expect(screen.getByText(/In stock:/i)).toHaveTextContent('In stock: 35');
        expect(screen.getByText(/Delivery:/i)).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/products/p1');
    });

    it('renders fallback delivery when deliveryNearest is missing', () => {
        render(
            <ProductCard
                product={{
                    id: 'p2',
                    title: 'Product B',
                    price: { amount: 100, currency: 'KGS' },
                    preview: { url: 'x', alt: 'x' },
                    rating: 0,
                    stockTotal: 0,
                    deliveryNearest: undefined,
                }}
            />,
        );

        expect(screen.getByText('Product B')).toBeInTheDocument();
        expect(screen.getByText(/In stock:/i)).toHaveTextContent('In stock: 0');
        expect(screen.getByText(/Delivery:/i)).toHaveTextContent('Delivery: —');
    });
});

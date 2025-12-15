'use client';

import cn from 'classnames';
import {ComponentPropsWithoutRef, ReactNode} from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

type Props = ComponentPropsWithoutRef<'button'> & {
    variant?: Variant;
    isLoading?: boolean;
    leftIcon?: ReactNode;
};

const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer';

const variants: Record<Variant, string> = {
    primary: `bg-black text-white hover:bg-black/90`,
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
};

function Button(
    {
        variant = 'primary',
        isLoading,
        className,
        disabled,
        children,
        ...props
    }: Props) {
    return (
        <button
            className={cn(base, variants[variant], className)}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"/>
                    <span>Загрузка…</span>
                </>
            ) : (
                <>
                    {children}
                </>
            )}
        </button>
    );
}

export default Button;

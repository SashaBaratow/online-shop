'use client';

import {Button} from "@/components/ui";
import {ComponentPropsWithoutRef} from "react";

type Props = ComponentPropsWithoutRef<'div'> & {
    title?: string;
    message?: string;
    onRetry?: () => void;
    isRetrying?: boolean;
};

function ErrorBlock(
    {
        title = 'Ошибка',
        message = 'Не удалось загрузить данные. Попробуйте ещё раз.',
        onRetry,
        isRetrying,
    }: Props) {
    return (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4" role={'alert'}>
            <p className="text-sm font-semibold text-red-800">{title}</p>
            <p className="mt-1 text-sm text-red-700">{message}</p>

            {onRetry && (
                <div className="mt-3">
                    <Button variant="secondary" onClick={onRetry} isLoading={isRetrying}>
                        Повторить
                    </Button>
                </div>
            )}
        </div>
    );
}
export default ErrorBlock;
'use client';

import {RefObject, useEffect} from 'react';

export function useInfiniteScroll(
    ref: RefObject<Element | null>,
    callback: () => void,
    enabled: boolean,
) {
    useEffect(() => {
        if (!enabled) return;
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            },
            { rootMargin: '200px' },
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [ref, callback, enabled]);
}

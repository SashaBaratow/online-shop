import {Skeleton} from "@/components/ui";

export function ProductDetailsSkeleton() {
    return (
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_0.9fr]">
            <div className="rounded-2xl border bg-white p-4">
                <Skeleton className="aspect-[4/3] rounded-xl sm:aspect-square" />
            </div>

            <div className="rounded-2xl border bg-white p-4">
                <Skeleton className="h-7 w-3/4" />
                <Skeleton className="mt-3 h-4 w-1/3" />
                <Skeleton className="mt-2 h-3 w-1/2" />
                <div className="mt-6 space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                </div>
                <Skeleton className="mt-6 h-10 w-full rounded-lg" />
            </div>

            <div className="rounded-2xl border bg-white p-4">
                <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-7 w-40" />
                </div>
                <div className="mt-4 space-y-3">
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                    <Skeleton className="h-20 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}

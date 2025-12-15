import {Skeleton} from "@/components/ui";

export function ProductsSkeleton({count = 10} : {count: number}) {
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
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="rounded-xl border p-3" role="status" aria-live="polite">
                    <Skeleton className="mb-3 aspect-square" />
                    <Skeleton className="mb-2 h-4 w-3/4" />
                    <Skeleton className="mb-2 h-4 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                </div>
            ))}
        </div>
    );
}

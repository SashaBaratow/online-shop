import cn from 'classnames';
import {ComponentPropsWithoutRef} from "react";

type Props = ComponentPropsWithoutRef<'div'> & {
    className?: string;
};

function Skeleton({ className }: Props) {
    return <div className={cn('animate-pulse rounded-lg bg-gray-200', className)} />;
}
export default Skeleton

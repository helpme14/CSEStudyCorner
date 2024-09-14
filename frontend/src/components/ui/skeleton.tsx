import {cn} from '@/lib/utils'

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  width?: string
  height?: string
}

function Skeleton({
  width = 'w-full',
  height = 'h-6',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200 dark:bg-gray-700',
        width,
        height,
        className
      )}
      {...props}
    />
  )
}

export {Skeleton}

import { cn } from '@/lib/utils/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-gray-200', className)} />;
}

// Card skeleton
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-gray-200 p-6', className)}>
      <div className='space-y-4'>
        <Skeleton className='h-4 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
        <Skeleton className='h-8 w-1/4' />
      </div>
    </div>
  );
}

// Text skeleton variants
export function TextSkeleton({ lines = 1, className }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`} />
      ))}
    </div>
  );
}

// Avatar skeleton
export function AvatarSkeleton({
  size = 'md',
  className,
}: SkeletonProps & { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />;
}

// Button skeleton
export function ButtonSkeleton({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-10 w-24 rounded-md', className)} />;
}

// Progress bar skeleton
export function ProgressSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Skeleton className='h-2 w-full rounded-full' />
      <Skeleton className='h-3 w-1/4' />
    </div>
  );
}

// Image skeleton
export function ImageSkeleton({
  aspectRatio = 'aspect-video',
  className,
}: SkeletonProps & { aspectRatio?: string }) {
  return <Skeleton className={cn('w-full rounded-md', aspectRatio, className)} />;
}

// Video player skeleton
export function VideoSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('relative aspect-video w-full rounded-md bg-gray-200', className)}>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center'>
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      </div>
    </div>
  );
}

// List skeleton
export function ListSkeleton({ items = 3, className }: SkeletonProps & { items?: number }) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className='flex items-center space-x-3'>
          <Skeleton className='h-4 w-4 rounded' />
          <Skeleton className='h-4 flex-1' />
          <Skeleton className='h-4 w-16' />
        </div>
      ))}
    </div>
  );
}

// Grid skeleton
export function GridSkeleton({
  columns = 3,
  rows = 2,
  className,
}: SkeletonProps & { columns?: number; rows?: number }) {
  return (
    <div
      className={cn('grid gap-4', className)}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

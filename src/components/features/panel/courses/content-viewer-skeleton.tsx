import { Skeleton, TextSkeleton, VideoSkeleton } from '@/components/ui/skeleton';

interface ContentViewerSkeletonProps {
  isVideo?: boolean;
}

export function ContentViewerSkeleton({ isVideo = false }: ContentViewerSkeletonProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4'>
      <div className='relative w-full max-w-3xl rounded-lg bg-white p-6 shadow-xl'>
        {/* Close Button Skeleton */}
        <div className='absolute right-4 top-4'>
          <Skeleton className='h-6 w-6' />
        </div>

        {/* Content Skeleton */}
        <div className='space-y-6'>
          {/* Title Skeleton */}
          <Skeleton className='h-8 w-3/4' />

          {isVideo ? (
            /* Video Player Skeleton */
            <VideoSkeleton className='h-96 w-full' />
          ) : (
            /* Article Content Skeleton */
            <div className='space-y-4'>
              <TextSkeleton lines={8} />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-5/6' />
                <Skeleton className='h-4 w-4/5' />
              </div>
            </div>
          )}

          {/* Additional Info Skeleton */}
          <div className='flex items-center space-x-4 pt-4 border-t border-gray-200'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoPlayerSkeleton() {
  return (
    <div className='relative aspect-video w-full rounded-md bg-gray-200'>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center'>
          <Skeleton className='h-8 w-8 rounded-full' />
        </div>
      </div>
      {/* Video Controls Skeleton */}
      <div className='absolute bottom-4 left-4 right-4'>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-2 flex-1 rounded-full' />
          <Skeleton className='h-6 w-12' />
        </div>
      </div>
    </div>
  );
}

export function ArticleContentSkeleton() {
  return (
    <div className='prose max-w-none'>
      <div className='space-y-4'>
        <TextSkeleton lines={3} />
        <div className='space-y-3'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-5/6' />
          <Skeleton className='h-4 w-4/5' />
        </div>
        <TextSkeleton lines={4} />
        <div className='space-y-3'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <TextSkeleton lines={2} />
      </div>
    </div>
  );
}

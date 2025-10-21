import Section from '@/components/layout/header/section';
import { ImageSkeleton, Skeleton } from '@/components/ui/skeleton';

export function CoursesSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Header Skeleton */}
      <Section>
        <div className='text-center md:text-left mb-8'>
          <Skeleton className='h-10 w-80 mx-auto md:mx-0 mb-4' />
          <Skeleton className='h-6 w-96 mx-auto md:mx-0' />
        </div>

        {/* Search and Filter Skeleton */}
        <div className='flex flex-col md:flex-row gap-4 mb-8'>
          <Skeleton className='h-12 flex-1' />
          <Skeleton className='h-12 w-32' />
          <Skeleton className='h-12 w-32' />
        </div>

        {/* Course Cards Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
            >
              <ImageSkeleton className='h-48 w-full' />
              <div className='p-6'>
                <Skeleton className='h-6 w-full mb-2' />
                <Skeleton className='h-4 w-3/4 mb-4' />
                <div className='flex justify-between items-center mb-4'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
                <div className='space-y-2 mb-4'>
                  <Skeleton className='h-2 w-full rounded-full' />
                  <div className='flex justify-between'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-3 w-12' />
                  </div>
                </div>
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className='flex justify-center items-center space-x-2 mt-8'>
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
        </div>
      </Section>
    </div>
  );
}

export function CourseModulesSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Header Skeleton */}
      <Section>
        <div className='text-center md:text-left mb-8'>
          <Skeleton className='h-10 w-80 mx-auto md:mx-0 mb-4' />
          <Skeleton className='h-6 w-96 mx-auto md:mx-0' />
        </div>

        {/* Course Cards Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'
            >
              <ImageSkeleton className='h-48 w-full' />
              <div className='p-6'>
                <Skeleton className='h-6 w-full mb-2' />
                <Skeleton className='h-4 w-3/4 mb-4' />
                <div className='flex justify-between items-center mb-4'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                </div>
                <div className='space-y-2 mb-4'>
                  <Skeleton className='h-2 w-full rounded-full' />
                  <div className='flex justify-between'>
                    <Skeleton className='h-3 w-16' />
                    <Skeleton className='h-3 w-12' />
                  </div>
                </div>
                <Skeleton className='h-10 w-full' />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className='flex justify-center items-center space-x-2 mt-8'>
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
          <Skeleton className='h-10 w-10' />
        </div>
      </Section>
    </div>
  );
}

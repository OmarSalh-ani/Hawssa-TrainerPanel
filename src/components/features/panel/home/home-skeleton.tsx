import Section from '@/components/layout/header/section';
import { CardSkeleton, ImageSkeleton, Skeleton } from '@/components/ui/skeleton';

export function HomeSkeleton() {
  return (
    <div className='flex flex-col gap-8'>
      {/* Banner Skeleton */}
      <div className='bg-gradient-to-b from-gray-200 to-gray-300 py-6 md:py-10'>
        <div className='max-w-[1240px] mx-auto px-4 w-full'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-8 w-64' />
                <Skeleton className='h-4 w-96' />
              </div>
            </div>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto'>
              <div className='space-y-1'>
                <Skeleton className='h-3 w-24' />
                <Skeleton className='h-5 w-32' />
              </div>
              <Skeleton className='h-12 w-40' />
            </div>
          </div>
        </div>
      </div>

      {/* Cards List Skeleton */}
      <Section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </Section>

      {/* Training Progress Skeleton */}
      <Section>
        <div className='space-y-6 bg-white rounded shadow-lg mb-8'>
          {/* Main Training Card Skeleton */}
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
            <div className='flex items-start justify-between mb-6'>
              <div className='flex-1'>
                <Skeleton className='h-6 w-64 mb-2' />
                <Skeleton className='h-4 w-48 mb-4' />
                <Skeleton className='h-8 w-32' />
              </div>
              <Skeleton className='h-12 w-12 rounded-full' />
            </div>
            <div className='space-y-4'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-2 w-full rounded-full' />
              <div className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-20' />
              </div>
            </div>
          </div>

          {/* Additional Training Cards Skeleton */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* Course Library Skeleton */}
      <Section>
        <div className='space-y-6 bg-white rounded shadow-lg mb-8 p-6'>
          <div className='text-center md:text-left'>
            <Skeleton className='h-8 w-64 mx-auto md:mx-0 mb-2' />
            <Skeleton className='h-4 w-80 mx-auto md:mx-0' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
                <ImageSkeleton className='h-48 w-full mb-4' />
                <Skeleton className='h-6 w-full mb-2' />
                <Skeleton className='h-4 w-3/4 mb-4' />
                <div className='flex justify-between items-center'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-8 w-24' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Engagement Performance Skeleton */}
      <Section>
        <div className='space-y-6 bg-gray-50 rounded-lg p-6'>
          <div className='text-center md:text-left'>
            <Skeleton className='h-8 w-80 mx-auto md:mx-0 mb-2' />
            <Skeleton className='h-4 w-96 mx-auto md:mx-0' />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 3 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

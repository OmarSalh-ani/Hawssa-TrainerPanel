import Section from '@/components/layout/header/section';
import { ImageSkeleton, Skeleton, VideoSkeleton } from '@/components/ui/skeleton';

export function CourseDetailsSkeleton() {
  return (
    <div className='space-y-8'>
      {/* Hero Section Skeleton */}
      <Section>
        <div className='bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl p-8'>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='flex-1'>
              <Skeleton className='h-8 w-96 mb-4' />
              <Skeleton className='h-6 w-80 mb-6' />
              <div className='flex flex-wrap gap-4 mb-6'>
                <Skeleton className='h-8 w-24' />
                <Skeleton className='h-8 w-32' />
                <Skeleton className='h-8 w-28' />
              </div>
              <Skeleton className='h-12 w-40' />
            </div>
            <div className='lg:w-96'>
              <ImageSkeleton className='h-64 w-full rounded-lg' />
            </div>
          </div>
        </div>
      </Section>

      {/* Main Content Skeleton */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Video Player and Description */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Video Player Skeleton */}
          <Section>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <VideoSkeleton className='h-96 w-full mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-6 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
                <div className='flex items-center space-x-4'>
                  <Skeleton className='h-4 w-16' />
                  <Skeleton className='h-4 w-20' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
            </div>
          </Section>

          {/* Course Description Skeleton */}
          <Section>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <Skeleton className='h-6 w-48 mb-4' />
              <div className='space-y-3'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-3/4' />
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-2/3' />
              </div>
            </div>
          </Section>
        </div>

        {/* Right Column - Curriculum and Stats */}
        <div className='space-y-8'>
          {/* Course Stats Skeleton */}
          <Section>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
              <Skeleton className='h-6 w-32 mb-4' />
              <div className='space-y-4'>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className='flex justify-between items-center'>
                    <Skeleton className='h-4 w-24' />
                    <Skeleton className='h-4 w-16' />
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* Course Curriculum Skeleton */}
          <Section>
            <div className='bg-gray-50 rounded-xl p-6'>
              <div className='flex items-center justify-between mb-4'>
                <Skeleton className='h-6 w-32' />
                <Skeleton className='h-5 w-5' />
              </div>
              <div className='space-y-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className='flex items-center justify-between p-4 bg-white rounded-lg'
                  >
                    <div className='flex items-center space-x-3'>
                      <Skeleton className='h-4 w-4 rounded' />
                      <Skeleton className='h-4 w-48' />
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Skeleton className='h-4 w-16' />
                      <Skeleton className='h-4 w-4' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

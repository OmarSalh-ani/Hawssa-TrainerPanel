import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className='min-h-screen'>
      {/* Banner Skeleton */}
      <div className='relative bg-gradient-to-r from-[#D7582B] to-[#C9633F] py-8 px-24'>
        <div className='relative z-10 flex items-center gap-6'>
          <Skeleton className='w-24 h-24 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-4 w-64' />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className='max-w-7xl mx-auto px-6 py-8 space-y-8'>
        {/* Trainer Information Card */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-6'>
            <Skeleton className='w-8 h-8 rounded-full' />
            <Skeleton className='h-5 w-48' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>

        {/* Location Details Card */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-6'>
            <Skeleton className='w-8 h-8 rounded-full' />
            <Skeleton className='h-5 w-48' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>

        {/* Gym Details Card */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-6'>
            <Skeleton className='w-8 h-8 rounded-full' />
            <Skeleton className='h-5 w-48' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2 md:col-span-2'>
              <Skeleton className='h-4 w-28' />
              <Skeleton className='h-10 w-full' />
            </div>
            <div className='space-y-2 md:col-span-2'>
              <Skeleton className='h-4 w-40' />
              <Skeleton className='h-10 w-full' />
            </div>
          </div>
        </div>

        {/* Availability Card */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center gap-3 mb-6'>
            <Skeleton className='w-8 h-8 rounded-full' />
            <Skeleton className='h-5 w-56' />
          </div>
          <div className='space-y-4'>
            {[...Array(4)].map((_, i) => (
              <div key={i} className='flex items-center gap-4 p-4 border border-gray-200 rounded-lg'>
                <Skeleton className='w-5 h-5 rounded' />
                <Skeleton className='h-4 w-20' />
                <div className='flex items-center gap-2 flex-1'>
                  <Skeleton className='h-10 w-full' />
                  <span className='text-lg font-bold text-gray-300'>-</span>
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

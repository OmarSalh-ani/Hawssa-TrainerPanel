'use client';
import { useReleases } from '@/hooks/releases';
import AlbumCard from './album-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function LatestReleasesSection() {
  const { data, isLoading, error } = useReleases({ page: 1, pageSize: 8 }, 'en');
  const releases = data?.data?.items || [];

  if (error) {
    return (
      <div className='py-16 bg-gray-50'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='text-center text-red-600'>
            <p>Failed to load releases. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='py-16 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Section Header */}
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-gray-800 mb-2'>Latest Releases Album</h2>
          <p className='text-gray-600'>Explore our newest fitness video albums</p>
        </div>

        {/* Album Grid */}
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <Skeleton className='aspect-video w-full' />
                <div className='p-4 space-y-3'>
                  <Skeleton className='h-5 w-3/4' />
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                  <Skeleton className='h-10 w-full' />
                </div>
              </div>
            ))}
          </div>
        ) : releases.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {releases.map(release => (
              <AlbumCard
                key={release.id}
                title={release.title}
                description={release.description}
                videoCount={`${release.videosCount} Video${release.videosCount !== 1 ? 's' : ''}`}
                image={release.imageUrl}
                href={`/hawssa-releases/${release.id}`}
              />
            ))}
          </div>
        ) : (
          <div className='text-center text-gray-600 py-12'>
            <p>No releases available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

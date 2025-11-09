'use client';
import { Calendar, Play, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import VideoCard from './video-card';
import { useReleaseVideos, useReleases } from '@/hooks/releases';
import { Skeleton } from '@/components/ui/skeleton';
import { ReleaseVideoViewer } from './release-video-viewer';
import { ReleaseVideo } from '@/lib/types/releases';
import { useState } from 'react';

interface ReleaseDetailsContentProps {
  releaseId: number;
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function ReleaseDetailsContent({ releaseId }: ReleaseDetailsContentProps) {
  const { data: videosData, isLoading: videosLoading, error: videosError } = useReleaseVideos(releaseId, 'en');
  const { data: releasesData } = useReleases({ page: 1, pageSize: 8 }, 'en');
  const [selectedVideo, setSelectedVideo] = useState<ReleaseVideo | null>(null);

  const release = videosData?.data;
  const videos = release?.videos || [];
  const allReleases = releasesData?.data?.items || [];

  // Find the full release info (including releaseDate) from the releases list
  const fullReleaseInfo = allReleases.find(r => r.id === releaseId);

  if (videosError) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full'>
          <h2 className='text-xl font-semibold text-red-800 mb-2'>Error Loading Release</h2>
          <p className='text-red-600'>
            {videosError instanceof Error ? videosError.message : 'Failed to load release data. Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  if (videosLoading || !release) {
    return (
      <div className='min-h-screen'>
        <div className='relative h-96 overflow-hidden bg-gray-200'>
          <Skeleton className='w-full h-full' />
        </div>
        <div className='py-16 bg-white'>
          <div className='max-w-6xl mx-auto px-6'>
            <Skeleton className='h-8 w-64 mb-4' />
            <Skeleton className='h-4 w-full mb-2' />
            <Skeleton className='h-4 w-3/4' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div className='relative h-96 overflow-hidden'>
        {release.imageUrl ? (
          <Image
            src={release.imageUrl}
            alt={release.title}
            fill
            className='object-cover object-center'
            priority
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-r from-[#D7582B] to-[#C9633F]' />
        )}
        <div className='absolute inset-0 bg-black/70' />

        <div className='relative z-10 flex items-center justify-center h-full'>
          <div className='text-center text-white px-6 max-w-4xl'>
            <h1 className='text-5xl font-bold mb-4'>{release.title}</h1>
            {fullReleaseInfo?.releaseDate && (
              <p className='text-2xl font-semibold mb-4 opacity-90'>{formatDate(fullReleaseInfo.releaseDate)}</p>
            )}

            {/* Breadcrumbs */}
            <div className='flex items-center justify-center gap-2 text-lg'>
              <Link href='/hawssa-releases' className='hover:text-yellow-400 transition-colors'>
                Hawssa Releases
              </Link>
              <span className='text-gray-400'>›</span>
              <span className='text-yellow-400'>{release.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className='py-16 bg-white'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {/* Text Content */}
            <div className='space-y-6'>
              <div>
                <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                  About {release.title}
                </h2>
                {fullReleaseInfo?.releaseDate && (
                  <p className='text-gray-600 text-lg'>Release Date: {formatDate(fullReleaseInfo.releaseDate)}</p>
                )}
              </div>

              <p className='text-gray-700 leading-relaxed'>
                {release.description}
              </p>

              {/* Feature Cards */}
              <div className='grid grid-cols-2 gap-4'>
                {fullReleaseInfo?.releaseDate && (
                  <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3'>
                    <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                      <Calendar className='w-4 h-4 text-black' />
                    </div>
                    <span className='font-medium text-gray-800'>{formatDate(fullReleaseInfo.releaseDate)}</span>
                  </div>
                )}
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                    <Play className='w-4 h-4 text-black' />
                  </div>
                  <span className='font-medium text-gray-800'>{videos.length} Video{videos.length !== 1 ? 's' : ''}</span>
                </div>
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                    <Users className='w-4 h-4 text-black' />
                  </div>
                  <span className='font-medium text-gray-800'>Expert Trainers</span>
                </div>
                <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                    <Play className='w-4 h-4 text-black' />
                  </div>
                  <span className='font-medium text-gray-800'>HD Video Quality</span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className='relative'>
              {release.imageUrl ? (
                <Image
                  src={release.imageUrl}
                  alt={release.title}
                  width={500}
                  height={400}
                  className='rounded-lg shadow-lg object-cover'
                />
              ) : (
                <div className='w-full h-[400px] bg-gradient-to-r from-[#D7582B] to-[#C9633F] rounded-lg shadow-lg' />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Program Videos Section */}
      <div className='py-16 bg-gray-50'>
        <div className='max-w-6xl mx-auto px-6'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-800 mb-2'>{release.title} Videos</h2>
            <p className='text-gray-600'>
              Browse all the powerful sessions included in this album, each video is crafted to
              boost your strength
            </p>
          </div>

          {videosLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                  <Skeleton className='aspect-video w-full' />
                  <div className='p-4 space-y-3'>
                    <Skeleton className='h-5 w-3/4' />
                    <Skeleton className='h-4 w-full' />
                    <Skeleton className='h-10 w-full' />
                  </div>
                </div>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {videos.map(video => (
                <VideoCard
                  key={video.videoId}
                  title={video.title}
                  description={video.description}
                  duration={formatDuration(video.lengthInSeconds)}
                  image={video.imageUrl}
                  onWatch={() => setSelectedVideo(video)}
                />
              ))}
            </div>
          ) : (
            <div className='text-center text-gray-600 py-12'>
              <p>No videos available for this release.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Albums Section */}
      {allReleases.length > 0 && (
        <div className='py-16 bg-white'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 mb-2'>
                Releases Album May Be Interest
              </h2>
              <p className='text-gray-600'>Explore our newest fitness video albums</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {allReleases
                .filter(r => r.id !== releaseId)
                .slice(0, 6)
                .map(release => (
                  <Link key={release.id} href={`/hawssa-releases/${release.id}`}>
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer'>
                      <div className='relative aspect-video overflow-hidden'>
                        {release.imageUrl ? (
                          <Image
                            src={release.imageUrl}
                            alt={release.title}
                            fill
                            className='object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-r from-[#D7582B] to-[#C9633F]' />
                        )}
                      </div>
                      <div className='p-4 space-y-3'>
                        <h3 className='font-semibold text-gray-800 text-lg line-clamp-2'>{release.title}</h3>
                        <p className='text-gray-600 text-sm line-clamp-3'>{release.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Viewer Modal */}
      {selectedVideo && (
        <ReleaseVideoViewer video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

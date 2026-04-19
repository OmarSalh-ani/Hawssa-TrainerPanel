'use client';
import { Button } from '@/components/ui/button';
import { Calendar, Lock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoCard from './video-card';
import { useReleaseVideos, useReleases } from '@/hooks/releases';
import { Skeleton } from '@/components/ui/skeleton';
import { ReleaseVideoViewer } from './release-video-viewer';
import { UnlockFullLibraryModal } from './unlock-full-library-modal';
import { ReleaseVideo } from '@/lib/types/releases';
import { getReleaseVideoChoreographyName, getReleaseVideoSongName } from '@/lib/utils/release-videos';
import { isHawssaReleaseLockedError } from '@/lib/utils/release-access';
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
  const { data: releasesData } = useReleases({ page: 1, pageSize: 100 }, 'en');
  const [selectedVideo, setSelectedVideo] = useState<ReleaseVideo | null>(null);
  const [unlockOpen, setUnlockOpen] = useState(false);

  const release = videosData?.data;
  const videos = release?.videos || [];
  const allReleases = releasesData?.data?.items || [];

  // Find the full release info (including releaseDate) from the releases list
  const fullReleaseInfo = allReleases.find(r => r.id === releaseId);

  if (videosError && isHawssaReleaseLockedError(videosError)) {
    return (
      <>
        <div className='min-h-screen flex items-center justify-center p-8 bg-gray-100'>
          <div className='bg-white border border-gray-200 rounded-xl shadow-lg p-8 max-w-md w-full text-center'>
            <div className='mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100'>
              <Lock className='h-7 w-7 text-yellow-700' aria-hidden />
            </div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>This release is locked</h2>
            <p className='text-gray-600 mb-6'>
              Unlock the Full HAWSSA Library to access all past releases and choreographies.
            </p>
            <Button
              type='button'
              className='w-full mb-4 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'
              onClick={() => setUnlockOpen(true)}
            >
              Unlock Full Library
            </Button>
            <Link
              to='/hawssa-releases'
              className='text-sm font-semibold text-gray-700 underline underline-offset-2 hover:no-underline'
            >
              Back to Hawssa Releases
            </Link>
          </div>
        </div>
        <UnlockFullLibraryModal open={unlockOpen} onClose={() => setUnlockOpen(false)} />
      </>
    );
  }

  if (videosError) {
    return (
      <div className='min-h-screen flex items-center justify-center p-8'>
        <div className='bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-md w-full'>
          <h2 className='text-xl font-semibold text-amber-950 mb-2'>Hawssa Releases unavailable</h2>
          <p className='text-amber-900/90'>
            {videosError instanceof Error ? videosError.message : 'Failed to load release data. Please try again later.'}
          </p>
          <Link
            to='/courses'
            className='mt-4 inline-block text-sm font-semibold text-amber-950 underline underline-offset-2 hover:no-underline'
          >
            Go to your courses
          </Link>
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

  const releaseHeroSong =
    [release.songName, fullReleaseInfo?.songName].find(s => typeof s === 'string' && s.trim().length > 0)?.trim() ??
    'No song';

  return (
    <div className='min-h-screen'>
      <UnlockFullLibraryModal open={unlockOpen} onClose={() => setUnlockOpen(false)} />
      {/* Hero Section */}
      <div className='relative h-96 overflow-hidden'>
        {release.imageUrl ? (
          <img
            src={release.imageUrl}
            alt={release.title}
            className='absolute inset-0 h-full w-full object-cover object-center'
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-r from-[#D7582B] to-[#C9633F]' />
        )}
        <div className='absolute inset-0 bg-black/70' />

        <div className='relative z-10 flex items-center justify-center h-full'>
          <div className='text-center text-white px-6 max-w-4xl'>
            <h1 className='text-5xl font-bold mb-4'>{release.title}</h1>
            <p className='text-xl sm:text-2xl font-medium text-yellow-300/95 mb-3'>
              Song:{' '}
              <span className={releaseHeroSong === 'No song' ? 'text-yellow-200/90' : ''}>{releaseHeroSong}</span>
            </p>
            {fullReleaseInfo?.releaseDate && (
              <p className='text-2xl font-semibold mb-4 opacity-90'>{formatDate(fullReleaseInfo.releaseDate)}</p>
            )}

            {/* Breadcrumbs */}
            <div className='flex items-center justify-center gap-2 text-lg'>
              <Link to='/hawssa-releases' className='hover:text-yellow-400 transition-colors'>
                Hawssa Releases
              </Link>
              <span className='text-gray-400'>›</span>
              <span className='text-yellow-400'>{release.title}</span>
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
                  songName={getReleaseVideoSongName(video)}
                  choreographyName={getReleaseVideoChoreographyName(video)}
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
                .map(rel => {
                  const card = (
                    <div
                      className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow cursor-pointer'
                    >
                      <div className='relative aspect-video overflow-hidden'>
                        {rel.imageUrl ? (
                          <img
                            src={rel.imageUrl}
                            alt={rel.title}
                            className='absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300'
                          />
                        ) : (
                          <div className='w-full h-full bg-gradient-to-r from-[#D7582B] to-[#C9633F]' />
                        )}
                        {rel.isLocked && (
                          <div className='absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none'>
                            <Lock className='w-10 h-10 text-yellow-400 drop-shadow-md' aria-hidden />
                          </div>
                        )}
                      </div>
                      <div className='p-4 space-y-3'>
                        <h3 className='font-semibold text-gray-800 text-lg line-clamp-2'>{rel.title}</h3>
                        <p className='text-sm text-gray-600'>
                          <span className='font-medium text-gray-700'>Song:</span>{' '}
                          <span className={rel.songName?.trim() ? 'text-gray-900' : 'text-gray-500'}>
                            {rel.songName?.trim() ? rel.songName.trim() : 'No song'}
                          </span>
                        </p>
                        <p className='text-gray-600 text-sm line-clamp-3'>{rel.description}</p>
                      </div>
                    </div>
                  );

                  if (rel.isLocked) {
                    return (
                      <div
                        key={rel.id}
                        role='button'
                        tabIndex={0}
                        onClick={() => setUnlockOpen(true)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setUnlockOpen(true);
                          }
                        }}
                      >
                        {card}
                      </div>
                    );
                  }

                  return (
                    <Link key={rel.id} to={`/hawssa-releases/${rel.id}`}>
                      {card}
                    </Link>
                  );
                })}
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

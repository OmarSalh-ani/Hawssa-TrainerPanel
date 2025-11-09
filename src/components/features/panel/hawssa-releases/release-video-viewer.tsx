'use client';

import { ReleaseVideo } from '@/lib/types/releases';
import { Play, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface ReleaseVideoViewerProps {
  video: ReleaseVideo;
  onClose?: () => void;
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
};

export function ReleaseVideoViewer({ video, onClose }: ReleaseVideoViewerProps) {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <div className='flex items-center space-x-2'>
            <Play className='w-5 h-5 text-blue-600' />
            <h2 className='text-xl font-bold text-gray-900'>{video.title}</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 text-2xl transition-colors'
            >
              <X className='w-6 h-6' />
            </button>
          )}
        </div>

        {/* Content */}
        <div className='p-6 max-h-[calc(90vh-80px)] overflow-y-auto'>
          <div className='space-y-4'>
            {/* Video Player */}
            <div className='aspect-video bg-black rounded-lg overflow-hidden'>
              {video.videoUrl ? (
                <video
                  controls
                  className='w-full h-full'
                  poster={video.imageUrl || undefined}
                  preload='metadata'
                >
                  <source src={video.videoUrl} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-gray-900'>
                  <p className='text-white'>Video URL not available</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>{video.title}</h3>
              {video.description && <p className='text-gray-600 mb-4'>{video.description}</p>}
              <div className='mt-4 flex items-center space-x-4'>
                <span className='text-sm text-gray-500'>
                  Duration: {formatDuration(video.lengthInSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReleaseVideoViewerSkeleton() {
  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        <div className='flex items-center justify-between p-4 border-b'>
          <Skeleton className='h-6 w-48' />
          <Skeleton className='h-6 w-6 rounded-full' />
        </div>
        <div className='p-6'>
          <Skeleton className='aspect-video w-full mb-4' />
          <Skeleton className='h-6 w-3/4 mb-2' />
          <Skeleton className='h-4 w-full' />
        </div>
      </div>
    </div>
  );
}

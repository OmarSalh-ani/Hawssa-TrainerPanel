'use client';

import { useArticleContent, useVideoContent } from '@/hooks/courses';
import { CourseContent } from '@/lib/types/courses';
import { FileText, Play } from 'lucide-react';
import { ContentViewerSkeleton } from './content-viewer-skeleton';

interface ContentViewerProps {
  content: CourseContent;
  onClose?: () => void;
}

export function ContentViewer({ content, onClose }: ContentViewerProps) {
  const {
    data: articleData,
    isLoading: isArticleLoading,
    error: articleError,
  } = useArticleContent(content.id, 'en');

  const {
    data: videoData,
    isLoading: isVideoLoading,
    error: videoError,
  } = useVideoContent(content.id, 'en');

  const isLoading = isArticleLoading || isVideoLoading;
  const hasError = articleError || videoError;

  if (isLoading) {
    return <ContentViewerSkeleton isVideo={content.isVideo} />;
  }

  if (hasError) {
    return (
      <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
        <div className='bg-white rounded-lg p-8 max-w-md w-full mx-4'>
          <div className='text-center'>
            <div className='text-red-500 text-6xl mb-4'>⚠️</div>
            <h2 className='text-xl font-bold text-gray-900 mb-2'>Error Loading Content</h2>
            <p className='text-gray-600 mb-4'>Unable to load the requested content.</p>
            {onClose && (
              <button
                onClick={onClose}
                className='px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300'
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b'>
          <div className='flex items-center space-x-2'>
            {content.isVideo ? (
              <Play className='w-5 h-5 text-blue-600' />
            ) : (
              <FileText className='w-5 h-5 text-green-600' />
            )}
            <h2 className='text-xl font-bold text-gray-900'>{content.title}</h2>
          </div>
          {onClose && (
            <button onClick={onClose} className='text-gray-400 hover:text-gray-600 text-2xl'>
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div className='p-6 max-h-[calc(90vh-80px)] overflow-y-auto'>
          {content.isVideo && videoData?.data ? (
            <div className='space-y-4'>
              <div className='aspect-video bg-black rounded-lg overflow-hidden'>
                <video controls className='w-full h-full' poster={content.image || undefined}>
                  <source src={videoData.data.url} type='video/mp4' />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>{videoData.data.title}</h3>
                {videoData.data.description && (
                  <p className='text-gray-600'>{videoData.data.description}</p>
                )}
                <div className='mt-4 flex items-center space-x-4'>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      videoData.data.isCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {videoData.data.isCompleted ? 'Completed' : 'In Progress'}
                  </span>
                  <span className='text-sm text-gray-500'>
                    Duration: {Math.floor(content.lengthInMinutes / 60)}:
                    {(content.lengthInMinutes % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          ) : !content.isVideo && articleData?.data ? (
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {articleData.data.title}
                </h3>
                <p className='text-gray-600 mb-4'>{articleData.data.description}</p>
                <div className='mt-4 flex items-center space-x-4'>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      articleData.data.isCompleted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {articleData.data.isCompleted ? 'Completed' : 'In Progress'}
                  </span>
                </div>
              </div>

              {/* Article content would go here */}
              <div className='prose max-w-none'>
                <div className='bg-gray-50 p-6 rounded-lg'>
                  <p className='text-gray-600 italic'>
                    Article content would be displayed here. This is a placeholder for the actual
                    article content.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className='text-center py-8'>
              <div className='text-gray-400 text-6xl mb-4'>📄</div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Content Not Available</h3>
              <p className='text-gray-600'>The requested content could not be loaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

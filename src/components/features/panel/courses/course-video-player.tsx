'use client';

import { CourseContent } from '@/lib/types/courses';
import { Play } from 'lucide-react';

interface CourseVideoPlayerProps {
  contents: CourseContent[];
}

export function CourseVideoPlayer({ contents }: CourseVideoPlayerProps) {
  // Find the first video content or the current playing content
  const currentContent = contents.find(content => content.isVideo) || contents[0];
  return (
    <div className='relative'>
      {/* Video Thumbnail */}
      <div className='relative w-full h-64 lg:h-80 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl overflow-hidden'>
        {/* Background Image Placeholder - In a real app, this would be the actual video thumbnail */}
        <div className='absolute inset-0 bg-gradient-to-br from-purple-500/80 to-blue-500/80'>
          {/* Simulate people silhouettes */}
          <div className='absolute bottom-4 left-4 right-4 flex justify-center space-x-2'>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
            <div className='w-8 h-16 bg-white/20 rounded-t-full'></div>
          </div>
        </div>

        {/* Play Button Overlay */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <button className='w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform'>
            <Play className='w-8 h-8 text-purple-600 ml-1' fill='currentColor' />
          </button>
        </div>
      </div>

      {/* Current Lesson Title */}
      <div className='mt-6'>
        <h3 className='text-2xl font-bold text-gray-900'>
          {currentContent?.title || 'No content available'}
        </h3>
      </div>
    </div>
  );
}

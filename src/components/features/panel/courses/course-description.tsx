'use client';

import { CourseDetails } from '@/lib/types/courses';

interface CourseDescriptionProps {
  course: CourseDetails;
}

export function CourseDescription({ course }: CourseDescriptionProps) {
  return (
    <div className='space-y-6'>
      {/* About Section */}
      <div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>About {course.title}</h2>
        <p className='text-gray-600 mb-4'>{course.description}</p>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Course Overview</h3>

        {/* Description with highlight bar */}
        <div className='relative pl-6'>
          <div className='absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 rounded-full'></div>
          <p className='text-gray-700 leading-relaxed'>
            This comprehensive course covers all the essential topics you need to master. With{' '}
            {course.videosCount} video lessons and {course.articlesCount} articles, you&apos;ll have
            access to a complete learning experience designed to help you succeed.
          </p>
        </div>
      </div>
    </div>
  );
}

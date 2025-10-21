'use client';

import { CourseDetailsHero } from '@/components/features/panel/courses/course-details-hero';
import { CourseDetailsMain } from '@/components/features/panel/courses/course-details-main';
import { useCourseContent } from '@/hooks/courses';
import { CourseDetailsSkeleton } from './course-details-skeleton';

interface CourseDetailsContentProps {
  courseId: string;
}

export function CourseDetailsContent({ courseId }: CourseDetailsContentProps) {
  const { data: courseContentData, isLoading, error } = useCourseContent(parseInt(courseId));

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Error Loading Course</h2>
          <p className='text-gray-600'>Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!courseContentData?.data) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Course Not Found</h2>
          <p className='text-gray-600'>The requested course could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <CourseDetailsHero course={courseContentData.data.course} />
      <CourseDetailsMain
        course={courseContentData.data.course}
        contents={courseContentData.data.contents}
      />
    </div>
  );
}

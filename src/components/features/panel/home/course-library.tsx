'use client';

import Section from '@/components/layout/header/section';
import { HomeData } from '@/lib/types/home';
import CourseCard from './course-card';

interface CourseLibraryProps {
  homeData?: HomeData;
}

export default function CourseLibrary({ homeData }: CourseLibraryProps) {
  // Transform API data to match component expectations
  const courses =
    homeData?.lastCourses?.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      videoCount: 0, // Not available in API
      duration: 'N/A', // Not available in API
      uploadDate: course.uploadDate,
      progressPercent: 0,
      status: 'not-started' as const,
      isLocked: false,
      buttonText: 'Start Course',
    })) || [];

  return (
    <Section>
      <div className='space-y-6 bg-white rounded shadow-lg mb-8 p-6'>
        {/* Header */}
        <div className='text-center md:text-left'>
          <h2 className='text-3xl font-semibold text-gray-900 mb-2'>Your Course Library</h2>
          <p className='text-sm text-gray-600'>Manage and track your fitness training courses.</p>
        </div>

        {/* Course Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </Section>
  );
}

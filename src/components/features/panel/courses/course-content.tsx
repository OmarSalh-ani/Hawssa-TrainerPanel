'use client';

import Team from '@/components/shared/team';
import { useCourses } from '@/hooks/courses';
import { useState } from 'react';
import { CourseModulesSection } from './course-modules-section';
import { CoursesSkeleton } from './courses-skeleton';
import { HeroBanner } from './hero-banner';
import { ProgressSection } from './progress-section';

export function CourseContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const {
    data: coursesData,
    isLoading,
    error,
  } = useCourses({
    pageNumber: currentPage,
    pageSize,
  });

  // Calculate progress from API data
  const progress = coursesData?.data
    ? {
        completed: coursesData.data.courses.filter(course => course.status === 'Completed').length,
        total: coursesData.data.courses.length,
        percentage: Math.round(
          (coursesData.data.courses.filter(course => course.status === 'Completed').length /
            coursesData.data.courses.length) *
            100,
        ),
        message: 'Keep up the great work!',
      }
    : {
        completed: 0,
        total: 0,
        percentage: 0,
        message: 'Start your learning journey!',
      };

  if (isLoading) {
    return <CoursesSkeleton />;
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Error Loading Courses</h2>
          <p className='text-gray-600'>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Banner */}
      <HeroBanner
        title='Your Path To Certification'
        subtitle='Boost Your Skills Take Certified Housa Courses'
        description='Complete our official training programs to unlock your Certified Trainer Badge and teach worldwide.'
      />

      {/* Progress Section */}
      <ProgressSection progress={progress} />

      {/* Course Modules Section */}
      <CourseModulesSection
        courses={coursesData?.data?.courses || []}
        pagination={coursesData?.data?.pagination}
        onPageChange={setCurrentPage}
      />

      {/* Team Section */}
      <Team />
    </div>
  );
}

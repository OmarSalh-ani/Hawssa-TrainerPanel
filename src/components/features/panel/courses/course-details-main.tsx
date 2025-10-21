'use client';

import { CourseContent, CourseDetails } from '@/lib/types/courses';
import { CourseCurriculum } from './course-curriculum';
import { CourseDescription } from './course-description';
import { CourseStats } from './course-stats';
import { CourseVideoPlayer } from './course-video-player';

interface CourseDetailsMainProps {
  course: CourseDetails;
  contents: CourseContent[];
}

export function CourseDetailsMain({ course, contents }: CourseDetailsMainProps) {
  return (
    <div className='max-w-7xl mx-auto px-6 lg:px-12 py-8'>
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
        {/* Top Section - Video Player and Stats */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 p-8'>
          {/* Video Player */}
          <div className='lg:col-span-2'>
            <CourseVideoPlayer contents={contents} />
          </div>

          {/* Course Stats */}
          <div className='lg:col-span-1'>
            <CourseStats course={course} />
          </div>
        </div>

        {/* Bottom Section - Description and Curriculum */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-8 pb-8'>
          {/* Course Description */}
          <div>
            <CourseDescription course={course} />
          </div>

          {/* Course Curriculum */}
          <div>
            <CourseCurriculum contents={contents} />
          </div>
        </div>
      </div>
    </div>
  );
}

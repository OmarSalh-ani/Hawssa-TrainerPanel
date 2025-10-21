'use client';

import { CourseDetails } from '@/lib/types/courses';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';

interface CourseDetailsHeroProps {
  course: CourseDetails;
}

export function CourseDetailsHero({ course }: CourseDetailsHeroProps) {
  return (
    <div className='relative h-80 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 overflow-hidden'>
      {/* Background decorative elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-10 left-20 w-16 h-16 bg-white/10 rounded-full'></div>
        <div className='absolute top-32 left-40 w-8 h-8 bg-white/20 rounded-full'></div>
        <div className='absolute bottom-20 right-32 w-12 h-12 bg-white/15 rounded-full'></div>
        <div className='absolute top-16 right-20 w-6 h-6 bg-white/25 transform rotate-45'></div>
        <div className='absolute bottom-32 left-60 w-10 h-10 bg-white/10 transform rotate-45'></div>

        {/* Abstract shapes */}
        <div className='absolute top-24 right-40 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-white/20'></div>
        <div className='absolute bottom-16 left-32 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[25px] border-b-white/15'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 h-full flex flex-col justify-center px-6 lg:px-12'>
        <div className='max-w-4xl'>
          {/* Breadcrumb */}
          <nav className='flex items-center space-x-2 text-white/90 text-sm mb-6'>
            <Link href='/courses' className='flex items-center hover:text-white transition-colors'>
              <Home className='w-4 h-4 mr-1' />
              Courses
            </Link>
            <ChevronRight className='w-4 h-4' />
            <span className='text-white'>Course Details</span>
          </nav>

          {/* Course Title */}
          <h1 className='text-4xl lg:text-6xl font-bold text-white mb-4'>{course.title}</h1>

          {/* Course Subtitle */}
          <p className='text-xl lg:text-2xl text-white/90 mb-8'>{course.description}</p>
        </div>
      </div>
    </div>
  );
}

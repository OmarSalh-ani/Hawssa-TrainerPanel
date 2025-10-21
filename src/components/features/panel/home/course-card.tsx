'use client';
import { Course } from '@/lib/data/courses';
import { Clock, Lock, Star, Users } from 'lucide-react';
import Image from 'next/image';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free':
        return 'bg-green-100 text-green-800';
      case 'premium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getButtonColor = (status: string) => {
    switch (status) {
      case 'free':
        return 'bg-[#F7F225] text-black hover:bg-[#E6D91F]';
      case 'premium':
        return 'bg-[#F7F225] text-black hover:bg-[#E6D91F] opacity-90';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden relative'>
      {/* Image Section */}
      <div className='relative h-48 overflow-hidden'>
        <Image
          src={course.image}
          alt={course.title}
          fill
          className={`object-cover ${course.isLocked ? 'blur-sm' : ''}`}
        />

        {/* Premium Overlay */}
        {course.isLocked && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='text-center text-white'>
              <Lock size={32} className='mx-auto mb-2' />
              <p className='text-sm font-medium'>Premium Content</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='p-4'>
        {/* Status and Rating */}
        <div className='flex items-center justify-between mb-3'>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              course.status,
            )}`}
          >
            {course.status === 'completed' ? 'Completed' : 'In Progress'}
          </span>
          <div className='flex items-center gap-1'>
            <Star size={14} className='text-yellow-500 fill-current' />
            <span className='text-sm font-medium text-gray-700'>{course.progress}%</span>
          </div>
        </div>

        {/* Title and Description */}
        <h3 className='text-lg font-semibold text-gray-900 mb-2'>{course.title}</h3>
        <p className='text-sm text-gray-600 mb-4 line-clamp-2'>{course.description}</p>

        {/* Course Metadata */}
        <div className='flex items-center gap-4 mb-4 text-sm text-gray-500'>
          <div className='flex items-center gap-1'>
            <Clock size={14} />
            <span>{course.duration}</span>
          </div>
          <div className='flex items-center gap-1'>
            <Users size={14} />
            <span>
              {course.videoCount} Student{course.videoCount !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${getButtonColor(
            course.status,
          )}`}
          disabled={course.isLocked}
        >
          {course.buttonText}
        </button>
      </div>
    </div>
  );
}

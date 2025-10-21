import { Button } from '@/components/ui/button';
import { Course } from '@/lib/types/courses';
import { Lock, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const getStatusColor = (status: Course['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Not Started':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: Course['status']) => {
    switch (status) {
      case 'Completed':
        return 'Completed';
      case 'In Progress':
        return 'In Progress';
      case 'Not Started':
        return 'Not Started';
      default:
        return 'Not Started';
    }
  };

  const getButtonVariant = (status: Course['status']) => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'default';
      case 'Not Started':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getButtonText = (status: Course['status']) => {
    switch (status) {
      case 'Completed':
        return 'Review Course';
      case 'In Progress':
        return 'Continue Learning';
      case 'Not Started':
        return 'Start Course';
      default:
        return 'Start Course';
    }
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'>
      {/* Course Image */}
      <div className='relative aspect-video bg-gray-100'>
        <Image src={course.image} alt={course.title} fill className='object-cover' />

        {/* Video Count Badge */}
        <div className='absolute top-3 right-3 bg-yellow-400 text-gray-800 px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1'>
          <Play className='w-3 h-3' />
          {course.videosCount} Video Class
        </div>

        {/* Lock Overlay for locked courses */}
        {course.isLocked && (
          <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
            <div className='text-center text-white'>
              <Lock className='w-12 h-12 mx-auto mb-2' />
              <div className='text-sm font-medium'>Unlock With Progress</div>
            </div>
          </div>
        )}
      </div>

      {/* Course Content */}
      <div className='p-6'>
        {/* Status Badge */}
        <div
          className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
            course.status,
          )} mb-4`}
        >
          {getStatusText(course.status)}
        </div>

        {/* Course Title */}
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>{course.title}</h3>

        {/* Course Description */}
        <p className='text-gray-600 mb-4 line-clamp-2'>{course.description}</p>

        {/* Course Details */}
        <div className='space-y-2 mb-6'>
          {course.status === 'Completed' && (
            <div className='text-sm text-gray-500'>
              Certificate earned on {new Date(course.uploadDate).toLocaleDateString()}
            </div>
          )}

          {course.status === 'In Progress' && (
            <div className='text-sm text-gray-500'>{course.progressPercent}% complete</div>
          )}

          {course.status === 'Not Started' && (
            <div className='text-sm text-gray-500'>Ready to start</div>
          )}
        </div>

        {/* Action Button */}
        <Link href={`/courses/${course.id}`}>
          <Button
            className='w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium'
            variant={getButtonVariant(course.status)}
            disabled={course.isLocked}
          >
            {getButtonText(course.status)}
          </Button>
        </Link>
      </div>
    </div>
  );
}

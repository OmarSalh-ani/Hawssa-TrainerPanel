import { Course, Pagination } from '@/lib/types/courses';
import { CourseCard } from './course-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CourseModulesSectionProps {
  courses: Course[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
}

export function CourseModulesSection({ 
  courses, 
  pagination, 
  onPageChange 
}: CourseModulesSectionProps) {
  return (
    <div className='bg-white py-16'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>Course Modules</h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            Comprehensive training modules designed to take you from beginner to advanced HIIT
            practitioner.
          </p>
        </div>

        {/* Courses Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        {pagination && onPageChange && pagination.totalPages > 1 && (
          <div className='flex justify-center items-center space-x-4 mt-12'>
            <Button
              variant='outline'
              onClick={() => onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className='flex items-center space-x-2'
            >
              <ChevronLeft className='w-4 h-4' />
              <span>Previous</span>
            </Button>
            
            <div className='flex items-center space-x-2'>
              <span className='text-sm text-gray-600'>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
            </div>
            
            <Button
              variant='outline'
              onClick={() => onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className='flex items-center space-x-2'
            >
              <span>Next</span>
              <ChevronRight className='w-4 h-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

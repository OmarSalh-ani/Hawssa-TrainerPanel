'use client';
import Section from '@/components/layout/header/section';
import { Progress } from '@/components/ui/progress';
import { TrainingCourse } from '@/lib/data/training';
import { BookOpen, CheckCircle, Play } from 'lucide-react';
import React from 'react';

interface AdditionalTrainingCardsProps {
  courses: TrainingCourse[];
}

export default function AdditionalTrainingCards({ courses }: AdditionalTrainingCardsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'not-started':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };

  const getProgressColor = (status: string, color: string) => {
    switch (status) {
      case 'completed':
        return '#10B981';
      case 'in-progress':
        return color;
      case 'not-started':
        return '#E5E7EB';
      default:
        return '#E5E7EB';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className='w-4 h-4' />;
      case 'in-progress':
        return <Play className='w-4 h-4' />;
      case 'not-started':
        return <BookOpen className='w-4 h-4' />;
      default:
        return <BookOpen className='w-4 h-4' />;
    }
  };

  return (
    <Section>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3'>
        {courses.map(course => (
          <div key={course.id} className='bg-white shadow-lg rounded-lg p-4'>
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-8 h-8 rounded-full flex items-center justify-center'
                  style={{ backgroundColor: course.color + '20' }}
                >
                  {React.createElement(course.icon, { size: 16, style: { color: course.color } })}
                </div>
                <h3 className='text-lg font-semibold text-[#344054]'>{course.title}</h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                  course.status,
                )}`}
              >
                {getStatusIcon(course.status)}
                <span>{getStatusText(course.status)}</span>
              </span>
            </div>

            {/* Progress Bar */}
            <div className='mb-4'>
              <Progress
                value={course.progress}
                className='h-2'
                style={
                  {
                    '--progress-color': getProgressColor(course.status, course.color),
                  } as React.CSSProperties
                }
              />
            </div>

            {/* Additional Info */}
            <div className='text-sm text-[#667085]'>
              {course.status === 'completed' && course.certificateEarned && (
                <p>Certificate earned on {course.certificateEarned}</p>
              )}
              {course.status === 'in-progress' && course.hoursRemaining && (
                <p>
                  {course.progress}% complete - {course.hoursRemaining} hours left
                </p>
              )}
              {course.status === 'not-started' && course.description && <p>{course.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

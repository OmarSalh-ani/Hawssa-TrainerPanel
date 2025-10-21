'use client';

import { CourseDetails } from '@/lib/types/courses';
import { Clock, FileText, Video } from 'lucide-react';

interface CourseStatsProps {
  course: CourseDetails;
}

export function CourseStats({ course }: CourseStatsProps) {
  const stats = [
    {
      icon: FileText,
      value: course.articlesCount.toString(),
      label: 'Articles',
      color: 'text-blue-600',
    },
    {
      icon: Video,
      value: course.videosCount.toString(),
      label: 'Videos',
      color: 'text-green-600',
    },
    {
      icon: Clock,
      value: 'N/A',
      label: 'Duration',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className='bg-gray-50 rounded-xl p-6'>
      <div className='space-y-6'>
        {stats.map((stat, index) => (
          <div key={index} className='flex items-center space-x-4'>
            <div className={`p-3 rounded-lg bg-white shadow-sm ${stat.color}`}>
              <stat.icon className='w-6 h-6' />
            </div>
            <div>
              <div className='text-3xl font-bold text-gray-900'>{stat.value}</div>
              <div className='text-sm text-gray-600 font-medium'>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

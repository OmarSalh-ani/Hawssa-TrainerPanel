'use client';

import Section from '@/components/layout/header/section';
import { HomeData } from '@/lib/types/home';
import { BookOpen, Play } from 'lucide-react';

import AdditionalTrainingCards from './additional-training-cards';
import MainTrainingCard from './main-training-card';

interface TrainingProgressProps {
  homeData?: HomeData;
}

export default function TrainingProgress({ homeData }: TrainingProgressProps) {
  // Transform API data to match component expectations
  const mainTrainingCourse = homeData?.lastCourseProgress
    ? {
        id: 1,
        title: homeData.lastCourseProgress.courseName,
        description: 'Continue your learning journey',
        progress: homeData.lastCourseProgress.completePercent,
        timeLeft: `${homeData.lastCourseProgress.hoursRemaining} hours remaining`,
        status: (homeData.lastCourseProgress.status === 'In Progress'
          ? 'in-progress'
          : homeData.lastCourseProgress.status === 'Completed'
          ? 'completed'
          : 'not-started') as 'completed' | 'in-progress' | 'not-started',
        lastAccess: homeData.lastCourseProgress.lastAccessTime,
        image: '/assets/course1.png', // Default image
        module: 'Current Module',
        icon: Play,
        color: '#3B82F6',
      }
    : {
        id: 1,
        title: 'Complete Programming Course',
        description: 'Master the fundamentals of programming',
        progress: 25,
        timeLeft: '3.2 hours remaining',
        status: 'in-progress' as const,
        lastAccess: '10 days ago',
        image: '/assets/course1.png',
        module: 'Current Module',
        icon: Play,
        color: '#3B82F6',
      };

  const additionalCourses =
    homeData?.lastCourses?.slice(1, 4).map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      image: course.image,
      progress: 0,
      status: 'not-started' as const,
      module: 'Module 1',
      icon: BookOpen,
      color: '#10B981',
    })) || [];

  return (
    <Section>
      <div className='space-y-6 bg-white rounded shadow-lg mb-8'>
        {/* Main Training Progress Card */}
        <MainTrainingCard course={mainTrainingCourse} />

        {/* Additional Training Cards */}
        <AdditionalTrainingCards courses={additionalCourses} />
      </div>
    </Section>
  );
}

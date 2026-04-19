'use client';

import Section from '@/components/layout/header/section';
import { HomeData } from '@/lib/types/home';
import { BookOpen, Play } from 'lucide-react';

import AdditionalTrainingCards from './additional-training-cards';
import MainTrainingCard from './main-training-card';

interface TrainingProgressProps {
  homeData?: HomeData;
}

function mapApiStatus(
  status: string,
): 'completed' | 'in-progress' | 'not-started' {
  const s = status?.trim().toLowerCase();
  if (s === 'completed' || s === 'مكتمل') return 'completed';
  if (s === 'in progress' || s === 'قيد التقدم') return 'in-progress';
  return 'not-started';
}

export default function TrainingProgress({ homeData }: TrainingProgressProps) {
  const last = homeData?.lastCourseProgress;

  const mainTrainingCourse = last
    ? {
        id: 1,
        title: last.courseName,
        description: 'Continue your learning journey',
        progress: last.completePercent,
        timeLeft: `${last.hoursRemaining} hours remaining`,
        status: mapApiStatus(last.status),
        lastAccess: last.lastAccessTime,
        image: '/assets/course1.png',
        module: 'Current Module',
        icon: Play,
        color: '#3B82F6',
      }
    : {
        id: 0,
        title: 'No recent course activity',
        description: 'Start or resume a course to see your progress here.',
        progress: 0,
        timeLeft: '—',
        status: 'not-started' as const,
        lastAccess: '—',
        image: '/assets/course1.png',
        module: '—',
        icon: Play,
        color: '#94A3B8',
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

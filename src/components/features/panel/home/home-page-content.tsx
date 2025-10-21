'use client';

import CardsList from '@/components/features/panel/home/cards-list';
import CourseLibrary from '@/components/features/panel/home/course-library';
import EngagementPerformance from '@/components/features/panel/home/engagement-performance';
import { HomeSkeleton } from '@/components/features/panel/home/home-skeleton';
import TrainingProgress from '@/components/features/panel/home/training-progress';
import Banner from '@/components/layout/header/banner';
import { useHomeData } from '@/hooks/home';

export default function HomePageContent() {
  const { data: homeData, isLoading, error } = useHomeData();

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Error Loading Dashboard</h2>
          <p className='text-gray-600'>Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      <Banner homeData={homeData?.data} />
      <CardsList homeData={homeData?.data} />
      <TrainingProgress homeData={homeData?.data} />
      <CourseLibrary homeData={homeData?.data} />
      <EngagementPerformance homeData={homeData?.data} />
    </div>
  );
}

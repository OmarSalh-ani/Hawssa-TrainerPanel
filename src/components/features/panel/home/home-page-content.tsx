'use client';

import CardsList from '@/components/features/panel/home/cards-list';
import CourseLibrary from '@/components/features/panel/home/course-library';
import { HomeSkeleton } from '@/components/features/panel/home/home-skeleton';
import TrainingProgress from '@/components/features/panel/home/training-progress';
import Banner from '@/components/layout/header/banner';
import type { UseQueryResult } from '@tanstack/react-query';
import type { GetHomeResponse } from '@/lib/types/home';

export interface HomePageContentProps {
  homeQuery: UseQueryResult<GetHomeResponse, Error>;
}

export default function HomePageContent({ homeQuery }: HomePageContentProps) {
  const { data: homeData, isLoading, error } = homeQuery;

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center max-w-md px-4'>
          <div className='text-red-500 text-6xl mb-4'>⚠️</div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>Error Loading Dashboard</h2>
          <p className='text-gray-600'>
            {error instanceof Error ? error.message : 'Please try again later.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8'>
      <Banner homeData={homeData} />
      <CardsList homeData={homeData} />
      <TrainingProgress homeData={homeData} />
      <CourseLibrary homeData={homeData} />
    </div>
  );
}

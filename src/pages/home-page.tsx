'use client';

import HomePageContent from '@/components/features/panel/home/home-page-content';
import { useHomeData } from '@/hooks/home';

export function HomePage() {
  const homeQuery = useHomeData();
  return <HomePageContent homeQuery={homeQuery} />;
}

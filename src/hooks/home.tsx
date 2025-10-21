'use client';

import { getHomeData } from '@/lib/apis/home/home.api';
import { useQuery } from '@tanstack/react-query';

// Query keys for React Query
export const homeKeys = {
  all: ['home'] as const,
  dashboard: () => [...homeKeys.all, 'dashboard'] as const,
};

/**
 * Hook to fetch home dashboard data
 * @param lang Language code (default: 'en')
 * @returns Query result with home data
 */
export const useHomeData = (lang: string = 'en') => {
  return useQuery({
    queryKey: homeKeys.dashboard(),
    queryFn: () => getHomeData(lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

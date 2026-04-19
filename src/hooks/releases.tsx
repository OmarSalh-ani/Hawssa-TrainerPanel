'use client';

import { getReleases, getReleaseVideos } from '@/lib/apis/releases/releases.api';
import { GetReleasesRequest } from '@/lib/types/releases';
import { useQuery } from '@tanstack/react-query';

// Query keys for React Query
export const releaseKeys = {
  all: ['releases'] as const,
  lists: () => [...releaseKeys.all, 'list'] as const,
  list: (params: GetReleasesRequest) => [...releaseKeys.lists(), params] as const,
  videos: () => [...releaseKeys.all, 'videos'] as const,
  video: (releaseId: number) => [...releaseKeys.videos(), releaseId] as const,
};

/**
 * Hook to fetch all releases with pagination
 * @param params Pagination parameters
 * @param lang Language code (default: 'en')
 * @returns Query result with releases data
 */
export const useReleases = (params: GetReleasesRequest, lang: string = 'en') => {
  return useQuery({
    queryKey: releaseKeys.list(params),
    queryFn: async () => {
      const res = await getReleases(params, lang);
      if (!res.success) {
        throw new Error(res.message || 'Failed to load releases');
      }
      return res;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch release videos by release ID
 * @param releaseId Release ID
 * @param lang Language code (default: 'en')
 * @returns Query result with release videos data
 */
export const useReleaseVideos = (releaseId: number, lang: string = 'en') => {
  return useQuery({
    queryKey: releaseKeys.video(releaseId),
    queryFn: async () => {
      const res = await getReleaseVideos(releaseId, lang);
      if (!res.success) {
        const err = new Error(res.message || 'Failed to load release videos') as Error & { code?: string };
        if (res.errorPayload?.code) err.code = res.errorPayload.code;
        throw err;
      }
      return res;
    },
    enabled: !!releaseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

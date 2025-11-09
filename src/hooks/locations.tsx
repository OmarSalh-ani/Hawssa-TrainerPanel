'use client';

import { getCities, getGovernments } from '@/lib/apis/locations/locations.api';
import { useQuery } from '@tanstack/react-query';

// Query keys
export const locationKeys = {
  all: ['locations'] as const,
  governments: (lang: string) => [...locationKeys.all, 'governments', lang] as const,
  cities: (governmentId: number, lang: string) =>
    [...locationKeys.all, 'cities', governmentId, lang] as const,
};

/**
 * Fetch all governments
 * @param lang Language code (default: 'en')
 */
export const useGovernments = (lang: string = 'en') => {
  return useQuery({
    queryKey: locationKeys.governments(lang),
    queryFn: () => getGovernments(lang),
    staleTime: 30 * 60 * 1000, // 30 minutes - locations don't change often
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Fetch cities for a specific government
 * @param governmentId The ID of the government
 * @param lang Language code (default: 'en')
 * @param enabled Whether to enable the query (default: true)
 */
export const useCities = (governmentId: number, lang: string = 'en', enabled: boolean = true) => {
  return useQuery({
    queryKey: locationKeys.cities(governmentId, lang),
    queryFn: () => getCities(governmentId, lang),
    enabled: enabled && !!governmentId, // Only fetch if governmentId is provided and enabled is true
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

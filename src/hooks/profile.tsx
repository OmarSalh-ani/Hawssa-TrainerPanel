'use client';

import { getProfile, updateAvailability, updateProfile } from '@/lib/apis/profile/profile.api';
import { ProfileAvailabilityUpdateRequest, ProfileUpdateRequest } from '@/lib/types/profile';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const profileKeys = {
  all: ['profile'] as const,
  me: () => [...profileKeys.all, 'me'] as const,
};

/**
 * Fetch the current user's profile
 * @param lang Language code (default: 'en')
 */
export const useProfile = (lang: string = 'en') => {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: () => getProfile(lang),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

/**
 * Update the current user's profile
 * @param lang Language code (default: 'en')
 */
export const useUpdateProfile = (lang: string = 'en') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProfileUpdateRequest) => updateProfile(data, lang),
    onSuccess: () => {
      // Invalidate and refetch the profile after update
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
    },
  });
};

/**
 * Update only the availability schedule for the profile
 * @param lang Language code (default: 'en')
 */
export const useUpdateAvailability = (lang: string = 'en') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<ProfileAvailabilityUpdateRequest>) => updateAvailability(data, lang),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.me() });
    },
  });
};

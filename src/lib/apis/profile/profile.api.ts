import {
  Profile,
  ProfileAvailabilityUpdateRequest,
  ProfileUpdateRequest,
} from '@/lib/types/profile';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Fetch the current user's profile
 * @param lang Language code (default: 'en')
 */
export const getProfile = async (lang: string = 'en') => {
  const endpoint = `/api/${lang}/profile/me`;
  return await callAPI<Profile>('GET', endpoint);
};

/**
 * Update the current user's profile
 * @param data Profile update fields (FormData)
 * @param lang Language code (default: 'en')
 */
export const updateProfile = async (
  data: ProfileUpdateRequest,
  lang: string = 'en',
): Promise<ApiResponse<Profile>> => {
  const endpoint = `/api/${lang}/profile/update`;
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, `${value}`); // always as string
      }
    }
  });
  return await callAPI<Profile>('POST', endpoint, formData, {}, true);
};

/**
 * Update only the availability portion of the profile
 * @param data Availability update fields (as JSON body)
 * @param lang Language code (default: 'en')
 */
export const updateAvailability = async (
  data: Partial<ProfileAvailabilityUpdateRequest>,
  lang: string = 'en',
): Promise<ApiResponse<Profile>> => {
  const endpoint = `/api/${lang}/profile/availability`;
  // Send as JSON body instead of FormData
  return await callAPI<Profile>('POST', endpoint, data);
};

import { GetHomeResponse } from '@/lib/types/home';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Get home dashboard data
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetHomeResponse>>
 */
export const getHomeData = async (lang: string = 'en'): Promise<ApiResponse<GetHomeResponse>> => {
  const endpoint = `/api/${lang}/home`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetHomeResponse>;
};

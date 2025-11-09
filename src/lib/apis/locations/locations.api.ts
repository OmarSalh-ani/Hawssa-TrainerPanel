import { CitiesData, GovernmentsData } from '@/lib/types/locations';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Fetch all governments
 * @param lang Language code (default: 'en')
 */
export const getGovernments = async (
  lang: string = 'en',
): Promise<ApiResponse<GovernmentsData>> => {
  const endpoint = `/api/${lang}/locations/governments`;
  return await callAPI<GovernmentsData>('GET', endpoint);
};

/**
 * Fetch cities for a specific government
 * @param governmentId The ID of the government
 * @param lang Language code (default: 'en')
 */
export const getCities = async (
  governmentId: number,
  lang: string = 'en',
): Promise<ApiResponse<CitiesData>> => {
  const endpoint = `/api/${lang}/locations/governments/${governmentId}/cities`;
  return await callAPI<CitiesData>('GET', endpoint);
};

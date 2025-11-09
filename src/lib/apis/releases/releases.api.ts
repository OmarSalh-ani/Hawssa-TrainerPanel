import {
  GetReleasesRequest,
  GetReleasesResponse,
  GetReleaseVideosResponse,
} from '@/lib/types/releases';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Get all releases with pagination
 * @param params Pagination parameters
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetReleasesResponse>>
 */
export const getReleases = async (
  params: GetReleasesRequest,
  lang: string = 'en',
): Promise<ApiResponse<GetReleasesResponse>> => {
  const { page, pageSize } = params;
  const endpoint = `/api/${lang}/releases?page=${page}&pageSize=${pageSize}`;
  const response = await callAPI<GetReleasesResponse>('GET', endpoint);
  return response as ApiResponse<GetReleasesResponse>;
};

/**
 * Get release videos by release ID
 * @param releaseId Release ID
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetReleaseVideosResponse>>
 */
export const getReleaseVideos = async (
  releaseId: number,
  lang: string = 'en',
): Promise<ApiResponse<GetReleaseVideosResponse>> => {
  const endpoint = `/api/${lang}/releases/${releaseId}/videos`;
  const response = await callAPI<GetReleaseVideosResponse>('GET', endpoint);
  return response as ApiResponse<GetReleaseVideosResponse>;
};

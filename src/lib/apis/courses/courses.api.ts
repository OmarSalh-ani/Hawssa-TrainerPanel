import {
  GetArticleContentResponse,
  GetCourseContentResponse,
  GetCoursesRequest,
  GetCoursesResponse,
  GetVideoContentResponse,
} from '@/lib/types/courses';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Get all courses with pagination
 * @param params Pagination parameters
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetCoursesResponse>>
 */
export const getCourses = async (
  params: GetCoursesRequest,
  lang: string = 'en',
): Promise<ApiResponse<GetCoursesResponse>> => {
  const { pageNumber, pageSize } = params;
  const endpoint = `/api/${lang}/courses?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetCoursesResponse>;
};

/**
 * Get course content by course ID
 * @param courseId Course ID
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetCourseContentResponse>>
 */
export const getCourseContent = async (
  courseId: number,
  lang: string = 'en',
): Promise<ApiResponse<GetCourseContentResponse>> => {
  const endpoint = `/api/${lang}/courses/${courseId}/content`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetCourseContentResponse>;
};

/**
 * Get article content by content ID
 * @param contentId Content ID
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetArticleContentResponse>>
 */
export const getArticleByContentId = async (
  contentId: number,
  lang: string = 'en',
): Promise<ApiResponse<GetArticleContentResponse>> => {
  const endpoint = `/api/${lang}/courses/content/${contentId}/article`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetArticleContentResponse>;
};

/**
 * Get video content by content ID
 * @param contentId Content ID
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetVideoContentResponse>>
 */
export const getVideoByContentId = async (
  contentId: number,
  lang: string = 'en',
): Promise<ApiResponse<GetVideoContentResponse>> => {
  const endpoint = `/api/${lang}/courses/content/${contentId}/video`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetVideoContentResponse>;
};

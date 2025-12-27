import {
  CreateBlogRequest,
  GetBlogsRequest,
  GetBlogsResponse,
  UpdateBlogRequest,
} from '@/lib/types/blogs';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Get all blogs with pagination
 * @param params Pagination parameters
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetBlogsResponse>>
 */
export const getBlogs = async (
  params: GetBlogsRequest,
  lang: string = 'en',
): Promise<ApiResponse<GetBlogsResponse>> => {
  const { page, pageSize } = params;
  const endpoint = `/api/${lang}/trainerblogs/me?page=${page}&pageSize=${pageSize}`;
  const response = await callAPI<GetBlogsResponse>('GET', endpoint);
  return response as ApiResponse<GetBlogsResponse>;
};

/**
 * Create a new blog
 * @param data Blog data
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<Blog>>
 */
export const createBlog = async (
  data: CreateBlogRequest,
  lang: string = 'en',
): Promise<ApiResponse<{ id: number; title: string; description: string; createdAt: string }>> => {
  const endpoint = `/api/${lang}/trainerblogs`;
  const response = await callAPI<{
    id: number;
    title: string;
    description: string;
    createdAt: string;
  }>('POST', endpoint, data);
  return response;
};

/**
 * Update an existing blog
 * @param id Blog ID
 * @param data Blog data
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<Blog>>
 */
export const updateBlog = async (
  id: number,
  data: UpdateBlogRequest,
  lang: string = 'en',
): Promise<ApiResponse<{ id: number; title: string; description: string; createdAt: string }>> => {
  const endpoint = `/api/${lang}/trainerblogs/${id}`;
  const response = await callAPI<{
    id: number;
    title: string;
    description: string;
    createdAt: string;
  }>('PUT', endpoint, data);
  return response;
};

/**
 * Delete a blog
 * @param id Blog ID
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<void>>
 */
export const deleteBlog = async (id: number, lang: string = 'en'): Promise<ApiResponse<void>> => {
  const endpoint = `/api/${lang}/trainerblogs/${id}`;
  const response = await callAPI<void>('DELETE', endpoint);
  return response;
};



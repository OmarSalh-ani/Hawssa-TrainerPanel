'use client';

import {
  getArticleByContentId,
  getCourseContent,
  getCourses,
  getVideoByContentId,
} from '@/lib/apis/courses/courses.api';
import { GetCoursesRequest } from '@/lib/types/courses';
import { useQuery } from '@tanstack/react-query';

// Query keys for React Query
export const courseKeys = {
  all: ['courses'] as const,
  lists: () => [...courseKeys.all, 'list'] as const,
  list: (params: GetCoursesRequest) => [...courseKeys.lists(), params] as const,
  details: () => [...courseKeys.all, 'detail'] as const,
  detail: (id: number) => [...courseKeys.details(), id] as const,
  content: (id: number) => [...courseKeys.all, 'content', id] as const,
  article: (id: number) => [...courseKeys.all, 'article', id] as const,
  video: (id: number) => [...courseKeys.all, 'video', id] as const,
};

/**
 * Hook to fetch all courses with pagination
 * @param params Pagination parameters
 * @param lang Language code (default: 'en')
 * @returns Query result with courses data
 */
export const useCourses = (params: GetCoursesRequest, lang: string = 'en') => {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => getCourses(params, lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch course content by course ID
 * @param courseId Course ID
 * @param lang Language code (default: 'en')
 * @returns Query result with course content data
 */
export const useCourseContent = (courseId: number, lang: string = 'en') => {
  return useQuery({
    queryKey: courseKeys.content(courseId),
    queryFn: () => getCourseContent(courseId, lang),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch article content by content ID
 * @param contentId Content ID
 * @param lang Language code (default: 'en')
 * @returns Query result with article content data
 */
export const useArticleContent = (contentId: number, lang: string = 'en') => {
  return useQuery({
    queryKey: courseKeys.article(contentId),
    queryFn: () => getArticleByContentId(contentId, lang),
    enabled: !!contentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch video content by content ID
 * @param contentId Content ID
 * @param lang Language code (default: 'en')
 * @returns Query result with video content data
 */
export const useVideoContent = (contentId: number, lang: string = 'en') => {
  return useQuery({
    queryKey: courseKeys.video(contentId),
    queryFn: () => getVideoByContentId(contentId, lang),
    enabled: !!contentId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

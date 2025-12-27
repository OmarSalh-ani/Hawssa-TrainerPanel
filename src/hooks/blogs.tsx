'use client';

import { createBlog, deleteBlog, getBlogs, updateBlog } from '@/lib/apis/blogs/blogs.api';
import { CreateBlogRequest, GetBlogsRequest, UpdateBlogRequest } from '@/lib/types/blogs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

// Query keys for React Query
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (params: GetBlogsRequest) => [...blogKeys.lists(), params] as const,
};

/**
 * Hook to fetch all blogs with pagination
 * @param params Pagination parameters
 * @param lang Language code (default: 'en')
 * @returns Query result with blogs data
 */
export const useBlogs = (params: GetBlogsRequest, lang: string = 'en') => {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => getBlogs(params, lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to create a new blog
 * @param lang Language code (default: 'en')
 * @returns Mutation function to create blog
 */
export const useCreateBlog = (lang: string = 'en') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBlogRequest) => createBlog(data, lang),
    onSuccess: (response) => {
      // Invalidate all blog lists to refetch
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      // Show success toast with API response message
      if (response.success) {
        toast.success(response.message || 'Blog created successfully!');
      } else {
        toast.error(response.message || 'Failed to create blog.');
      }
    },
    onError: (error: unknown) => {
      // Show error toast
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred while creating the blog.';
      toast.error(errorMessage);
    },
  });
};

/**
 * Hook to update an existing blog
 * @param lang Language code (default: 'en')
 * @returns Mutation function to update blog
 */
export const useUpdateBlog = (lang: string = 'en') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateBlogRequest }) =>
      updateBlog(id, data, lang),
    onSuccess: (response) => {
      // Invalidate all blog lists to refetch
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      // Show success toast with API response message
      if (response.success) {
        toast.success(response.message || 'Blog updated successfully!');
      } else {
        toast.error(response.message || 'Failed to update blog.');
      }
    },
    onError: (error: unknown) => {
      // Show error toast
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred while updating the blog.';
      toast.error(errorMessage);
    },
  });
};

/**
 * Hook to delete a blog
 * @param lang Language code (default: 'en')
 * @returns Mutation function to delete blog
 */
export const useDeleteBlog = (lang: string = 'en') => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteBlog(id, lang),
    onSuccess: (response) => {
      // Invalidate all blog lists to refetch
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      // Show success toast with API response message
      if (response.success) {
        toast.success(response.message || 'Blog deleted successfully!');
      } else {
        toast.error(response.message || 'Failed to delete blog.');
      }
    },
    onError: (error: unknown) => {
      // Show error toast
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred while deleting the blog.';
      toast.error(errorMessage);
    },
  });
};

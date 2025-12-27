'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useBlogs } from '@/hooks/blogs';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import { BlogCard } from './blog-card';
import BlogFormDialog from './blog-form-dialog';

export default function BlogsContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isLoading, error } = useBlogs({ page: currentPage, pageSize }, 'en');

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='flex justify-between items-center mb-8'>
            <Skeleton className='h-8 w-48' />
            <Skeleton className='h-10 w-32' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className='h-64 rounded-lg' />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center p-8'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full'>
          <h2 className='text-xl font-semibold text-red-800 mb-2'>Error Loading Blogs</h2>
          <p className='text-red-600'>
            {error instanceof Error
              ? error.message
              : 'Failed to load blogs. Please try again later.'}
          </p>
          <Button onClick={() => window.location.reload()} className='mt-4' variant='outline'>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const blogs = data?.data?.items || [];
  const pagination = data?.data?.pagination;

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>My Blogs</h1>
            <p className='text-gray-600 mt-1'>
              {pagination?.totalItems || 0} blog{pagination?.totalItems !== 1 ? 's' : ''} total
            </p>
          </div>
          <Button
            onClick={() => setIsCreateOpen(true)}
            className='bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium'
          >
            <Plus className='w-4 h-4 mr-2' />
            Create Blog
          </Button>
        </div>

        {/* Blogs Grid */}
        {blogs.length > 0 ? (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className='flex justify-center items-center gap-4 mt-8'>
                <Button
                  variant='outline'
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className='flex items-center gap-2'
                >
                  <ChevronLeft className='w-4 h-4' />
                  Previous
                </Button>

                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-600'>
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                </div>

                <Button
                  variant='outline'
                  onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className='flex items-center gap-2'
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className='bg-white rounded-lg border border-gray-200 p-12 text-center'>
            <p className='text-gray-500 text-lg mb-4'>No blogs yet</p>
            <p className='text-gray-400 text-sm mb-6'>
              Start sharing your knowledge by creating your first blog post.
            </p>
            <Button
              onClick={() => setIsCreateOpen(true)}
              className='bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium'
            >
              <Plus className='w-4 h-4 mr-2' />
              Create Your First Blog
            </Button>
          </div>
        )}
      </div>

      {/* Create Dialog */}
      <BlogFormDialog open={isCreateOpen} onOpenChange={setIsCreateOpen} mode='create' />
    </div>
  );
}

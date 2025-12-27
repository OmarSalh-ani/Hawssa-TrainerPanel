'use client';

import { Button } from '@/components/ui/button';
import { Blog } from '@/lib/types/blogs';
import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BlogDeleteDialog from './blog-delete-dialog';
import BlogFormDialog from './blog-form-dialog';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200'>
        {/* Header */}
        <div className='flex items-start justify-between mb-4'>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>{blog.title}</h3>
            <p className='text-sm text-gray-500'>{formatDate(blog.createdAt)}</p>
          </div>
          <div className='flex gap-2 ml-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsEditOpen(true)}
              className='h-8 w-8 p-0'
            >
              <Edit className='w-4 h-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsDeleteOpen(true)}
              className='h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:border-red-300'
            >
              <Trash2 className='w-4 h-4' />
            </Button>
          </div>
        </div>

        {/* Description */}
        <p className='text-gray-600 line-clamp-3'>{blog.description}</p>
      </div>

      {/* Edit Dialog */}
      <BlogFormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        blog={blog}
        mode='edit'
      />

      {/* Delete Dialog */}
      <BlogDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        blogId={blog.id}
        blogTitle={blog.title}
      />
    </>
  );
}



'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteBlog } from '@/hooks/blogs';

interface BlogDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blogId: number;
  blogTitle: string;
}

export default function BlogDeleteDialog({
  open,
  onOpenChange,
  blogId,
  blogTitle,
}: BlogDeleteDialogProps) {
  const deleteBlog = useDeleteBlog('en');

  const handleDelete = () => {
    deleteBlog.mutate(blogId, {
      onSuccess: () => {
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{blogTitle}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant='outline' onClick={() => onOpenChange(false)} disabled={deleteBlog.isPending}>
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={deleteBlog.isPending}
          >
            {deleteBlog.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UnlockFullLibraryModalProps {
  open: boolean;
  onClose: () => void;
}

export function UnlockFullLibraryModal({ open, onClose }: UnlockFullLibraryModalProps) {
  const navigate = useNavigate();

  if (!open) return null;

  const handleUnlock = () => {
    onClose();
    navigate('/subscription', { state: { focusFullLibrary: true } });
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='unlock-library-title'
    >
      <div className='bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative'>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors'
          aria-label='Close'
        >
          <X className='w-6 h-6' />
        </button>
        <h2 id='unlock-library-title' className='text-2xl font-bold text-gray-900 mb-2 pr-8'>
          Unlock the Full HAWSSA Library
        </h2>
        <p className='text-gray-600 mb-8'>Access all past releases and choreographies</p>
        <Button
          type='button'
          onClick={handleUnlock}
          className='w-full py-6 text-base bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'
        >
          Unlock Full Library
        </Button>
      </div>
    </div>
  );
}

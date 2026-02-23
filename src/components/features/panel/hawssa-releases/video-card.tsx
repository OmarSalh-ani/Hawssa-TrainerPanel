import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoCardProps {
  title: string;
  description: string;
  duration: string;
  image: string;
  onWatch?: () => void;
  className?: string;
}

export default function VideoCard({
  title,
  description,
  duration,
  image,
  onWatch,
  className = '',
}: VideoCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow ${className}`}
    >
      {/* Image Container */}
      <div
        className={`relative aspect-video overflow-hidden ${onWatch ? 'cursor-pointer' : ''}`}
        onClick={onWatch}
        role={onWatch ? 'button' as const : undefined}
        tabIndex={onWatch ? 0 : undefined}
        aria-label={onWatch ? `Play ${title}` : undefined}
        onKeyDown={e => {
          if (!onWatch) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onWatch();
          }
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-r from-[#D7582B] to-[#C9633F] flex items-center justify-center'>
            <span className='text-white text-2xl font-bold'>{title.charAt(0)}</span>
          </div>
        )}
        {onWatch && (
          <>
            <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity' />
            <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
              <div className='w-14 h-14 rounded-full bg-white/90 flex items-center justify-center'>
                <Play className='w-7 h-7 text-black' />
              </div>
            </div>
          </>
        )}
        {/* Duration Badge */}
        <div className='absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold'>
          {duration}
        </div>
      </div>

      {/* Content */}
      <div className='p-4 space-y-3'>
        <h3 className='font-semibold text-gray-800 text-lg line-clamp-2'>{title}</h3>
        <p className='text-gray-600 text-sm line-clamp-3'>{description}</p>

        {/* Action Button */}
        <Button
          onClick={onWatch}
          className='w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'
        >
          <Play className='w-4 h-4 mr-2' />
          Watch Video
        </Button>
      </div>
    </div>
  );
}

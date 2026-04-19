import { Button } from '@/components/ui/button';
import { Lock, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AlbumCardProps {
  title: string;
  songName?: string | null;
  videoCount: string;
  image: string;
  href: string;
  className?: string;
  isLocked?: boolean;
  onLockedClick?: () => void;
}

export default function AlbumCard({
  title,
  songName,
  videoCount,
  image,
  href,
  className = '',
  isLocked = false,
  onLockedClick,
}: AlbumCardProps) {
  const songLabel = songName?.trim() ? songName.trim() : 'No song';

  const openLocked = () => onLockedClick?.();

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow ${isLocked ? 'cursor-pointer' : ''} ${className}`}
      role={isLocked ? 'button' : undefined}
      tabIndex={isLocked ? 0 : undefined}
      onClick={isLocked ? openLocked : undefined}
      onKeyDown={
        isLocked
          ? e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLocked();
              }
            }
          : undefined
      }
    >
      {/* Image Container */}
      <div className='relative aspect-video overflow-hidden'>
        {image ? (
          <img
            src={image}
            alt={title}
            className='absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300'
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-r from-[#D7582B] to-[#C9633F] flex items-center justify-center'>
            <span className='text-white text-2xl font-bold'>{title.charAt(0)}</span>
          </div>
        )}
        {isLocked && (
          <div className='absolute inset-0 bg-black/45 flex items-center justify-center pointer-events-none'>
            <Lock className='w-12 h-12 text-yellow-400 drop-shadow-md' aria-hidden />
          </div>
        )}
        {/* Video Count Badge */}
        <div className='absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
          <Video className='w-3 h-3' />
          {videoCount}
        </div>
      </div>

      {/* Content */}
      <div className='p-4 space-y-3'>
        <h3 className='font-semibold text-gray-800 text-lg line-clamp-2'>{title}</h3>
      

        {/* Action Button */}
        {isLocked ? (
          <Button type='button' className='w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'>
            View Release
          </Button>
        ) : (
          <Link to={href} onClick={e => e.stopPropagation()}>
            <Button className='w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'>
              View Release
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

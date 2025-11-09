import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AlbumCardProps {
  title: string;
  description: string;
  videoCount: string;
  image: string;
  href: string;
  className?: string;
}

export default function AlbumCard({
  title,
  description,
  videoCount,
  image,
  href,
  className = '',
}: AlbumCardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow ${className}`}
    >
      {/* Image Container */}
      <div className='relative aspect-video overflow-hidden'>
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
        {/* Video Count Badge */}
        <div className='absolute top-3 right-3 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
          <Video className='w-3 h-3' />
          {videoCount}
        </div>
      </div>

      {/* Content */}
      <div className='p-4 space-y-3'>
        <h3 className='font-semibold text-gray-800 text-lg line-clamp-2'>{title}</h3>
        <p className='text-gray-600 text-sm line-clamp-3'>{description}</p>

        {/* Action Button */}
        <Link href={href}>
          <Button className='w-full bg-yellow-400 text-black hover:bg-yellow-300 font-semibold'>
            View Album
          </Button>
        </Link>
      </div>
    </div>
  );
}

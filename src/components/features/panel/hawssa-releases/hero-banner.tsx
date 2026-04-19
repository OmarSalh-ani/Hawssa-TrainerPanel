import { Calendar, Play, Users } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div className='relative h-96 overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <img
          src='/assets/release-banner.png'
          alt='Hawssa Releases Hero'
          className='absolute inset-0 h-full w-full object-cover'
        />
        {/* Overlay */}
        <div className='absolute inset-0 bg-black/70' />
      </div>

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center h-full'>
        <div className='text-center text-white px-6 max-w-4xl'>
          <h1 className='text-5xl font-bold mb-4'>Hawssa Releases</h1>
          <p className='text-xl mb-8 opacity-90 max-w-2xl mx-auto'>
          Each HAWSSA release includes 6 new choreographies designed to keep classes fresh and exciting.
Certified instructors with an active membership automatically receive access to new releases as they are published.
Older releases may appear locked and can be unlocked anytime from the full library

          </p>

          {/* Feature Tags */}
          <div className='flex flex-wrap justify-center gap-4'>
           
           
            
          </div>
        </div>
      </div>
    </div>
  );
}

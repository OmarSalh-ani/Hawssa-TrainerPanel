interface HeroBannerProps {
  title: string;
  subtitle: string;
  description: string;
}

export function HeroBanner({ title, subtitle, description }: HeroBannerProps) {
  return (
    <div className='relative bg-gradient-to-br from-orange-600 via-orange-700 to-purple-800 min-h-[400px] overflow-hidden'>
      <img
        src='/assets/subscription-banner.png'
        alt='Courses Banner'
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='absolute inset-0 bg-black/40' />

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 py-16'>
        <div className='text-center text-white'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 leading-tight'>{title}</h1>
          <h2 className='text-xl md:text-2xl font-semibold mb-4 text-orange-100'>{subtitle}</h2>
          <p className='text-lg md:text-xl text-orange-50 max-w-4xl mx-auto leading-relaxed'>
            {description}
          </p>
        </div>
      </div>

      {/* Exercise Silhouettes */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/30 to-transparent' />
    </div>
  );
}

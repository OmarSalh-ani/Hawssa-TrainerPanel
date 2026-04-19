import { BarChart3, CreditCard, Headphones } from 'lucide-react';

interface HeroBannerProps {
  title: string;
  subtitle: string;
  benefits: {
    icon: string;
    text: string;
  }[];
}

const iconMap = {
  chart: BarChart3,
  'credit-card': CreditCard,
  headphones: Headphones,
};

export function HeroBanner({ title, subtitle, benefits }: HeroBannerProps) {
  return (
    <div className='relative bg-gradient-to-br from-purple-900 via-red-900 to-orange-900 min-h-[400px] flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div className='absolute inset-0'>
        <img
          src='/assets/subscription-banner.png'
          alt='Fitness training background'
          className='absolute inset-0 h-full w-full object-cover opacity-80'
        />
      </div>

      {/* Overlay */}
      <div className='absolute inset-0 bg-black/40' />

      {/* Content */}
      <div className='relative z-10 text-center text-white px-4 max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-bold mb-6'>{title}</h1>

        <p className='text-lg md:text-xl mb-8 text-gray-200 max-w-3xl mx-auto'>{subtitle}</p>

        {/* Benefits */}
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center justify-items-center p-4'>
          {benefits.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <div key={index} className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center'>
                  {IconComponent && <IconComponent className='w-6 h-6 text-black' />}
                </div>
                <span className='text-white font-medium'>{benefit.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { HomeData } from '@/lib/types/home';
import Image from 'next/image';

interface BannerProps {
  homeData?: HomeData;
}

export default function Banner({ homeData }: BannerProps) {
  // Use API data or fallback to default values
  const trainerName = homeData?.trainerFullName || 'Trainer';
  const subscription = homeData?.subscription;

  // Show banner only if there's subscription data and it's not active
  if (!subscription || subscription.status === 'Active') {
    return null;
  }

  return (
    <div className='bg-gradient-to-b from-[#D7582B] to-[#C9633F] py-6 md:py-10'>
      <div className='max-w-[1240px] mx-auto px-4 w-full'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
          {/* Main Content */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white'>
            <div className='bg-blur-md rounded-full p-2 flex-shrink-0'>
              <Image src='/assets/medal-star.svg' alt='Hawssa' width={50} height={50} />
            </div>
            <div className='flex-1'>
              <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2'>
                Welcome back, {trainerName}
              </h2>
              <p className='text-sm sm:text-base text-white/90 leading-relaxed'>
                {subscription.message}
              </p>
            </div>
          </div>

          {/* Action Section */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto'>
            <div className='text-white capitalize order-2 sm:order-1'>
              <p className='text-xs sm:text-sm'>subscription expires</p>
              <p className='font-bold text-base sm:text-lg'>{subscription.expirationDate}</p>
            </div>
            <Button className='bg-[#F7F225] hover:bg-[#E8CE23] text-black font-semibold rounded-md py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg transition-colors border-yellow-500 border-2 w-full sm:w-auto order-1 sm:order-2'>
              {subscription.buttonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

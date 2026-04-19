import { Button } from '@/components/ui/button';
import { HomeData } from '@/lib/types/home';
import { Link } from 'react-router-dom';

interface BannerProps {
  homeData?: HomeData;
}

function formatEndDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

/** Renewal / subscribe prompts driven by GET /api/.../home subscription payload */
export default function Banner({ homeData }: BannerProps) {
  const trainerName = homeData?.trainerFullName || 'Trainer';
  const subscription = homeData?.subscription;

  if (!subscription) {
    return (
      <div className='bg-gradient-to-b from-[#D7582B] to-[#C9633F] py-6 md:py-10'>
        <div className='max-w-[1240px] mx-auto px-4 w-full'>
          <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white'>
              <div className='bg-blur-md rounded-full p-2 flex-shrink-0'>
                <img src='/assets/medal-star.svg' alt='Hawssa' width={50} height={50} />
              </div>
              <div className='flex-1'>
                <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2'>
                  Welcome, {trainerName}
                </h2>
                <p className='text-sm sm:text-base text-white/90 leading-relaxed'>
                  You do not have an active subscription. Subscribe to unlock the full trainer panel and
                  courses.
                </p>
              </div>
            </div>
            <Button
              asChild
              className='bg-[#F7F225] hover:bg-[#E8CE23] text-black font-semibold rounded-md py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg transition-colors border-yellow-500 border-2 w-full sm:w-auto'
            >
              <Link to='/subscription'>Subscribe now</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (subscription.daysToEnd > 30) {
    return null;
  }

  return (
    <div className='bg-gradient-to-b from-[#D7582B] to-[#C9633F] py-6 md:py-10'>
      <div className='max-w-[1240px] mx-auto px-4 w-full'>
        <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white'>
            <div className='bg-blur-md rounded-full p-2 flex-shrink-0'>
              <img src='/assets/medal-star.svg' alt='Hawssa' width={50} height={50} />
            </div>
            <div className='flex-1'>
              <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2'>
                Welcome back, {trainerName}
              </h2>
              <p className='text-sm sm:text-base text-white/90 leading-relaxed'>
                {subscription.daysToEnd < 0
                  ? 'Your subscription has ended. Renew to keep full access.'
                  : subscription.daysToEnd === 0
                    ? 'Your subscription ends today. Renew to avoid interruption.'
                    : `Your ${subscription.subscriptionName} plan ends in ${subscription.daysToEnd} day${subscription.daysToEnd === 1 ? '' : 's'}. Renew to stay covered.`}
              </p>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto'>
            <div className='text-white capitalize order-2 sm:order-1'>
              <p className='text-xs sm:text-sm'>Subscription ends</p>
              <p className='font-bold text-base sm:text-lg'>{formatEndDate(subscription.endDate)}</p>
            </div>
            <Button
              asChild
              className='bg-[#F7F225] hover:bg-[#E8CE23] text-black font-semibold rounded-md py-3 sm:py-4 lg:py-6 text-sm sm:text-base lg:text-lg transition-colors border-yellow-500 border-2 w-full sm:w-auto order-1 sm:order-2'
            >
              <Link to='/subscription'>Renew / manage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

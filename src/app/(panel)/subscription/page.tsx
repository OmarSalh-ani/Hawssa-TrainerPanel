import { SubscriptionPlans } from '@/components/features/panel/subscription/subscription-plans';
import { HeroBanner } from '@/components/features/panel/subscription/hero-banner';

export default function SubscriptionPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <HeroBanner title='Elevate Your Training Career
' subtitle='Choose the perfect subscription plan to unlock premium features, expand your client base, and maximize your earning potential as a professional fitness trainer.
' benefits={[ {
  icon: 'chart',
  text: 'Instant Activation',
}, {
  icon: 'credit-card',
  text: 'Secure Payments',
}, {
  icon: 'headphones',
  text: '24/7 Support',
}]} />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <SubscriptionPlans />
      </div>
    </div>
  );
}

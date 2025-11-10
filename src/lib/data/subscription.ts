import { SubscriptionData } from '@/lib/types/subscription';

export const subscriptionData: SubscriptionData = {
  hero: {
    title: 'Elevate Your Training Career',
    subtitle:
      'Choose the perfect subscription plan to unlock premium features, expand your client base, and maximize your earning potential as a professional fitness trainer.',
    benefits: [
      {
        icon: 'chart',
        text: 'Instant Activation',
      },
      {
        icon: 'credit-card',
        text: 'Secure Payments',
      },
      {
        icon: 'headphones',
        text: '24/7 Support',
      },
    ],
  },
  notification: {
    title: 'Payment Verification Pending',
    description:
      'Your Bronze Plan payment is currently being verified. This process typically takes 24-48 hours.',
    paymentDate: 'November 28, 2024',
  },
  plans: [
    {
      id: 'bronze',
      title: 'Bronze Plan',
      price: '$19/mo',
      description: 'Perfect for starting trainers',
      features: [
        { text: 'All Free Features', isIncluded: true },
        { text: 'Personalized Workout Plan', isIncluded: true },
        { text: 'Progress Tracking', isIncluded: true },
        { text: '75% Ads Free Experience', isIncluded: true },
        { text: 'Mobile app access', isIncluded: false },
        { text: 'Video consultations', isIncluded: false },
      ],
      buttonText: 'Subscribe To Bronze',
      buttonColor: 'bg-orange-500 hover:bg-orange-600',
      iconColor: 'text-orange-500',
    },
    {
      id: 'gold',
      title: 'Gold Plan',
      price: '$50/mo',
      description: 'For growing fitness businesses',
      features: [
        { text: 'All Free Features', isIncluded: true },
        { text: 'Personalized Workout Plan', isIncluded: true },
        { text: 'Progress Tracking', isIncluded: true },
        { text: '75% Ads Free Experience', isIncluded: true },
        { text: 'Mobile app access', isIncluded: false },
        { text: 'Video consultations', isIncluded: false },
      ],
      buttonText: 'Subscribe To Gold',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      iconColor: 'text-yellow-500',
    },
    {
      id: '3-month',
      title: '3-Month Plan',
      price: '$70/mo',
      description: 'Quarterly commitment',
      features: [
        { text: 'All Free Features', isIncluded: true },
        { text: 'Personalized Workout Plan', isIncluded: true },
        { text: 'Progress Tracking', isIncluded: true },
        { text: '75% Ads Free Experience', isIncluded: true },
        { text: 'Mobile app access', isIncluded: true },
        { text: 'Video consultations', isIncluded: false },
      ],
      buttonText: 'Subscribe To 3-Month',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
      iconColor: 'text-blue-500',
      isPopular: false,
    },
    {
      id: '1-year',
      title: '1-Year Plan',
      price: '$120/mo',
      description: 'Maximum savings',
      features: [
        { text: 'All Free Features', isIncluded: true },
        { text: 'Personalized Workout Plan', isIncluded: true },
        { text: 'Progress Tracking', isIncluded: true },
        { text: '75% Ads Free Experience', isIncluded: true },
        { text: 'Mobile app access', isIncluded: true },
        { text: 'Video consultations', isIncluded: true },
      ],
      buttonText: 'Subscribe To 1-Year',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      iconColor: 'text-green-500',
      isPopular: true,
    },
  ],
};

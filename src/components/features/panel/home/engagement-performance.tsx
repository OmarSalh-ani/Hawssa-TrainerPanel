'use client';

import Section from '@/components/layout/header/section';
import { HomeData } from '@/lib/types/home';
import { Zap } from 'lucide-react';
import CertificateStatusCard from './certificate-status-card';
import EnergyLevelCard from './energy-level-card';
import SubscriptionStatusCard from './subscription-status-card';

interface EngagementPerformanceProps {
  homeData?: HomeData;
}

export default function EngagementPerformance({ homeData }: EngagementPerformanceProps) {
  // Create mock data for subscription and certificate since they're not in the API response
  const subscriptionData = homeData?.subscription || {
    id: 1,
    title: 'Plan State',
    status: 'Not Active' as const,
    statusColor: '#EF4444',
    expirationDate: '25/08/2025',
    daysRemaining: 23,
    message:
      'Your subscription expires in 23 days. Renew now to continue accessing premium features!',
    buttonText: 'Renew Subscription',
    buttonColor: '#FDE047',
  };

  const certificateData = {
    id: 2,
    title: 'Certificate Status',
    status: 'Not Active' as const,
    statusColor: '#EF4444',
    expirationDate: '25/08/2025',
    message:
      'Your trainer certificate has expired. Renew now to continue being a certified trainer on the platform.',
    downloadButtonText: 'Download',
    renewButtonText: 'Renew',
    renewButtonColor: '#FDE047',
  };

  // Create energy level data from API
  const energyLevelData = {
    id: 3,
    title: 'Energy Level',
    description: 'Keep your motivation burning bright!',
    icon: Zap,
    iconColor: '#8B5CF6',
    currentLevel: 94, // This could be calculated from coursesProgress or other metrics
    changePercentage: 12,
    changeType: 'increase' as const,
    weeklyGoal: 85,
    aboveTarget: 9,
  };

  return (
    <Section>
      <div className='space-y-6 bg-gray-50 rounded-lg p-6'>
        {/* Header */}
        <div className='text-center md:text-left'>
          <h2 className='text-3xl font-semibold text-gray-900 mb-2'>Engagement & Performance</h2>
          <p className='text-sm text-gray-600'>
            Track your influence and impact in the fitness community
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <SubscriptionStatusCard data={subscriptionData} />
          <CertificateStatusCard data={certificateData} />
          <EnergyLevelCard data={energyLevelData} />
        </div>
      </div>
    </Section>
  );
}

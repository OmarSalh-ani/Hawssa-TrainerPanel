'use client';

import { useSubscriptionStatus } from '@/hooks/subscription';
import { SubscriptionData } from '@/lib/data/engagement';
import { AlertCircle, CheckCircle, CreditCard, XCircle } from 'lucide-react';
import { useState } from 'react';
import { SubscriptionPlans } from '../subscription/subscription-plans';

interface SubscriptionStatusCardProps {
  data?: SubscriptionData;
}

export default function SubscriptionStatusCard({}: SubscriptionStatusCardProps) {
  const { data: subscriptionStatus, isLoading } = useSubscriptionStatus();
  const [showPlans, setShowPlans] = useState(false);

  // Use API data if available, otherwise fall back to props
  // const subscriptionData = subscriptionStatus?.data ||
  //   data || {
  //     id: 1,
  //     title: 'Plan State',
  //     status: 'Not Active' as const,
  //     statusColor: '#EF4444',
  //     expirationDate: '25/08/2025',
  //     daysRemaining: 23,
  //     message:
  //       'Your subscription expires in 23 days. Renew now to continue accessing premium features!',
  //     buttonText: 'Renew Subscription',
  //     buttonColor: '#FDE047',
  //   };

  const isActive = subscriptionStatus?.data?.isVerified && !subscriptionStatus?.data?.isExpired;
  const isExpired = subscriptionStatus?.data?.isExpired;

  if (isLoading) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='animate-pulse space-y-4'>
          <div className='flex items-center justify-between'>
            <div className='h-6 w-32 bg-gray-200 rounded'></div>
            <div className='h-6 w-20 bg-gray-200 rounded'></div>
          </div>
          <div className='h-4 w-48 bg-gray-200 rounded'></div>
          <div className='h-4 w-32 bg-gray-200 rounded'></div>
          <div className='h-10 w-full bg-gray-200 rounded'></div>
        </div>
      </div>
    );
  }

  if (showPlans) {
    return (
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-900'>Subscription Plans</h3>
          <button onClick={() => setShowPlans(false)} className='text-gray-400 hover:text-gray-600'>
            <XCircle className='w-5 h-5' />
          </button>
        </div>
        <SubscriptionPlans />
      </div>
    );
  }
  return (
    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div
            className='w-8 h-8 rounded-full flex items-center justify-center'
            style={{ backgroundColor: isActive ? '#10B981' + '20' : '#EF4444' + '20' }}
          >
            {isActive ? (
              <CheckCircle className='w-4 h-4' style={{ color: '#10B981' }} />
            ) : (
              <CreditCard className='w-4 h-4' style={{ color: '#EF4444' }} />
            )}
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>Plan State</h3>
        </div>
        <div className='flex items-center space-x-2'>
          {isActive ? (
            <CheckCircle className='w-5 h-5' style={{ color: '#10B981' }} />
          ) : (
            <XCircle className='w-5 h-5' style={{ color: '#EF4444' }} />
          )}
          <span className='text-sm font-medium' style={{ color: isActive ? '#10B981' : '#EF4444' }}>
            {isActive ? 'Active' : isExpired ? 'Expired' : 'Not Active'}
          </span>
        </div>
      </div>

      {/* Status Info */}
      <div className='mb-4'>
        {isActive ? (
          <>
            <p className='text-sm text-gray-600 mb-1'>Your subscription is active</p>
            <p className='text-lg font-medium text-green-600'>Enjoy premium features!</p>
          </>
        ) : isExpired ? (
          <>
            <p className='text-sm text-gray-600 mb-1'>Your subscription has expired</p>
            <p className='text-lg font-medium text-red-600'>Renew to continue</p>
          </>
        ) : (
          <>
            <p className='text-sm text-gray-600 mb-1'>No active subscription</p>
            <p className='text-lg font-medium text-gray-900'>Choose a plan to get started</p>
          </>
        )}
      </div>

      {/* Message with Icon */}
      <div className='flex items-start space-x-3 mb-6'>
        <div className='flex-shrink-0'>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isActive ? 'bg-green-100' : 'bg-purple-100'
            }`}
          >
            <AlertCircle className={`w-4 h-4 ${isActive ? 'text-green-600' : 'text-purple-600'}`} />
          </div>
        </div>
        <p className='text-sm text-gray-700 leading-relaxed'>
          {isActive
            ? 'Your subscription is active and you have access to all premium features.'
            : isExpired
            ? 'Your subscription has expired. Renew now to continue accessing premium features!'
            : 'Choose a subscription plan to unlock all premium features and content.'}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => setShowPlans(true)}
        className='w-full py-3 px-4 rounded-lg font-medium text-gray-900 transition-colors hover:opacity-90'
        style={{ backgroundColor: isActive ? '#10B981' : '#FDE047' }}
      >
        {isActive ? 'Manage Subscription' : 'Choose Plan'}
      </button>
    </div>
  );
}

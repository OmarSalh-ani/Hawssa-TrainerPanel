'use client';

import { HeroBanner } from '@/components/features/panel/subscription/hero-banner';
import { SubscriptionPlans } from '@/components/features/panel/subscription/subscription-plans';
import { useSubscriptionStatus } from '@/hooks/subscription';
import { hasActiveSubscription } from '@/lib/utils/subscription-access';
import { Calendar, CheckCircle2 } from 'lucide-react';

function formatDate(iso: string | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function SubscriptionPage() {
  const { data: statusResponse, isPending } = useSubscriptionStatus();

  if (isPending) {
    return (
      <div className='min-h-screen bg-gray-50 py-8 flex items-center justify-center'>
        <p className='text-gray-600 text-sm'>Loading subscription…</p>
      </div>
    );
  }

  const active = hasActiveSubscription(statusResponse);
  const sub = statusResponse?.data?.subscription;
  const hasFullLibrary = statusResponse?.data?.hasFullLibraryAccess;

  if (active) {
    return (
      <div className='min-h-screen bg-gray-50 py-8'>
        <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-xl shadow-lg border border-gray-200 p-8'>
            <div className='flex items-start gap-3 mb-8'>
              <CheckCircle2 className='w-8 h-8 text-green-600 shrink-0 mt-0.5' aria-hidden />
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>Your subscription</h1>
                <p className='text-gray-600 text-sm mt-1'>
                  You already have an active plan. You do not need to subscribe again until it expires.
                </p>
              </div>
            </div>

            {sub ? (
              <dl className='space-y-5'>
                <div>
                  <dt className='text-sm font-medium text-gray-500'>Plan</dt>
                  <dd className='text-lg font-semibold text-gray-900 mt-0.5'>
                    {sub.subscriptionName ?? '—'}
                  </dd>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <div className='flex gap-3 rounded-lg bg-gray-50 border border-gray-100 p-4'>
                    <Calendar className='w-5 h-5 text-gray-500 shrink-0 mt-0.5' aria-hidden />
                    <div>
                      <dt className='text-xs font-medium text-gray-500 uppercase tracking-wide'>Start</dt>
                      <dd className='text-sm font-semibold text-gray-900 mt-0.5'>
                        {formatDate(sub.startDate)}
                      </dd>
                    </div>
                  </div>
                  <div className='flex gap-3 rounded-lg bg-gray-50 border border-gray-100 p-4'>
                    <Calendar className='w-5 h-5 text-gray-500 shrink-0 mt-0.5' aria-hidden />
                    <div>
                      <dt className='text-xs font-medium text-gray-500 uppercase tracking-wide'>End</dt>
                      <dd className='text-sm font-semibold text-gray-900 mt-0.5'>
                        {formatDate(sub.endDate)}
                      </dd>
                    </div>
                  </div>
                </div>
                {typeof sub.daysRemaining === 'number' && (
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>Days remaining</dt>
                    <dd className='text-lg font-semibold text-gray-900 mt-0.5'>{sub.daysRemaining}</dd>
                  </div>
                )}
                {typeof sub.paidAmount === 'number' && (
                  <div>
                    <dt className='text-sm font-medium text-gray-500'>Paid amount</dt>
                    <dd className='text-lg font-semibold text-gray-900 mt-0.5'>
                      ${sub.paidAmount.toFixed(2)}
                    </dd>
                  </div>
                )}
              </dl>
            ) : (
              <p className='text-gray-700'>Your subscription is active.</p>
            )}

            {hasFullLibrary && (
              <p className='mt-6 text-sm font-medium text-yellow-900 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-3'>
                Full HAWSSA library access is included with your current subscription.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <HeroBanner
        title='Elevate Your Training Career
'
        subtitle='Choose the perfect subscription plan to unlock premium features, expand your client base, and maximize your earning potential as a professional fitness trainer.
'
        benefits={[
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
        ]}
      />
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10'>
        <SubscriptionPlans />
      </div>
    </div>
  );
}

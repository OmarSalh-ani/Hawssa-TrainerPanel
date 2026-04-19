'use client';

import { useSubscriptionStatus } from '@/hooks/subscription';
import { getSubscriptionDaysRemaining, shouldShowExpiryWarningBanner } from '@/lib/utils/subscription-access';
import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SubscriptionExpiryBanner() {
  const { data: apiResponse, isPending } = useSubscriptionStatus();

  if (isPending || !shouldShowExpiryWarningBanner(apiResponse)) return null;

  const days = getSubscriptionDaysRemaining(apiResponse);
  if (days === null) return null;

  const label =
    days === 0
      ? 'Your subscription expires today.'
      : days === 1
        ? 'Your subscription expires in 1 day.'
        : `Your subscription expires in ${days} days.`;

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-[1240px] mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-amber-950">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" aria-hidden />
          <span>{label} Renew soon to keep uninterrupted access.</span>
        </div>
        <Link
          to="/subscription"
          className="font-semibold text-amber-900 underline underline-offset-2 hover:text-amber-700 whitespace-nowrap"
        >
          View plans
        </Link>
      </div>
    </div>
  );
}

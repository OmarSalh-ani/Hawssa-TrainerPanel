'use client';

import { useSubscriptionStatus } from '@/hooks/subscription';
import { hasPendingSubscriptionReview } from '@/lib/utils/subscription-access';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PENDING_REVIEW_PATH = '/pending-review';

export function SubscriptionPageRoute() {
  const location = useLocation();
  const { data: apiResponse, isPending } = useSubscriptionStatus();

  if (isPending) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-500" aria-hidden />
        <p className="text-sm text-gray-600">Checking subscription…</p>
      </div>
    );
  }

  if (hasPendingSubscriptionReview(apiResponse)) {
    return <Navigate to={PENDING_REVIEW_PATH} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

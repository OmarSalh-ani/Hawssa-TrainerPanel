'use client';

import { useSubscriptionStatus } from '@/hooks/subscription';
import {
  hasActiveSubscription,
  hasPendingSubscriptionReview,
} from '@/lib/utils/subscription-access';
import { Loader2 } from 'lucide-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const SUBSCRIPTION_PATH = '/subscription';

export function PendingReviewRoute() {
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

  if (!hasPendingSubscriptionReview(apiResponse)) {
    if (hasActiveSubscription(apiResponse)) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
    return <Navigate to={SUBSCRIPTION_PATH} replace state={{ from: location }} />;
  }

  return <Outlet />;
}

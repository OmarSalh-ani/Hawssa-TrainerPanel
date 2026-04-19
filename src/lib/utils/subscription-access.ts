import type { GetSubscriptionStatusResponse } from '@/lib/types/subscription';
import type { ApiResponse } from '@/lib/utils/api';

function statusData(response: ApiResponse<GetSubscriptionStatusResponse> | undefined) {
  if (!response?.success || !response.data) return null;
  return response.data;
}

/** Verified by admin and not past expiry — full app access. */
export function hasActiveSubscription(
  response: ApiResponse<GetSubscriptionStatusResponse> | undefined,
): boolean {
  const s = statusData(response);
  if (!s) return false;
  return Boolean(s.isVerified && !s.isExpired);
}

/**
 * Submitted subscription awaiting admin verification (API: not verified, not expired, details present).
 */
export function hasPendingSubscriptionReview(
  response: ApiResponse<GetSubscriptionStatusResponse> | undefined,
): boolean {
  const s = statusData(response);
  if (!s) return false;
  return Boolean(!s.isVerified && !s.isExpired && s.subscription != null);
}

/** Show “expires in X days” banner when remaining days are in this window (verified active only). */
export const SUBSCRIPTION_EXPIRY_WARNING_DAYS = 30;

export function getSubscriptionDaysRemaining(
  response: ApiResponse<GetSubscriptionStatusResponse> | undefined,
): number | null {
  const s = statusData(response);
  if (!s?.subscription || typeof s.subscription.daysRemaining !== 'number') return null;
  return s.subscription.daysRemaining;
}

export function shouldShowExpiryWarningBanner(
  response: ApiResponse<GetSubscriptionStatusResponse> | undefined,
): boolean {
  if (!hasActiveSubscription(response)) return false;
  const days = getSubscriptionDaysRemaining(response);
  if (days === null) return false;
  return days >= 0 && days <= SUBSCRIPTION_EXPIRY_WARNING_DAYS;
}

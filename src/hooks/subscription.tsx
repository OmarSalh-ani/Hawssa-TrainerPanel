'use client';

import {
  getPaymentMethods,
  getSubscriptionStatus,
  getSubscriptionTypes,
  subscribeToPlan,
} from '@/lib/apis/subscription/subscription.api';
import { SubscriptionFormData } from '@/lib/types/subscription';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys for React Query
export const subscriptionKeys = {
  all: ['subscriptions'] as const,
  types: () => [...subscriptionKeys.all, 'types'] as const,
  paymentMethods: () => [...subscriptionKeys.all, 'payment-methods'] as const,
  status: () => [...subscriptionKeys.all, 'status'] as const,
};

/**
 * Hook to fetch subscription types
 * @param lang Language code (default: 'en')
 * @returns Query result with subscription types data
 */
export const useSubscriptionTypes = (lang: string = 'en') => {
  return useQuery({
    queryKey: subscriptionKeys.types(),
    queryFn: () => getSubscriptionTypes(lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch payment methods
 * @param lang Language code (default: 'en')
 * @returns Query result with payment methods data
 */
export const usePaymentMethods = (lang: string = 'en') => {
  return useQuery({
    queryKey: subscriptionKeys.paymentMethods(),
    queryFn: () => getPaymentMethods(lang),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

/**
 * Hook to fetch subscription status
 * @param lang Language code (default: 'en')
 * @returns Query result with subscription status data
 */
export const useSubscriptionStatus = (lang: string = 'en') => {
  return useQuery({
    queryKey: subscriptionKeys.status(),
    queryFn: () => getSubscriptionStatus(lang),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to subscribe to a plan
 * @param lang Language code (default: 'en')
 * @returns Mutation for subscribing to a plan
 */
export const useSubscribeToPlan = (lang: string = 'en') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: SubscriptionFormData) => subscribeToPlan(formData, lang),
    onSuccess: () => {
      // Invalidate and refetch subscription status after successful subscription
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.status() });
      queryClient.invalidateQueries({ queryKey: subscriptionKeys.all });
    },
  });
};

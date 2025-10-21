import {
  GetPaymentMethodsResponse,
  GetSubscriptionStatusResponse,
  GetSubscriptionTypesResponse,
  SubscribeResponse,
  SubscriptionFormData,
} from '@/lib/types/subscription';
import { ApiResponse } from '@/lib/utils/api';
import { callAPI } from '@/lib/utils/config';

/**
 * Get subscription types
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetSubscriptionTypesResponse>>
 */
export const getSubscriptionTypes = async (
  lang: string = 'en',
): Promise<ApiResponse<GetSubscriptionTypesResponse>> => {
  const endpoint = `/api/${lang}/subscription/types`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetSubscriptionTypesResponse>;
};

/**
 * Get payment methods
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetPaymentMethodsResponse>>
 */
export const getPaymentMethods = async (
  lang: string = 'en',
): Promise<ApiResponse<GetPaymentMethodsResponse>> => {
  const endpoint = `/api/${lang}/subscription/payment-methods`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetPaymentMethodsResponse>;
};

/**
 * Get subscription status
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<GetSubscriptionStatusResponse>>
 */
export const getSubscriptionStatus = async (
  lang: string = 'en',
): Promise<ApiResponse<GetSubscriptionStatusResponse>> => {
  const endpoint = `/api/${lang}/subscription/status`;
  const response = await callAPI('GET', endpoint);
  return response as ApiResponse<GetSubscriptionStatusResponse>;
};

/**
 * Subscribe to a plan
 * @param formData Subscription form data
 * @param lang Language code (e.g., 'en', 'ar')
 * @returns Promise<ApiResponse<SubscribeResponse>>
 */
export const subscribeToPlan = async (
  formData: SubscriptionFormData,
  lang: string = 'en',
): Promise<ApiResponse<SubscribeResponse>> => {
  const endpoint = `/api/${lang}/subscription/subscribe`;

  // Create FormData for file upload
  const submitData = new FormData();
  submitData.append('subscriptionId', formData.subscriptionId.toString());
  submitData.append('paymentMethodId', formData.paymentMethodId.toString());
  submitData.append('paymentProofImage', formData.paymentProofImage);

  const response = await callAPI('POST', endpoint, submitData, {}, true);
  return response as ApiResponse<SubscribeResponse>;
};

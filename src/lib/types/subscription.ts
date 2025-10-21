// Subscription Types
export interface Subscription {
  id: number;
  title: string;
  description: string;
  image: string | null;
  price: number;
  daysCount: number;
  duration: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
  paymentAddress: string;
}

export interface SubscriptionStatus {
  isExpired: boolean;
  isVerified: boolean;
  subscription: Subscription | null;
}

export interface SubscriptionFormData {
  subscriptionId: number;
  paymentMethodId: number;
  paymentProofImage: File;
}

// API Response Types
export interface GetSubscriptionTypesResponse {
  subscriptions: Subscription[];
}

export interface GetPaymentMethodsResponse {
  paymentMethods: PaymentMethod[];
}

export interface GetSubscriptionStatusResponse {
  isExpired: boolean;
  isVerified: boolean;
  subscription: Subscription | null;
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

// Legacy types for existing components
export interface SubscriptionData {
  hero: {
    title: string;
    subtitle: string;
    benefits: Array<{
      icon: string;
      text: string;
    }>;
  };
  notification: {
    title: string;
    description: string;
    paymentDate: string;
  };
  plans: Array<{
    id: string;
    title: string;
    price: string;
    description: string;
    features: Array<{
      text: string;
      isIncluded: boolean;
    }>;
    buttonText: string;
    buttonColor: string;
    iconColor: string;
    isPopular?: boolean;
  }>;
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: Array<{
    text: string;
    isIncluded: boolean;
  }>;
  buttonText: string;
  buttonColor: string;
  iconColor: string;
  isPopular?: boolean;
}

// API Error Response Type
export interface SubscriptionApiErrorResponse {
  message: string;
  errors: Record<string, string | string[]>;
}

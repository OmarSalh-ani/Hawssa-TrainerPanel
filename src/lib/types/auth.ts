// Login API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

// Forgot Password API Types
export interface ForgotPasswordStep1Request {
  email: string;
}

export interface ForgotPasswordStep1Response {
  message: string;
  otp?: string;
}

export interface ForgotPasswordStep2Request {
  email: string;
  otp: string;
}

export interface ForgotPasswordStep2Response {
  message: string;
}

export interface ForgotPasswordStep3Request {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordStep3Response {
  message: string;
}

// Registration API Response Types
export interface RegistrationStep1Response {
  message: string;
  otp: string;
}

export interface RegistrationStep2Response {
  message: string;
  token: string;
}

// Registration Request Types
export interface RegistrationStep1Request {
  fullName: string;
  mobileNumber: string;
  email: string;
  birthDate: string; // ISO string format
  isMale: boolean;
  password: string;
  confirmPassword: string;
}

export interface RegistrationStep2Request {
  email: string;
  otp: string;
}

// API Error Response Type
export interface ApiErrorResponse {
  message: string;
  token: string;
}

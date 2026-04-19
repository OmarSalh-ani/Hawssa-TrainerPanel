import { getToken } from '@/lib/utils/cookie';
import { handleError } from '@/lib/utils/error-handler';
import axios, { AxiosRequestConfig, Method } from 'axios';

const DEFAULT_API_BASE = 'https://hawssa-trainer-api.alsalhani.com';

export const baseURL =
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.trim()) ||
  DEFAULT_API_BASE;

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: Record<string, string | string[]>;
  /** Present on some error responses (e.g. release access denied). */
  errorPayload?: { code?: string };
}

export const baseAPI = () => {
  const token = getToken();
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ar',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export const baseAPIForm = () => {
  const token = getToken();
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};

export async function callAPI<T>(
  method: Method,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  isForm: boolean = false,
): Promise<ApiResponse<T>> {
  try {
    const api = isForm ? baseAPIForm() : baseAPI();

    const response = await api.request<ApiResponse<T>>({
      method,
      url,
      data,
      ...config,
    });

    return {
      success: response?.data?.success ?? true,
      data: response?.data?.data,
      message: response?.data?.message || 'ok',
      errors: response?.data?.errors || {},
    };
  } catch (error: unknown) {
    const handled = handleError(error);
    return {
      success: false,
      message: handled.message,
      data: undefined as T,
      errors: handled.errors as Record<string, string | string[]>,
      ...(handled.data?.code ? { errorPayload: { code: handled.data.code } } : {}),
    };
  }
}

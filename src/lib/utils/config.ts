import { getToken } from '@/lib/utils/cookie';
import { handleError } from '@/lib/utils/error-handler';
import axios, { AxiosRequestConfig, Method } from 'axios';

// import baseUrl with safe fallback for production
const DEFAULT_API_BASE = 'https://hawssa-trainer-api.alsalhani.com';
export const baseURL =
  (process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NEXT_PUBLIC_API_BASE_URL.trim()) ||
  DEFAULT_API_BASE;

interface ApiResponse<T> {
  success: boolean;
  message: string; // was optional, now always required to match usage
  data: T;
  errors: Record<string, string | string[]>;
}
// server-side axios instance factory (async)
export const baseAPI = async () => {
  const token = await getToken();
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ar',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
// for form data
export const baseAPIForm = async () => {
  const token = await getToken();
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
    const api = isForm ? await baseAPIForm() : await baseAPI();

    const response = await api.request<ApiResponse<T>>({
      method,
      url,
      data,
      ...config,
    });

    return {
      success: response?.data?.success ?? true,
      data: response?.data?.data,
      message: response?.data?.message || 'ok', // always string
      errors: response?.data?.errors || {},
    };
  } catch (error: unknown) {
    return handleError(error) as unknown as ApiResponse<T>;
  }
}

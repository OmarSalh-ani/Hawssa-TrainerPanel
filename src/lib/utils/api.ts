import { baseAPI } from './config';

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message: string;
  errors: unknown;
  /** Set on some failed requests (e.g. locked Hawssa release). */
  errorPayload?: { code?: string };
}

// GET request
export const get = async <T = unknown>(endpoint: string): Promise<T> => {
  const api = baseAPI();
  const response = await api.get(endpoint);
  return response?.data;
};

// POST request
export const post = async <T = unknown>(
  endpoint: string,
  payload: unknown,
): Promise<ApiResponse<T>> => {
  try {
    const api = baseAPI();
    const response = await api.post(endpoint, payload);
    return {
      success: response?.data?.isSuccess ?? true,
      data: response?.data,
      message: response?.data?.message || response?.data?.data?.message || 'OK',
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      data: null as T,
      message: 'An error occurred',
      errors: error,
    };
  }
};

// PUT request
export const put = async <T = unknown>(
  endpoint: string,
  payload: unknown,
): Promise<ApiResponse<T>> => {
  try {
    const api = baseAPI();
    const response = await api.put(endpoint, payload);
    return {
      success: response?.data?.isSuccess ?? true,
      data: response?.data,
      message: response?.data?.message || 'OK',
      errors: {},
    };
  } catch (error) {
    return {
      success: false,
      data: null as T,
      message: 'An error occurred',
      errors: error,
    };
  }
};

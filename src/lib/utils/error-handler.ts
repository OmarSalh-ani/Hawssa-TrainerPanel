import { AxiosError } from 'axios';
import { IActionState } from '../types/error-handler';

export function handleError(error: unknown): IActionState {
  const err = error as AxiosError<{
    message?: string;
    data?: unknown;
    errors?: Record<string, string | string[]>;
  }>;

  // Normalize errors -> لو string حولة لمصفوفة
  const normalizedErrors: Record<string, string[]> = {};
  if (err.response?.data?.errors) {
    for (const key in err.response.data.errors) {
      const value = err.response.data.errors[key];
      normalizedErrors[key] = Array.isArray(value) ? value : [value];
    }
  }

  const payload = err.response?.data?.data as { code?: string } | undefined;
  const data = payload?.code ? { code: payload.code } : undefined;

  return {
    success: false,
    message: err.response?.data?.message || err.message || 'Something went wrong',
    errors: normalizedErrors,
    ...(data ? { data } : {}),
  };
}

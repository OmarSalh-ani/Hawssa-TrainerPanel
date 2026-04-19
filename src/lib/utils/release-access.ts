export const HAWSSA_RELEASE_LOCKED_ERROR_CODE = 'hawssa_release_locked';

export function isHawssaReleaseLockedError(error: unknown): boolean {
  return (
    error instanceof Error &&
    (error as Error & { code?: string }).code === HAWSSA_RELEASE_LOCKED_ERROR_CODE
  );
}

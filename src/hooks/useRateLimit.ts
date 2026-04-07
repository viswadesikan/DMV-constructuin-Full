import { useRef, useCallback } from "react";

/**
 * Simple client-side rate limiter.
 * Allows `maxCalls` within `windowMs` milliseconds.
 */
export function useRateLimit(maxCalls = 3, windowMs = 60_000) {
  const timestamps = useRef<number[]>([]);

  const isAllowed = useCallback(() => {
    const now = Date.now();
    timestamps.current = timestamps.current.filter((t) => now - t < windowMs);
    if (timestamps.current.length >= maxCalls) return false;
    timestamps.current.push(now);
    return true;
  }, [maxCalls, windowMs]);

  const remainingSeconds = useCallback(() => {
    const now = Date.now();
    const oldest = timestamps.current[0];
    if (!oldest) return 0;
    return Math.ceil((windowMs - (now - oldest)) / 1000);
  }, [windowMs]);

  return { isAllowed, remainingSeconds };
}

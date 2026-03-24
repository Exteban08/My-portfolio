import enCommon from '@/locales/en/common.json';

/**
 * Read a dotted path from English locale (used during SSR / pre-hydration)
 * so server HTML matches the first client paint before i18n reads localStorage.
 */
export function getEnNested(key: string): unknown {
  const parts = key.split('.');
  let current: unknown = enCommon;
  for (const part of parts) {
    if (current === null || typeof current !== 'object') return undefined;
    const obj = current as Record<string, unknown>;
    if (!(part in obj)) return undefined;
    current = obj[part];
  }
  return current;
}

export function getEnString(key: string, fallback?: string): string {
  const v = getEnNested(key);
  if (typeof v === 'string') return v;
  return fallback ?? key;
}

export function getEnStringArray(key: string): string[] {
  const v = getEnNested(key);
  if (
    Array.isArray(v) &&
    v.every((item): item is string => typeof item === 'string')
  ) {
    return v;
  }
  return [];
}

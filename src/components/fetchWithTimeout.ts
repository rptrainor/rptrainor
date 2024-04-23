// src/components/fetchWithTimeout.ts
interface FetchOptions extends RequestInit {
  timeout?: number;
}

export const fetchWithTimeout = (resource: string, options: FetchOptions = {}) => {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  return fetch(resource, {
      ...options,
      signal: controller.signal
  }).finally(() => clearTimeout(id));
};

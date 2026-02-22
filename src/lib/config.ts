/**
 * Central API configuration (single source of truth for the URL string).
 * Prefer reading via Redux: useAppSelector(selectApiBaseUrl) or useAppSelector(selectGetApiUrl).
 */
export const API_BASE_URL = "https://api.shahriarbd.com/api/v1";

/**
 * Helper to build full API endpoint URL (for use outside components or with plain baseUrl).
 * Inside React components, prefer: useAppSelector(selectGetApiUrl) then getApiUrl("/path").
 */
export function getApiUrl(path: string, baseUrl = API_BASE_URL): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

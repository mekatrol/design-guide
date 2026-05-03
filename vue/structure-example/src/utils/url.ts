const API_BASE_URL_INPUT_ID = 'api-base-url';
const ROOT_PATH = '/';

export const isAbsoluteHttpUrl = (url: string): boolean => {
  return /^https?:\/\//u.test(url);
};

export const combineUrl = (baseUrl: string, url: string): string => {
  if (!url) {
    return baseUrl || ROOT_PATH;
  }

  if (isAbsoluteHttpUrl(url)) {
    return url;
  }

  if (!baseUrl) {
    return url;
  }

  return `${baseUrl.replace(/\/+$/u, '')}/${url.replace(/^\/+/u, '')}`;
};

export const combinePathWithBaseUrl = (relativeUrl: string): string => {
  return combineUrl(getApiBaseUrl(), relativeUrl);
};

export const ensureRelativeUrl = (url: string): string => {
  try {
    const absoluteUrl = new URL(url, window.location.origin);

    return `${absoluteUrl.pathname}${absoluteUrl.search}${absoluteUrl.hash}`;
  } catch {
    return ROOT_PATH;
  }
};

export const getApiBaseUrl = (): string => {
  const injectedBaseUrl = document.getElementById(API_BASE_URL_INPUT_ID);

  if (injectedBaseUrl instanceof HTMLInputElement && injectedBaseUrl.value) {
    return injectedBaseUrl.value;
  }

  return import.meta.env.VITE_API_BASE_URL || ROOT_PATH;
};

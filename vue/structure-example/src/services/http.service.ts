import { readonly, ref } from 'vue';

import { useAppStore } from '@/stores/app.store';
import type { ApiEnvelope } from '@/types/api.types';

export enum ApiErrorType {
  Undefined = 0,
  ConnectionFailed = 1,
  Timeout = 2,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  NotAllowed = 405,
  NotAcceptable = 406,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504
}

export interface ErrorModel {
  property: string | null;
  errorMessage: string;
}

export interface ApiError {
  errorType: ApiErrorType;
  errors: ErrorModel[];
}

export interface HandleErrorCallback {
  (apiError: ApiError): boolean;
}

export interface HttpRequestConfig {
  baseUrl?: string;
  headers?: HeadersInit;
  timeout?: number;
}

export interface HttpServiceOptions {
  getAccessToken?: () => string | null | undefined;
  getRefreshToken?: () => string | null | undefined;
  refreshToken?: () => Promise<boolean>;
  refreshTokenUrl?: string;
}

interface RequestOptions<TRequest> {
  body?: TRequest;
  errorHandlerCallback?: HandleErrorCallback;
  method: HttpMethod;
  retrying?: boolean;
  url: string;
}

export type HttpMethod = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

export class ApiRequestError extends Error {
  public readonly apiError: ApiError;

  public constructor(apiError: ApiError, method: HttpMethod) {
    super(getDisplayErrorMessage(apiError, method));
    this.name = 'ApiRequestError';
    this.apiError = apiError;
  }
}

export const defaultConfig: Required<Pick<HttpRequestConfig, 'headers' | 'timeout'>> &
  Pick<HttpRequestConfig, 'baseUrl'> = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const mutableServerValidationErrors = ref<ErrorModel[]>([]);
let serviceOptions: HttpServiceOptions = {};

export const serverValidationErrors = readonly(mutableServerValidationErrors);

export const configureHttpService = (options: HttpServiceOptions): void => {
  serviceOptions = {
    ...serviceOptions,
    ...options
  };
};

export const clearServerValidationErrors = (): void => {
  mutableServerValidationErrors.value = [];
};

export const readJson = async <TData>(data: TData): Promise<ApiEnvelope<TData>> => {
  await withBusyState(async () => {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, 120);
    });
  });

  return { data };
};

export const httpGet = async <TResponse>(
  url: string,
  errorHandlerCallback?: HandleErrorCallback,
  retrying?: boolean
): Promise<TResponse> => {
  return await request<undefined, TResponse>({
    errorHandlerCallback,
    method: 'GET',
    retrying,
    url
  });
};

export const httpPost = async <TRequest, TResponse>(
  requestData: TRequest,
  url: string,
  errorHandlerCallback?: HandleErrorCallback,
  retrying?: boolean
): Promise<TResponse> => {
  return await request<TRequest, TResponse>({
    body: requestData,
    errorHandlerCallback,
    method: 'POST',
    retrying,
    url
  });
};

export const httpPut = async <TRequest, TResponse>(
  requestData: TRequest,
  url: string,
  errorHandlerCallback?: HandleErrorCallback,
  retrying?: boolean
): Promise<TResponse> => {
  return await request<TRequest, TResponse>({
    body: requestData,
    errorHandlerCallback,
    method: 'PUT',
    retrying,
    url
  });
};

export const httpPatch = async <TRequest, TResponse>(
  requestData: TRequest,
  url: string,
  errorHandlerCallback?: HandleErrorCallback,
  retrying?: boolean
): Promise<TResponse> => {
  return await request<TRequest, TResponse>({
    body: requestData,
    errorHandlerCallback,
    method: 'PATCH',
    retrying,
    url
  });
};

export const httpDelete = async (
  url: string,
  errorHandlerCallback?: HandleErrorCallback,
  retrying?: boolean
): Promise<boolean> => {
  await request<undefined, unknown>({
    errorHandlerCallback,
    method: 'DELETE',
    retrying,
    url
  });

  return true;
};

const request = async <TRequest, TResponse>({
  body,
  errorHandlerCallback,
  method,
  retrying,
  url
}: RequestOptions<TRequest>): Promise<TResponse> => {
  return await withBusyState(async () => {
    try {
      return await fetchJson<TRequest, TResponse>(url, method, body);
    } catch (error) {
      const apiError = await handleApiError(error, url, method, errorHandlerCallback, !retrying);

      if (
        apiError.errorType === ApiErrorType.Unauthorized &&
        !retrying &&
        serviceOptions.refreshToken
      ) {
        const tokenWasRefreshed = await serviceOptions.refreshToken();

        if (tokenWasRefreshed) {
          return await request<TRequest, TResponse>({
            body,
            errorHandlerCallback,
            method,
            retrying: true,
            url
          });
        }
      }

      throw new ApiRequestError(apiError, method);
    }
  });
};

const fetchJson = async <TRequest, TResponse>(
  url: string,
  method: HttpMethod,
  body?: TRequest
): Promise<TResponse> => {
  const abortController = new AbortController();
  const timeoutId = window.setTimeout(() => {
    abortController.abort();
  }, defaultConfig.timeout);

  try {
    const response = await window.fetch(buildUrl(url), {
      body: body === undefined ? undefined : JSON.stringify(body),
      headers: buildHeaders(url),
      method,
      signal: abortController.signal
    });

    if (!response.ok) {
      throw await toApiError(response);
    }

    if (response.status === 204) {
      return {} as TResponse;
    }

    return (await response.json()) as TResponse;
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }

    throw toNetworkApiError(error, url);
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const handleApiError = async (
  error: unknown,
  _url: string,
  method: HttpMethod,
  errorHandlerCallback?: HandleErrorCallback,
  suppressUnauthorizedError?: boolean
): Promise<ApiError> => {
  const apiError = normalizeApiError(error);

  if (apiError.errorType === ApiErrorType.BadRequest) {
    mutableServerValidationErrors.value = apiError.errors;
  }

  let errorHandled =
    apiError.errorType === ApiErrorType.Unauthorized && suppressUnauthorizedError === true;

  if (!errorHandled && errorHandlerCallback) {
    errorHandled = errorHandlerCallback(apiError);
  }

  if (!errorHandled) {
    displayErrorMessage(apiError, method);
  }

  return apiError;
};

const withBusyState = async <TResult>(callback: () => Promise<TResult>): Promise<TResult> => {
  const appStore = useAppStore();
  appStore.incrementBusy();

  try {
    return await callback();
  } finally {
    appStore.decrementBusy();
  }
};

const buildUrl = (url: string): string => {
  if (!defaultConfig.baseUrl || /^https?:\/\//u.test(url)) {
    return url;
  }

  return `${defaultConfig.baseUrl.replace(/\/$/u, '')}/${url.replace(/^\//u, '')}`;
};

const buildHeaders = (url: string): Headers => {
  const headers = new Headers(defaultConfig.headers);
  const token = getBearerToken(url);

  headers.delete('Authorization');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

const getBearerToken = (url: string): string | null | undefined => {
  if (isRefreshTokenRequest(url)) {
    return serviceOptions.getRefreshToken?.();
  }

  return serviceOptions.getAccessToken?.();
};

const isRefreshTokenRequest = (url: string): boolean => {
  if (!serviceOptions.refreshTokenUrl) {
    return false;
  }

  return (
    url === serviceOptions.refreshTokenUrl ||
    buildUrl(url) === buildUrl(serviceOptions.refreshTokenUrl)
  );
};

const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiRequestError) {
    return error.apiError;
  }

  if (isApiError(error)) {
    return error;
  }

  return {
    errorType: ApiErrorType.Undefined,
    errors: [{ property: null, errorMessage: 'An undefined error occurred.' }]
  };
};

const toApiError = async (response: Response): Promise<ApiError> => {
  const errors = await readResponseErrors(response);

  return {
    errorType: response.status as ApiErrorType,
    errors
  };
};

const toNetworkApiError = (error: unknown, url: string): ApiError => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      errorType: ApiErrorType.Timeout,
      errors: [
        {
          property: null,
          errorMessage: `The server failed to respond within ${defaultConfig.timeout / 1000} seconds.`
        }
      ]
    };
  }

  return {
    errorType: ApiErrorType.ConnectionFailed,
    errors: [
      {
        property: null,
        errorMessage: `Failed to connect to the server at URL '${buildUrl(url)}'.`
      }
    ]
  };
};

const readResponseErrors = async (response: Response): Promise<ErrorModel[]> => {
  try {
    const data = (await response.json()) as unknown;

    if (isErrorModelArray(data)) {
      return data;
    }

    if (hasErrorsArray(data)) {
      return data.errors;
    }

    if (hasErrorMessage(data)) {
      return [{ property: null, errorMessage: data.errorMessage }];
    }

    if (hasMessage(data)) {
      return [{ property: null, errorMessage: data.message }];
    }
  } catch {
    return [{ property: null, errorMessage: response.statusText || 'Request failed.' }];
  }

  return [{ property: null, errorMessage: response.statusText || 'Request failed.' }];
};

const displayErrorMessage = (error: ApiError, method: HttpMethod): void => {
  console.error(getDisplayErrorMessage(error, method));
};

const getDisplayErrorMessage = (error: ApiError, method: HttpMethod): string => {
  const firstErrorMessage = error.errors[0]?.errorMessage ?? 'Unknown error';

  if (error.errorType === ApiErrorType.Conflict) {
    return (
      `${method} failed because the data has been modified by '${firstErrorMessage}' since you started editing. ` +
      'Please reload the page and try again. Reloading will reset any changes that you have made.'
    );
  }

  if (error.errorType === ApiErrorType.NotFound) {
    return `${method} failed because the item no longer exists.`;
  }

  if (error.errorType === ApiErrorType.BadRequest) {
    return `${method} failed with error '${firstErrorMessage}'.`;
  }

  return `${method} failed. The server may be offline. Please try again later. [Error type: ${error.errorType}]`;
};

const isApiError = (value: unknown): value is ApiError => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errorType' in value &&
    'errors' in value &&
    Array.isArray((value as ApiError).errors)
  );
};

const isErrorModelArray = (value: unknown): value is ErrorModel[] => {
  return Array.isArray(value) && value.every(isErrorModel);
};

const isErrorModel = (value: unknown): value is ErrorModel => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errorMessage' in value &&
    typeof (value as ErrorModel).errorMessage === 'string'
  );
};

const hasErrorsArray = (value: unknown): value is { errors: ErrorModel[] } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errors' in value &&
    isErrorModelArray((value as { errors: unknown }).errors)
  );
};

const hasErrorMessage = (value: unknown): value is { errorMessage: string } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'errorMessage' in value &&
    typeof (value as { errorMessage: unknown }).errorMessage === 'string'
  );
};

const hasMessage = (value: unknown): value is { message: string } => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof (value as { message: unknown }).message === 'string'
  );
};

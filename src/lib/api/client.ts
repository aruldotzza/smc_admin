import { API_CONFIG } from "@/config/api";

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  requiresAuth?: boolean;
  idempotencyKey?: string;
}

export class ApiClientError extends Error {
  code: string;
  status: number;
  details?: unknown;
  requestId?: string;

  constructor(message: string, status: number, code: string = "API_ERROR", details?: unknown, requestId?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.requestId = requestId;
  }
}

/**
 * Universal API Request handler for Singapore Maxicabs Admin
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    params,
    requiresAuth = false,
    idempotencyKey,
    headers: customHeaders = {},
    ...customOptions
  } = options;

  // Format query string if params are provided
  let queryString = "";
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) {
      queryString = `?${qs}`;
    }
  }

  // Determine whether to use client-side proxy or direct backend URL
  const isClient = typeof window !== "undefined";
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // Use proxy on browser to eliminate CORS issues; direct URL on server
  const url = isClient
    ? `${API_CONFIG.PROXY_PREFIX}${cleanEndpoint}${queryString}`
    : `${API_CONFIG.BASE_URL}${cleanEndpoint}${queryString}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(customHeaders as Record<string, string>),
  };

  // Set JSON Content-Type for mutation methods if body is present
  if (
    customOptions.body &&
    typeof customOptions.body === "string" &&
    !headers["Content-Type"]
  ) {
    headers["Content-Type"] = "application/json";
  }

  // Admin authentication header
  if (requiresAuth && API_CONFIG.ADMIN_API_KEY) {
    headers["Authorization"] = `Bearer ${API_CONFIG.ADMIN_API_KEY}`;
  }

  // Idempotency key if supplied
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const response = await fetch(url, {
      ...customOptions,
      headers,
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorCode = (data && typeof data === "object" && (data.error || data.code)) || `HTTP_${response.status}`;
      const errorMessage =
        (data && typeof data === "object" && (data.message || data.error)) ||
        `Request failed with status ${response.status}`;
      const requestId = data && typeof data === "object" ? data.requestId : undefined;

      throw new ApiClientError(
        errorMessage,
        response.status,
        errorCode,
        data,
        requestId
      );
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    if (error.name === "AbortError") {
      throw new ApiClientError("Request timed out", 408, "TIMEOUT");
    }
    throw new ApiClientError(
      error?.message || "Network request failed",
      500,
      "NETWORK_ERROR"
    );
  }
}

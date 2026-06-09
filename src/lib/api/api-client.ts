import { logger } from "@/lib/logger";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  maxRetries: number;
}

const DEFAULT_CONFIG: ApiClientConfig = {
  baseUrl: "http://localhost:8000",
  timeout: 10_000,
  maxRetries: 2,
};

let config: ApiClientConfig = { ...DEFAULT_CONFIG };

export function configureApiClient(overrides: Partial<ApiClientConfig>): void {
  config = { ...config, ...overrides };
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  retries = config.maxRetries,
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(
        url,
        { ...options, headers },
        config.timeout,
      );

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new ApiError(
          body || response.statusText,
          response.status,
          response.statusText,
        );
      }

      return (await response.json()) as T;
    } catch (err) {
      if (attempt < retries) {
        logger.warn(`[API] Retry ${attempt + 1}/${retries} for GET ${path}`, {
          error: String(err),
        });
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      if (err instanceof ApiError) throw err;
      throw new ApiError(
        err instanceof Error ? err.message : String(err),
        0,
        "NetworkError",
      );
    }
  }

  throw new ApiError("Unreachable", 0, "InternalError");
}

export const api = {
  get<T>(path: string): Promise<T> {
    return request<T>(path, { method: "GET" });
  },

  post<T>(path: string, body?: unknown): Promise<T> {
    return request<T>(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },
};

import { api } from "./api-client";

interface HealthResponse {
  status: "ok" | "degraded" | "error";
  uptime_secs: number;
  version: string;
}

export function fetchHealth(): Promise<HealthResponse> {
  return api.get<HealthResponse>("/api/v1/health");
}

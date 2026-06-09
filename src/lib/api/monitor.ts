import { api } from "./api-client";
import type { PipelineHealth } from "@/types/monitor";

export function fetchMonitorHealth(): Promise<PipelineHealth> {
  return api.get<PipelineHealth>("/api/v1/monitor/health");
}

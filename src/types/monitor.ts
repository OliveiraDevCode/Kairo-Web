export interface PipelineHealth {
  status: "HEALTHY" | "DEGRADED" | "BLOCKED";
  detail: string;
  uptime_secs: number;
  is_running: boolean;
}

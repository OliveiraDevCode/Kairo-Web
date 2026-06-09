export type ViewMode = "platform" | "workspace";

export interface PlatformMetrics {
  activeWorkspaces: number;
  totalDatasets: number;
  liveSources: number;
  eventsToday: number;
}

export interface ActivityEntry {
  timestamp: string;
  workspaceName: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

export type WorkspaceStatus = "idle" | "running" | "error";

export interface Workspace {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: WorkspaceStatus;
  createdAt: string;
  uptime: string;
  sourceCount: number;
  eventCount: number;
}

export interface WorkspaceMetrics {
  status: WorkspaceStatus;
  uptime: string;
  connectedSources: number;
  knowledgeEntries: number;
}

export interface WorkspaceSource {
  id: string;
  name: string;
  type: string;
  status: "active" | "idle" | "error";
  events: number;
}

export interface WorkspaceActivityEntry {
  timestamp: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
}

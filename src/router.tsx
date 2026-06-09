import { createBrowserRouter, Navigate } from "react-router-dom";
import { PlatformLayout } from "@/core/layout/platform-layout";
import { WorkspaceLayout } from "@/core/layout/workspace-layout";

import DashboardPage from "@/features/platform/dashboard/dashboard-page";
import WorkspacesPage from "@/features/platform/workspaces/workspaces-page";
import LearningLabPage from "@/features/platform/learning-lab/learning-lab-page";
import KnowledgePage from "@/features/platform/knowledge/knowledge-page";
import SettingsPage from "@/features/platform/settings/settings-page";

import WorkspaceDashboardPage from "@/features/workspace/dashboard/workspace-dashboard-page";
import WorkspaceActivityPage from "@/features/workspace/activity/workspace-activity-page";
import WorkspaceKnowledgePage from "@/features/workspace/knowledge/workspace-knowledge-page";
import WorkspaceLearningPage from "@/features/workspace/learning/workspace-learning-page";
import WorkspaceSourcesPage from "@/features/workspace/sources/workspace-sources-page";
import WorkspaceSettingsPage from "@/features/workspace/settings/workspace-settings-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PlatformLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "workspaces", element: <WorkspacesPage /> },
      { path: "learning-lab", element: <LearningLabPage /> },
      { path: "knowledge", element: <KnowledgePage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/workspaces/:id",
    element: <WorkspaceLayout />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <WorkspaceDashboardPage /> },
      { path: "activity", element: <WorkspaceActivityPage /> },
      { path: "knowledge", element: <WorkspaceKnowledgePage /> },
      { path: "learning", element: <WorkspaceLearningPage /> },
      { path: "sources", element: <WorkspaceSourcesPage /> },
      { path: "settings", element: <WorkspaceSettingsPage /> },
    ],
  },
]);

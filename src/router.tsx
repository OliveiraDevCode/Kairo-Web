import { createBrowserRouter } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import DashboardPage from "@/pages/DashboardPage";
import LiveTableStudioPage from "@/pages/LiveTableStudioPage";
import LearningPage from "@/pages/LearningPage";
import MonitorPage from "@/pages/MonitorPage";
import SettingsPage from "@/pages/SettingsPage";

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <DashboardPage /> },
      { path: "/studio", element: <LiveTableStudioPage /> },
      { path: "/tables", element: <LiveTableStudioPage /> },
      { path: "/learning", element: <LearningPage /> },
      { path: "/monitor", element: <MonitorPage /> },
      { path: "/settings", element: <SettingsPage /> },
    ],
  },
]);

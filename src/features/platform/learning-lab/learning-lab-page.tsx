import { useState } from "react";
import { PageHeader } from "@/core/ui/page-header";
import { MetricCard } from "@/core/ui/metric-card";
import { EmptyState } from "@/core/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import {
  FlaskConical,
  Database,
  Cpu,
  TrendingUp,
  Layers,
  Plus,
  FlaskRound,
} from "lucide-react";

type LabTab = "overview" | "datasets" | "models" | "training";

const TABS: { id: LabTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "datasets", label: "Datasets" },
  { id: "models", label: "Models" },
  { id: "training", label: "Training" },
];

const MOCK_DATASETS = [
  { name: "card-data-v3", workspace: "Research Lab", size: "12,450", samples: 12450, status: "active" as const, version: 3 },
  { name: "pattern-data-v1", workspace: "Research Lab", size: "3,200", samples: 3200, status: "active" as const, version: 1 },
  { name: "automation-logs", workspace: "Automation Hub", size: "890", samples: 890, status: "draft" as const, version: 2 },
];

const MOCK_MODELS = [
  { name: "detector-v4", workspace: "Research Lab", accuracy: 93.2, status: "deployed" as const, version: 4 },
  { name: "detector-v3", workspace: "Research Lab", accuracy: 91.5, status: "archived" as const, version: 3 },
  { name: "detector-v2", workspace: "Research Lab", accuracy: 88.1, status: "archived" as const, version: 2 },
];

export default function LearningLabPage() {
  const [activeTab, setActiveTab] = useState<LabTab>("overview");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Lab"
        description="Cross-workspace ML: datasets, models, and training"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Datasets"
          value="12"
          trend="Across all workspaces"
          trendDirection="neutral"
          icon={<Database className="size-5" />}
        />
        <MetricCard
          label="Active Training"
          value="2"
          trend="Currently running"
          trendDirection="up"
          icon={<Cpu className="size-5" />}
        />
        <MetricCard
          label="Models Deployed"
          value="8"
          trend="93.2% best accuracy"
          trendDirection="up"
          icon={<FlaskConical className="size-5" />}
        />
        <MetricCard
          label="Success Rate"
          value="94%"
          trend="Last 30 days"
          trendDirection="up"
          icon={<TrendingUp className="size-5" />}
        />
      </div>

      <div className="flex gap-1 rounded-lg border border-border bg-card p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Datasets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_DATASETS.map((ds) => (
                <div key={ds.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{ds.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {ds.workspace} · {ds.size} samples
                    </p>
                  </div>
                  <Badge variant={ds.status === "active" ? "success" : "secondary"}>
                    v{ds.version}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Models</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_MODELS.map((m) => (
                <div key={m.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.workspace} · {m.accuracy}% accuracy
                    </p>
                  </div>
                  <Badge variant={m.status === "deployed" ? "success" : "secondary"}>
                    {m.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "datasets" && (
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                All datasets across all workspaces
              </p>
              <Button variant="outline" size="sm" disabled>
                <Plus className="size-4" />
                New Dataset
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Workspace</th>
                    <th className="pb-3 font-medium">Samples</th>
                    <th className="pb-3 font-medium">Version</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_DATASETS.map((ds) => (
                    <tr key={ds.name} className="border-b border-border last:border-0">
                      <td className="py-3 font-medium">{ds.name}</td>
                      <td className="py-3 text-muted-foreground">{ds.workspace}</td>
                      <td className="py-3">{ds.samples.toLocaleString()}</td>
                      <td className="py-3">v{ds.version}</td>
                      <td className="py-3">
                        <Badge variant={ds.status === "active" ? "success" : "secondary"}>
                          {ds.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "models" && (
        <Card>
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Model registry across all workspaces
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Workspace</th>
                    <th className="pb-3 font-medium">Accuracy</th>
                    <th className="pb-3 font-medium">Version</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_MODELS.map((m) => (
                    <tr key={m.name} className="border-b border-border last:border-0">
                      <td className="py-3 font-medium">{m.name}</td>
                      <td className="py-3 text-muted-foreground">{m.workspace}</td>
                      <td className="py-3">{m.accuracy}%</td>
                      <td className="py-3">v{m.version}</td>
                      <td className="py-3">
                        <Badge variant={m.status === "deployed" ? "success" : "secondary"}>
                          {m.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "training" && (
        <EmptyState
          icon={<FlaskRound className="size-12" />}
          title="No active training jobs"
          description="Start a training job from a workspace's Learning section to see it here."
        />
      )}
    </div>
  );
}

import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { MetricCard } from "@/core/ui/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { SectionHeader } from "@/core/ui/section-header";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import {
  FlaskConical,
  Database,
  Cpu,
  TrendingUp,
  Play,
  StopCircle,
  Clock,
} from "lucide-react";

type LearningTab = "datasets" | "models" | "training";

const TABS: { id: LearningTab; label: string }[] = [
  { id: "datasets", label: "Datasets" },
  { id: "models", label: "Models" },
  { id: "training", label: "Training" },
];

export default function WorkspaceLearningPage() {
  const { id } = useParams<{ id: string }>();
  const { workspaces } = useWorkspaceStore();
  const workspace = workspaces.find((w) => w.id === id);
  const [activeTab, setActiveTab] = useState<LearningTab>("datasets");

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning"
        description={`ML training and model management for ${workspace.name}`}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Datasets"
          value="3"
          trend="2 active, 1 draft"
          trendDirection="neutral"
          icon={<Database className="size-5" />}
        />
        <MetricCard
          label="Models"
          value="4"
          trend="v4 deployed"
          trendDirection="up"
          icon={<FlaskConical className="size-5" />}
        />
        <MetricCard
          label="Best Accuracy"
          value="93.2%"
          trend="Model v4"
          trendDirection="up"
          icon={<TrendingUp className="size-5" />}
        />
        <MetricCard
          label="Training Jobs"
          value="12"
          trend="100% success rate"
          trendDirection="up"
          icon={<Cpu className="size-5" />}
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

      {activeTab === "datasets" && (
        <div className="space-y-4">
          <SectionHeader
            title="Available Datasets"
            action={
              <Button variant="outline" size="sm" disabled>
                New Dataset
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">training-data-v3</p>
                    <p className="text-xs text-muted-foreground">12,450 samples</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>87% coverage</span>
                  <span>v3</span>
                  <span>Updated 2h ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">validation-set-v2</p>
                    <p className="text-xs text-muted-foreground">3,200 samples</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>92% coverage</span>
                  <span>v2</span>
                  <span>Updated 1d ago</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium">test-data-v1</p>
                    <p className="text-xs text-muted-foreground">890 samples</p>
                  </div>
                  <Badge variant="secondary">Draft</Badge>
                </div>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>45% coverage</span>
                  <span>v1</span>
                  <span>Updated 3d ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "models" && (
        <div className="space-y-4">
          <SectionHeader
            title="Model Registry"
            description="Version history and performance"
          />
          <Card>
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs text-muted-foreground uppercase tracking-wider">
                      <th className="pb-3 font-medium">Version</th>
                      <th className="pb-3 font-medium">Accuracy</th>
                      <th className="pb-3 font-medium">Deployed</th>
                      <th className="pb-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { v: "v4", acc: "93.2%", deployed: true, date: "Today" },
                      { v: "v3", acc: "91.5%", deployed: false, date: "Yesterday" },
                      { v: "v2", acc: "88.1%", deployed: false, date: "3d ago" },
                      { v: "v1", acc: "84.0%", deployed: false, date: "1w ago" },
                    ].map((m) => (
                      <tr key={m.v} className="border-b border-border last:border-0">
                        <td className="py-3 font-medium">{m.v}</td>
                        <td className="py-3">{m.acc}</td>
                        <td className="py-3">
                          {m.deployed ? (
                            <Badge variant="success">Deployed</Badge>
                          ) : (
                            <Badge variant="secondary">Archived</Badge>
                          )}
                        </td>
                        <td className="py-3 text-muted-foreground">{m.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "training" && (
        <div className="space-y-4">
          <SectionHeader
            title="Training Jobs"
            action={
              <Button size="sm" disabled>
                <Play className="size-4" />
                Start Training
              </Button>
            }
          />
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                {[
                  { name: "Model v4 training", status: "completed" as const, duration: "12m 30s", accuracy: "93.2%", date: "Today" },
                  { name: "Model v3 training", status: "completed" as const, duration: "15m 20s", accuracy: "91.5%", date: "Yesterday" },
                  { name: "Model v2 training", status: "completed" as const, duration: "14m 00s", accuracy: "88.1%", date: "3d ago" },
                ].map((job, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex items-center gap-3">
                      {job.status === "completed" ? (
                        <div className="size-2 rounded-full bg-success" />
                      ) : job.status === "running" ? (
                        <div className="size-2 rounded-full bg-warning animate-pulse" />
                      ) : (
                        <div className="size-2 rounded-full bg-muted-foreground/40" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{job.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {job.duration} · {job.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{job.accuracy}</span>
                      <Badge
                        variant={job.status === "completed" ? "success" : "secondary"}
                      >
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

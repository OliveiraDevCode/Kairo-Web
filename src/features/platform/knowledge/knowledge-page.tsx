import { useState } from "react";
import { PageHeader } from "@/core/ui/page-header";
import { MetricCard } from "@/core/ui/metric-card";
import { EmptyState } from "@/core/ui/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import {
  Brain,
  Search,
  BookOpen,
  FileText,
  Layers,
  Network,
  Import,
} from "lucide-react";

type KnowledgeTab = "browse" | "graph" | "search";

const TABS: { id: KnowledgeTab; label: string }[] = [
  { id: "browse", label: "Browse" },
  { id: "search", label: "Search" },
  { id: "graph", label: "Graph" },
];

const MOCK_ENTRIES = [
  {
    type: "fact" as const,
    workspace: "Research Lab",
    content: "Detection threshold minimum: 0.75",
    tags: ["config", "threshold"],
    date: "2026-06-08",
  },
  {
    type: "observation" as const,
    workspace: "My Workspace",
    content: "Pattern X detected with confidence 0.94",
    tags: ["detection", "pattern-x"],
    date: "2026-06-09",
  },
  {
    type: "metric" as const,
    workspace: "Research Lab",
    content: "Model accuracy: 93.2%",
    tags: ["model", "accuracy"],
    date: "2026-06-09",
  },
  {
    type: "pattern" as const,
    workspace: "Automation Hub",
    content: "When event A follows event B, action C has 87% success rate",
    tags: ["automation", "pattern"],
    date: "2026-06-07",
  },
];

const TYPE_COLORS: Record<string, "default" | "secondary" | "success" | "warning"> = {
  fact: "default",
  observation: "secondary",
  metric: "success",
  pattern: "warning",
};

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<KnowledgeTab>("browse");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Knowledge"
        description="Cross-workspace knowledge base"
        action={
          <Button variant="outline" size="sm" disabled>
            <Import className="size-4" />
            Import
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Entries"
          value="1,240"
          trend="Across all workspaces"
          trendDirection="neutral"
          icon={<BookOpen className="size-5" />}
        />
        <MetricCard
          label="Facts"
          value="23"
          trend="Immutable truths"
          trendDirection="neutral"
          icon={<FileText className="size-5" />}
        />
        <MetricCard
          label="Observations"
          value="1,180"
          trend="Recorded events"
          trendDirection="up"
          icon={<Brain className="size-5" />}
        />
        <MetricCard
          label="Patterns"
          value="15"
          trend="Recurring structures"
          trendDirection="up"
          icon={<Network className="size-5" />}
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

      {activeTab === "browse" && (
        <Card>
          <CardContent className="p-5">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search knowledge..."
                  className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <div className="space-y-2">
              {MOCK_ENTRIES.map((entry, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <Badge variant={TYPE_COLORS[entry.type]} className="shrink-0 mt-0.5">
                    {entry.type}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{entry.content}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {entry.workspace}
                      </span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">
                        {entry.date}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "search" && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all workspaces..."
              className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          {!searchQuery && (
            <EmptyState
              icon={<Search className="size-12" />}
              title="Search knowledge"
              description="Enter a query to search across all workspaces' knowledge bases."
            />
          )}
          {searchQuery && (
            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  Search results for "{searchQuery}"
                </p>
                <div className="mt-3 space-y-2">
                  {MOCK_ENTRIES.filter(
                    (e) =>
                      e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      e.tags.some((t) =>
                        t.toLowerCase().includes(searchQuery.toLowerCase()),
                      ),
                  ).map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <Badge variant={TYPE_COLORS[entry.type]} className="shrink-0">
                        {entry.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{entry.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.workspace} · {entry.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "graph" && (
        <EmptyState
          icon={<Network className="size-12" />}
          title="Knowledge graph"
          description="Visualize relationships between knowledge entries. Add more knowledge to populate the graph."
        />
      )}
    </div>
  );
}

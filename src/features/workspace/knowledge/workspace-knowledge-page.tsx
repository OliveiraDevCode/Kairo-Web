import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from "@/core/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { Badge } from "@/core/ui/badge";
import { Button } from "@/core/ui/button";
import { EmptyState } from "@/core/ui/empty-state";
import { SectionHeader } from "@/core/ui/section-header";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { BookOpen, Plus, Search, FileText } from "lucide-react";

type EntryType = "fact" | "observation" | "metric" | "pattern";

interface KnowledgeEntry {
  type: EntryType;
  content: string;
  tags: string[];
  date: string;
}

const MOCK_ENTRIES: Record<string, KnowledgeEntry[]> = {
  facts: [
    { type: "fact", content: "Detection threshold minimum: 0.75", tags: ["config", "threshold"], date: "2026-06-08" },
    { type: "fact", content: "Max retries before alert: 3", tags: ["config", "retries"], date: "2026-06-07" },
  ],
  observations: [
    { type: "observation", content: "Pattern X detected with confidence 0.94", tags: ["detection", "pattern-x"], date: "2026-06-09" },
    { type: "observation", content: "Sample processed — labeled as class A", tags: ["sample", "labeling"], date: "2026-06-09" },
    { type: "observation", content: "Anomaly detected at 14:30:05", tags: ["anomaly"], date: "2026-06-09" },
  ],
  metrics: [
    { type: "metric", content: "Model accuracy: 93.2%", tags: ["model", "accuracy"], date: "2026-06-09" },
    { type: "metric", content: "Average latency: 340ms", tags: ["performance", "latency"], date: "2026-06-09" },
  ],
  patterns: [
    { type: "pattern", content: "When event A follows event B, action C has 87% success rate", tags: ["automation", "pattern"], date: "2026-06-07" },
  ],
};

const TYPE_COLORS: Record<string, "default" | "secondary" | "success" | "warning"> = {
  fact: "default",
  observation: "secondary",
  metric: "success",
  pattern: "warning",
};

export default function WorkspaceKnowledgePage() {
  const { id } = useParams<{ id: string }>();
  const { workspaces } = useWorkspaceStore();
  const workspace = workspaces.find((w) => w.id === id);
  const [searchQuery, setSearchQuery] = useState("");

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
        title="Knowledge"
        description={`Workspace knowledge base for ${workspace.name}`}
        action={
          <Button variant="outline" size="sm" disabled>
            <Plus className="size-4" />
            Add Knowledge
          </Button>
        }
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search workspace knowledge..."
          className="w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {!searchQuery && (
        <div className="space-y-6">
          {(Object.entries(MOCK_ENTRIES) as [string, KnowledgeEntry[]][]).map(
            ([category, entries]) => (
              <div key={category}>
                <SectionHeader
                  title={category}
                  description={`${entries.length} entries`}
                  className="mb-3"
                />
                <div className="space-y-2">
                  {entries.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-border p-3"
                    >
                      <Badge
                        variant={TYPE_COLORS[entry.type]}
                        className="shrink-0 mt-0.5"
                      >
                        {entry.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{entry.content}</p>
                        <span className="text-xs text-muted-foreground">
                          {entry.date}
                        </span>
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
              </div>
            ),
          )}
        </div>
      )}

      {searchQuery && (
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Search results for "{searchQuery}"
            </p>
            <div className="mt-3 space-y-2">
              {Object.values(MOCK_ENTRIES)
                .flat()
                .filter(
                  (e) =>
                    e.content
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    e.tags.some((t) =>
                      t.toLowerCase().includes(searchQuery.toLowerCase()),
                    ),
                )
                .map((entry, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border p-3"
                  >
                    <Badge variant={TYPE_COLORS[entry.type]} className="shrink-0">
                      {entry.type}
                    </Badge>
                    <span className="text-sm">{entry.content}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

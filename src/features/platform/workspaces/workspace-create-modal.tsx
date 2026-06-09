import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/core/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/core/ui/card";
import { useWorkspaceStore } from "@/core/stores/workspace-store";
import { usePlatformStore } from "@/core/stores/platform-store";
import { X } from "lucide-react";
import type { WorkspaceStatus } from "@/core/types/workspace";

interface WorkspaceCreateModalProps {
  onClose: () => void;
}

const TEMPLATES = [
  { id: "blank", name: "Blank", description: "Start from scratch", icon: "📂" },
  { id: "research", name: "Research", description: "Experiments and model training", icon: "🔬" },
  { id: "automation", name: "Automation", description: "Scheduled tasks and pipelines", icon: "🤖" },
];

export function WorkspaceCreateModal({ onClose }: WorkspaceCreateModalProps) {
  const { addWorkspace } = useWorkspaceStore();
  const { setViewMode } = usePlatformStore();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [template, setTemplate] = useState("blank");
  const [icon, setIcon] = useState("📂");

  const handleCreate = () => {
    const id = `ws-${Date.now()}`;
    const wsName = name.trim() || "Untitled Workspace";
    const selectedTemplate = TEMPLATES.find((t) => t.id === template);

    addWorkspace({
      id,
      name: wsName,
      description: description || (selectedTemplate?.description ?? ""),
      icon: selectedTemplate?.icon ?? icon,
      status: "idle" as WorkspaceStatus,
      createdAt: new Date().toISOString().slice(0, 10),
      uptime: "0m",
      sourceCount: 0,
      eventCount: 0,
    });

    setViewMode("workspace");
    navigate(`/workspaces/${id}/dashboard`);
    onClose();
  };

  const handleTemplateSelect = (tId: string) => {
    const t = TEMPLATES.find((t) => t.id === tId);
    setTemplate(tId);
    if (t) setIcon(t.icon);
    if (!name.trim()) {
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Create Workspace</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Workspace"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description (optional)</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What is this workspace for?"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Template</label>
            <div className="grid grid-cols-3 gap-2">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleTemplateSelect(t.id)}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-center transition-colors ${
                    template === t.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:bg-accent"
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span className="text-xs font-medium">{t.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {t.description}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useLearningStore } from "@/stores/learning-store";
import { useConnectionStore } from "@/stores/connection-store";
import { StatusCard } from "@/components/shared/StatusCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { PageSection } from "@/components/shared/PageSection";
import { ConnectionBadge } from "@/components/shared/ConnectionBadge";
import { Brain, FlaskConical, Cpu, Database, Activity, Clock, CheckCircle } from "lucide-react";

export default function LearningPage() {
  const stats = useLearningStore((s) => s.stats);
  const backendStatus = useConnectionStore((s) => s.backendStatus);

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning</h1>
          <p className="text-sm text-muted-foreground">Training status and model management</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Backend:</span>
          <ConnectionBadge state={backendStatus} />
        </div>
        {backendStatus === "online" && (
          <p className="text-sm text-muted-foreground">Loading learning stats...</p>
        )}
        {backendStatus !== "online" && (
          <p className="text-sm text-muted-foreground">Connect to backend to view learning stats.</p>
        )}
      </div>
    );
  }

  const s = stats.session;
  const l = stats.lifetime;
  const t = stats.training;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning</h1>
        <p className="text-sm text-muted-foreground">Training status and model management</p>
      </div>

      {/* Dataset Overview */}
      <PageSection title="Dataset Overview" description="Card coverage and sample statistics">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Total Samples"
            value={l.samples.toLocaleString()}
            trend={`${l.samples_today} today`}
            trendDirection={l.samples_today > 0 ? "up" : "neutral"}
          />
          <MetricCard
            label="Coverage"
            value={`${s.coverage}/52`}
            trend={`${s.coverage_pct}%`}
            trendDirection={s.coverage >= 39 ? "up" : s.coverage >= 13 ? "neutral" : "down"}
          />
          <MetricCard
            label="Accuracy"
            value={`${l.accuracy}%`}
            trend={`Lifetime: ${l.samples} samples`}
            trendDirection={l.accuracy >= 80 ? "up" : l.accuracy >= 50 ? "neutral" : "down"}
          />
          <MetricCard
            label="Session Samples"
            value={s.samples}
            trend={`${s.hands} hands · ${s.captures} captures`}
            trendDirection={s.samples > 0 ? "up" : "neutral"}
          />
        </div>
      </PageSection>

      {/* Training Status */}
      <PageSection title="Training Status" description="Model training and pipeline health">
        <div className="grid gap-4 md:grid-cols-4">
          <StatusCard
            title="Training"
            value={t.training_enabled ? "Enabled" : "Disabled"}
            variant={t.training_enabled ? "success" : "default"}
            icon={<Brain className="size-4" />}
            subtitle={t.model_exists ? `Model v${t.model_version}` : "No model trained"}
          />
          <StatusCard
            title="Active Model"
            value={t.model_exists ? `v${t.model_version}` : "None"}
            icon={<Database className="size-4" />}
            subtitle={t.model_path}
          />
          <StatusCard
            title="Last Training"
            value={t.last_train_time || "Never"}
            icon={<Clock className="size-4" />}
            subtitle={t.model_exists ? `${t.labeled_since_training} samples since` : "No training history"}
          />
          <StatusCard
            title="Pipeline Health"
            value={stats.health.status}
            variant={
              stats.health.status === "HEALTHY" ? "success" :
              stats.health.status === "DEGRADED" ? "warning" :
              "error"
            }
            icon={<Activity className="size-4" />}
            subtitle={stats.health.detail}
          />
        </div>
      </PageSection>

      {/* Dataset Details */}
      <PageSection title="Dataset Details" description="Lifetime and session breakdown">
        <div className="grid gap-4 md:grid-cols-4">
          <StatusCard
            title="Lifetime Hands"
            value={l.hands.toLocaleString()}
            icon={<FlaskConical className="size-4" />}
            subtitle={`${s.hands} this session`}
          />
          <StatusCard
            title="Lifetime Captures"
            value={l.captures.toLocaleString()}
            icon={<Cpu className="size-4" />}
            subtitle={`${s.captures} this session`}
          />
          <StatusCard
            title="Auto-Train"
            value={t.auto_train_every > 0 ? `Every ${t.auto_train_every}` : "Manual"}
            icon={<CheckCircle className="size-4" />}
            subtitle={t.remaining_for_train > 0 ? `${t.remaining_for_train} until next` : "Ready to train"}
          />
          <StatusCard
            title="Bottleneck"
            value={stats.bottleneck || "None"}
            icon={<Activity className="size-4" />}
            variant={stats.bottleneck ? "warning" : "default"}
          />
        </div>
      </PageSection>

      {/* Backend status */}
      <div className="flex items-center gap-3 text-sm">
        <span className="text-muted-foreground">Backend:</span>
        <ConnectionBadge state={backendStatus} />
      </div>
    </div>
  );
}
export interface LearningStats {
  session: {
    hands: number;
    captures: number;
    samples: number;
    coverage: number;
    coverage_pct: number;
  };
  lifetime: {
    hands: number;
    captures: number;
    samples: number;
    coverage: number;
    coverage_pct: number;
    accuracy: number;
    samples_today: number;
  };
  training: {
    model_path: string;
    model_exists: boolean;
    training_enabled: boolean;
    auto_train_every: number;
    labeled_since_training: number;
    remaining_for_train: number;
    last_train_time: string;
    model_version: number;
  };
  health: {
    status: "HEALTHY" | "DEGRADED" | "BLOCKED";
    detail: string;
  };
  bottleneck: string | null;
  activity_feed: string[];
}

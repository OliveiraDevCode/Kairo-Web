import { api } from "./api-client";
import type { LearningStats } from "@/types/learning";

export function fetchLearningStats(): Promise<LearningStats> {
  return api.get<LearningStats>("/api/v1/learning/stats");
}

import { isDemoMode } from "@/lib/demo-mode";
import {
  generateMockLessonPlan,
  simulateDemoLatency,
} from "@/lib/mock/generate-mock-lesson-plan";
import type {
  GenerateLessonPlanResult,
  LessonFormValues,
} from "@/types/lesson";

export { isDemoMode };

/**
 * Implementação usada no GitHub Pages (static export).
 * Não importa Server Actions — requisito do `output: 'export'`.
 */
export async function requestLessonPlan(
  values: LessonFormValues,
): Promise<GenerateLessonPlanResult> {
  await simulateDemoLatency();
  return { success: true, plan: generateMockLessonPlan(values) };
}

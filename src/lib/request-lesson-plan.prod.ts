import { isDemoMode } from "@/lib/demo-mode";
import type {
  GenerateLessonPlanResult,
  LessonFormValues,
} from "@/types/lesson";

export { isDemoMode };

/**
 * Implementação com Server Action + LLM (Vercel / Node).
 */
export async function requestLessonPlan(
  values: LessonFormValues,
): Promise<GenerateLessonPlanResult> {
  if (isDemoMode) {
    const { generateMockLessonPlan, simulateDemoLatency } = await import(
      "@/lib/mock/generate-mock-lesson-plan"
    );
    await simulateDemoLatency();
    return { success: true, plan: generateMockLessonPlan(values) };
  }

  const { generateLessonPlan } = await import("@/actions/generate-lesson-plan");
  return generateLessonPlan(values);
}

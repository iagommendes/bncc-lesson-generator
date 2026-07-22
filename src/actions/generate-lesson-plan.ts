"use server";

import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

import { lessonFormSchema, lessonPlanSchema } from "@/lib/ai/schema";
import {
  buildLessonPlannerSystemPrompt,
  buildLessonPlannerUserPrompt,
} from "@/lib/ai/system-prompt";
import type { LessonFormValues, LessonPlan } from "@/types/lesson";

export type GenerateLessonPlanResult =
  | { success: true; plan: LessonPlan }
  | { success: false; error: string };

/**
 * Server Action: ponto único de integração com o LLM.
 * A UI só envia os valores do formulário; o prompt complexo fica no servidor.
 */
export async function generateLessonPlan(
  rawInput: LessonFormValues,
): Promise<GenerateLessonPlanResult> {
  const parsed = lessonFormSchema.safeParse(rawInput);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Dados do formulário inválidos.",
    };
  }

  if (!process.env.OPENAI_API_KEY) {
    return {
      success: false,
      error:
        "OPENAI_API_KEY não configurada. Copie .env.example para .env.local e adicione sua chave.",
    };
  }

  try {
    const { object } = await generateObject({
      model: openai(process.env.OPENAI_MODEL ?? "gpt-4o-mini"),
      schema: lessonPlanSchema,
      schemaName: "LessonPlan",
      schemaDescription:
        "Plano de aula completo alinhado à BNCC, pronto para impressão.",
      system: buildLessonPlannerSystemPrompt(),
      prompt: buildLessonPlannerUserPrompt(parsed.data),
      temperature: 0.4,
    });

    return { success: true, plan: object };
  } catch (error) {
    console.error("[generateLessonPlan]", error);
    return {
      success: false,
      error:
        "Não foi possível gerar o plano de aula agora. Verifique a chave da API e tente novamente.",
    };
  }
}

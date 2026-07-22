import { z } from "zod";

/**
 * Schema Zod do plano de aula estruturado.
 * Usado pelo Vercel AI SDK (`generateObject`) para forçar retorno tipado
 * e também para documentar o contrato esperado pelos contribuidores.
 */
export const lessonPlanSchema = z.object({
  title: z.string().describe("Título claro e atrativo do plano de aula"),
  summary: z
    .string()
    .describe("Resumo em 2–3 frases do objetivo e percurso da aula"),
  bnccCompetences: z
    .array(
      z.object({
        code: z
          .string()
          .describe("Código BNCC quando conhecido (ex.: EF06MA03) ou 'N/A'"),
        description: z
          .string()
          .describe("Descrição da competência/habilidade alinhada à BNCC"),
      }),
    )
    .min(1)
    .max(5),
  methodology: z.object({
    name: z.string().describe("Nome da abordagem metodológica sugerida"),
    description: z
      .string()
      .describe("Explicação breve de como a metodologia se aplica à aula"),
    interactiveDynamics: z
      .string()
      .describe(
        "Sugestão concreta de dinâmica visual/interativa (jogo, estação, debate, etc.)",
      ),
  }),
  steps: z
    .array(
      z.object({
        title: z.string(),
        durationMinutes: z.number().int().positive(),
        description: z.string(),
        teacherActions: z.string(),
        studentActions: z.string(),
      }),
    )
    .min(3)
    .max(8),
  assessment: z.object({
    method: z.string().describe("Método geral de avaliação da aprendizagem"),
    criteria: z.array(z.string()).min(2).max(6),
    instruments: z.array(z.string()).min(1).max(5),
  }),
  materials: z.array(z.string()).min(1).max(12),
});

export type LessonPlanSchema = z.infer<typeof lessonPlanSchema>;

export const lessonFormSchema = z.object({
  educationLevel: z.enum(["anos-iniciais", "anos-finais", "ensino-medio"], {
    message: "Selecione o nível de ensino",
  }),
  grade: z.string().min(1, "Selecione o ano/série"),
  subject: z.string().min(1, "Selecione a disciplina"),
  durationMinutes: z
    .number({ message: "Informe a duração da aula" })
    .int()
    .positive("Informe a duração da aula"),
  theme: z
    .string()
    .trim()
    .min(8, "Descreva o tema com pelo menos 8 caracteres")
    .max(200, "Mantenha o tema com até 200 caracteres"),
});

import { getSubjectLabel, EDUCATION_LEVELS } from "@/constants";
import { getGradesForLevel } from "@/constants/grades";
import type { LessonFormValues } from "@/types/lesson";

/**
 * System Prompt oculto do professor.
 *
 * O formulário coleta inputs simples; este módulo monta a instrução
 * pedagógica completa enviada ao LLM. Contribuidores podem evoluir o
 * texto aqui sem alterar a UI.
 */
export function buildLessonPlannerSystemPrompt(): string {
  return `
Você é uma coordenadora pedagógica sênior, especialista na Base Nacional Comum Curricular (BNCC) e em metodologias ativas para o ensino básico brasileiro.

Sua missão é transformar dados objetivos de um formulário em um plano de aula completo, realista e pronto para uso em sala.

Regras obrigatórias:
1. Responda SEMPRE em português brasileiro.
2. Alinhe competências/habilidades à BNCC do nível e disciplina informados. Use códigos oficiais quando tiver confiança; caso contrário, descreva a habilidade com precisão e marque o código como "N/A".
3. Proponha metodologia com pelo menos uma dinâmica visual ou interativa aplicável em escola pública comum (recursos simples).
4. Detalhe o passo a passo da aula com tempos que somem aproximadamente a duração informada.
5. Inclua método de avaliação formativo, critérios observáveis e instrumentos concretos.
6. Seja prática: evite jargão vazio; priorize ações do professor e dos estudantes.
7. Não invente políticas ou documentos inexistentes. Não peça confirmações ao usuário — entregue o plano completo.
8. Adapte linguagem e complexidade ao ano/série indicado.
`.trim();
}

/**
 * Prompt de usuário gerado a partir do formulário (zero-prompt para o professor).
 */
export function buildLessonPlannerUserPrompt(input: LessonFormValues): string {
  const levelLabel =
    EDUCATION_LEVELS.find((level) => level.id === input.educationLevel)
      ?.label ?? input.educationLevel;

  const gradeLabel =
    getGradesForLevel(input.educationLevel).find(
      (grade) => grade.id === input.grade,
    )?.label ?? input.grade;

  const subjectLabel = getSubjectLabel(input.educationLevel, input.subject);

  return `
Gere um plano de aula estruturado com os seguintes parâmetros:

- Nível de ensino: ${levelLabel}
- Ano/Série: ${gradeLabel}
- Disciplina: ${subjectLabel}
- Duração da aula: ${input.durationMinutes} minutos
- Tema ou objetivo informado pelo professor: ${input.theme}

Estruture a resposta rigorosamente nos campos do schema:
- Competências da BNCC
- Metodologia (com dinâmica visual/interativa)
- Passo a passo da aula
- Método de avaliação
- Materiais necessários
`.trim();
}

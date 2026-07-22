import type { EducationLevelId } from "@/types/lesson";

export type GradeOption = {
  id: string;
  label: string;
};

/**
 * Séries/anos por nível de ensino.
 * Customização open-source: altere apenas este arquivo para ajustar as opções
 * do select de Ano/Série sem tocar no formulário.
 */
export const GRADES_BY_LEVEL: Record<EducationLevelId, GradeOption[]> = {
  "anos-iniciais": [
    { id: "1-ano", label: "1º ano" },
    { id: "2-ano", label: "2º ano" },
    { id: "3-ano", label: "3º ano" },
    { id: "4-ano", label: "4º ano" },
    { id: "5-ano", label: "5º ano" },
  ],
  "anos-finais": [
    { id: "6-ano", label: "6º ano" },
    { id: "7-ano", label: "7º ano" },
    { id: "8-ano", label: "8º ano" },
    { id: "9-ano", label: "9º ano" },
  ],
  "ensino-medio": [
    { id: "1-serie", label: "1ª série" },
    { id: "2-serie", label: "2ª série" },
    { id: "3-serie", label: "3ª série" },
  ],
};

export function getGradesForLevel(level: EducationLevelId): GradeOption[] {
  return GRADES_BY_LEVEL[level] ?? [];
}

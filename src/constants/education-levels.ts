import type { EducationLevelId } from "@/types/lesson";

export type EducationLevelOption = {
  id: EducationLevelId;
  label: string;
  description: string;
};

/**
 * Níveis de ensino suportados pelo MVP.
 * Para adicionar um novo nível: inclua aqui e complete as listas em
 * `grades.ts` e `subjects.ts` com a mesma chave `id`.
 */
export const EDUCATION_LEVELS: EducationLevelOption[] = [
  {
    id: "anos-iniciais",
    label: "Anos Iniciais do Ensino Fundamental",
    description: "1º ao 5º ano",
  },
  {
    id: "anos-finais",
    label: "Anos Finais do Ensino Fundamental",
    description: "6º ao 9º ano",
  },
  {
    id: "ensino-medio",
    label: "Ensino Médio",
    description: "1ª à 3ª série",
  },
];

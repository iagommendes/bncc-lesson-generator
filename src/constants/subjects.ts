import type { EducationLevelId } from "@/types/lesson";

export type SubjectOption = {
  id: string;
  label: string;
};

/**
 * Disciplinas por nível de ensino — ponto principal de customização do projeto.
 *
 * Como contribuir com uma nova disciplina:
 * 1. Adicione um item `{ id, label }` na lista do nível desejado.
 * 2. Use um `id` estável em kebab-case (ex.: "educacao-financeira").
 * 3. Não é necessário alterar o formulário nem o system prompt:
 *    o label selecionado é injetado automaticamente na geração.
 */
export const SUBJECTS_BY_LEVEL: Record<EducationLevelId, SubjectOption[]> = {
  "anos-iniciais": [
    { id: "lingua-portuguesa", label: "Língua Portuguesa" },
    { id: "matematica", label: "Matemática" },
    { id: "ciencias", label: "Ciências" },
    { id: "historia", label: "História" },
    { id: "geografia", label: "Geografia" },
    { id: "arte", label: "Arte" },
    { id: "educacao-fisica", label: "Educação Física" },
    { id: "ensino-religioso", label: "Ensino Religioso" },
  ],
  "anos-finais": [
    { id: "lingua-portuguesa", label: "Língua Portuguesa" },
    { id: "matematica", label: "Matemática" },
    { id: "ciencias", label: "Ciências" },
    { id: "historia", label: "História" },
    { id: "geografia", label: "Geografia" },
    { id: "lingua-inglesa", label: "Língua Inglesa" },
    { id: "arte", label: "Arte" },
    { id: "educacao-fisica", label: "Educação Física" },
    { id: "ensino-religioso", label: "Ensino Religioso" },
  ],
  "ensino-medio": [
    { id: "lingua-portuguesa", label: "Língua Portuguesa" },
    { id: "matematica", label: "Matemática" },
    { id: "biologia", label: "Biologia" },
    { id: "fisica", label: "Física" },
    { id: "quimica", label: "Química" },
    { id: "historia", label: "História" },
    { id: "geografia", label: "Geografia" },
    { id: "filosofia", label: "Filosofia" },
    { id: "sociologia", label: "Sociologia" },
    { id: "lingua-inglesa", label: "Língua Inglesa" },
    { id: "arte", label: "Arte" },
    { id: "educacao-fisica", label: "Educação Física" },
  ],
};

export function getSubjectsForLevel(level: EducationLevelId): SubjectOption[] {
  return SUBJECTS_BY_LEVEL[level] ?? [];
}

export function getSubjectLabel(
  level: EducationLevelId,
  subjectId: string,
): string {
  return (
    getSubjectsForLevel(level).find((subject) => subject.id === subjectId)
      ?.label ?? subjectId
  );
}

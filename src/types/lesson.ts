/**
 * Tipos compartilhados do fluxo de geração de planos de aula.
 * Mantidos separados das constants para que UI, actions e schema Zod
 * importem a mesma fonte de verdade sem acoplar labels de formulário.
 */

export type EducationLevelId =
  | "anos-iniciais"
  | "anos-finais"
  | "ensino-medio";

export type LessonFormValues = {
  educationLevel: EducationLevelId;
  grade: string;
  subject: string;
  durationMinutes: number;
  theme: string;
};

export type BnccCompetence = {
  code: string;
  description: string;
};

export type LessonStep = {
  title: string;
  durationMinutes: number;
  description: string;
  teacherActions: string;
  studentActions: string;
};

export type LessonPlan = {
  title: string;
  summary: string;
  bnccCompetences: BnccCompetence[];
  methodology: {
    name: string;
    description: string;
    interactiveDynamics: string;
  };
  steps: LessonStep[];
  assessment: {
    method: string;
    criteria: string[];
    instruments: string[];
  };
  materials: string[];
};

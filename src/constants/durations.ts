export type DurationOption = {
  minutes: number;
  label: string;
};

/**
 * Durações comuns de aula no ensino básico brasileiro.
 * Ajuste aqui se sua rede/escola usar blocos diferentes (ex.: 40 ou 60 min).
 */
export const LESSON_DURATIONS: DurationOption[] = [
  { minutes: 45, label: "45 minutos" },
  { minutes: 50, label: "50 minutos" },
  { minutes: 90, label: "90 minutos (aula geminada)" },
  { minutes: 100, label: "100 minutos (bloco)" },
];

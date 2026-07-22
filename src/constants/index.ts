/**
 * Barrel de constants do domínio educacional.
 * Importe daqui nos componentes para manter um ponto único de extensão.
 */
export { EDUCATION_LEVELS } from "./education-levels";
export { GRADES_BY_LEVEL, getGradesForLevel } from "./grades";
export {
  SUBJECTS_BY_LEVEL,
  getSubjectsForLevel,
  getSubjectLabel,
} from "./subjects";
export { LESSON_DURATIONS } from "./durations";

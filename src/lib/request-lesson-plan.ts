/**
 * Ponto de import estável para a UI.
 * No build do GitHub Pages, o `next.config` redireciona este módulo
 * para `request-lesson-plan.demo.ts` (sem Server Actions).
 */
export { isDemoMode, requestLessonPlan } from "./request-lesson-plan.prod";

"use client";

import { useState, useTransition } from "react";

import { EDUCATION_LEVELS, getGradesForLevel, getSubjectLabel } from "@/constants";
import { isDemoMode } from "@/lib/demo-mode";
import { requestLessonPlan } from "@/lib/request-lesson-plan";
import type { LessonFormValues, LessonPlan } from "@/types/lesson";
import { LessonForm } from "@/components/lesson/lesson-form";
import { LessonPlanDocument } from "@/components/lesson/lesson-plan-document";
import { PrintButton } from "@/components/lesson/print-button";

/**
 * Orquestra formulário → geração (demo mock ou Server Action) → documento.
 */
export function LessonPlanner() {
  const [plan, setPlan] = useState<LessonPlan | null>(null);
  const [meta, setMeta] = useState<LessonFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(values: LessonFormValues) {
    setError(null);
    startTransition(async () => {
      const result = await requestLessonPlan(values);

      if (!result.success) {
        setPlan(null);
        setMeta(null);
        setError(result.error);
        return;
      }

      setPlan(result.plan);
      setMeta(values);
    });
  }

  const documentMeta = meta
    ? {
        educationLevel:
          EDUCATION_LEVELS.find((level) => level.id === meta.educationLevel)
            ?.label ?? meta.educationLevel,
        grade:
          getGradesForLevel(meta.educationLevel).find(
            (grade) => grade.id === meta.grade,
          )?.label ?? meta.grade,
        subject: getSubjectLabel(meta.educationLevel, meta.subject),
        durationMinutes: meta.durationMinutes,
        theme: meta.theme,
      }
    : undefined;

  return (
    <div className="flex flex-col gap-10">
      <section className="print:hidden rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
        <div className="mb-6 max-w-2xl">
          <h2 className="font-serif text-2xl tracking-tight text-foreground">
            Dados da aula
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Preencha o formulário. Nos bastidores, montamos o prompt pedagógico
            completo — sem chat e sem engenharia de prompt.
            {isDemoMode
              ? " Nesta demo online, o plano retornado é mockado."
              : null}
          </p>
        </div>

        <LessonForm onSubmit={handleSubmit} isSubmitting={isPending} />

        {error ? (
          <p
            className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}
      </section>

      {plan ? (
        <section className="flex flex-col gap-4">
          <div className="print:hidden flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl tracking-tight">
                Plano gerado
              </h2>
              <p className="text-sm text-muted-foreground">
                Revise e exporte via impressão nativa do navegador (Salvar como
                PDF).
              </p>
            </div>
            <PrintButton />
          </div>
          <LessonPlanDocument plan={plan} meta={documentMeta} />
        </section>
      ) : null}
    </div>
  );
}

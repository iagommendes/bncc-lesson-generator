import type { ReactNode } from "react";

import type { LessonPlan } from "@/types/lesson";

type LessonPlanDocumentProps = {
  plan: LessonPlan;
  meta?: {
    educationLevel: string;
    grade: string;
    subject: string;
    durationMinutes: number;
    theme: string;
  };
};

/**
 * Documento estilo A4 — único conteúdo visível na impressão.
 */
export function LessonPlanDocument({ plan, meta }: LessonPlanDocumentProps) {
  return (
    <article className="lesson-print-root mx-auto w-full max-w-[210mm] bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-200 print:max-w-none print:shadow-none print:ring-0">
      <div className="px-8 py-10 sm:px-12 sm:py-12">
        <header className="border-b border-zinc-200 pb-6">
          <p className="text-xs font-medium tracking-[0.14em] text-teal-800 uppercase">
            Plano de aula · BNCC
          </p>
          <h1 className="mt-2 font-serif text-3xl leading-tight text-balance">
            {plan.title}
          </h1>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-600">
            {plan.summary}
          </p>
          {meta ? (
            <dl className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
              <MetaItem label="Nível" value={meta.educationLevel} />
              <MetaItem label="Ano/Série" value={meta.grade} />
              <MetaItem label="Disciplina" value={meta.subject} />
              <MetaItem
                label="Duração"
                value={`${meta.durationMinutes} minutos`}
              />
              <MetaItem label="Tema" value={meta.theme} className="sm:col-span-2" />
            </dl>
          ) : null}
        </header>

        <Section title="Competências da BNCC">
          <ul className="space-y-3">
            {plan.bnccCompetences.map((item) => (
              <li key={`${item.code}-${item.description}`} className="text-sm">
                <span className="font-semibold text-teal-900">{item.code}</span>
                <span className="text-zinc-700"> — {item.description}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Metodologia">
          <h3 className="text-base font-semibold text-zinc-900">
            {plan.methodology.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700">
            {plan.methodology.description}
          </p>
          <p className="mt-3 rounded-md bg-teal-50 px-3 py-2 text-sm leading-relaxed text-teal-950">
            <span className="font-medium">Dinâmica sugerida: </span>
            {plan.methodology.interactiveDynamics}
          </p>
        </Section>

        <Section title="Passo a passo da aula">
          <ol className="space-y-5">
            {plan.steps.map((step, index) => (
              <li key={`${step.title}-${index}`} className="text-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-zinc-900">
                    {index + 1}. {step.title}
                  </h3>
                  <span className="text-xs font-medium text-zinc-500">
                    {step.durationMinutes} min
                  </span>
                </div>
                <p className="mt-1.5 leading-relaxed text-zinc-700">
                  {step.description}
                </p>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  <p className="leading-relaxed">
                    <span className="font-medium text-zinc-900">Professor: </span>
                    <span className="text-zinc-700">{step.teacherActions}</span>
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-medium text-zinc-900">Estudantes: </span>
                    <span className="text-zinc-700">{step.studentActions}</span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Método de avaliação">
          <p className="text-sm leading-relaxed text-zinc-700">
            {plan.assessment.method}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">Critérios</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                {plan.assessment.criteria.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900">
                Instrumentos
              </h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                {plan.assessment.instruments.map((instrument) => (
                  <li key={instrument}>{instrument}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Materiais">
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700">
            {plan.materials.map((material) => (
              <li key={material}>{material}</li>
            ))}
          </ul>
        </Section>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b border-zinc-100 py-6 last:border-b-0">
      <h2 className="mb-3 font-serif text-xl text-zinc-900">{title}</h2>
      {children}
    </section>
  );
}

function MetaItem({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 text-zinc-800">{value}</dd>
    </div>
  );
}

import { LessonPlanner } from "@/components/lesson/lesson-planner";

export default function HomePage() {
  return (
    <main className="relative flex-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_oklch(0.94_0.03_180)_0%,_transparent_55%),linear-gradient(180deg,_oklch(0.985_0.01_145)_0%,_oklch(0.97_0.015_90)_100%)] print:hidden"
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="print:hidden mb-10 max-w-2xl">
          <p className="text-sm font-medium tracking-[0.16em] text-teal-800 uppercase">
            Open source · Ensino básico
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-[1.1] tracking-tight text-balance sm:text-5xl">
            BNCC Lesson Generator
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
            Planejador de aulas zero-prompt: o professor preenche um formulário
            simples e recebe um plano estruturado, alinhado à BNCC, pronto para
            imprimir.
          </p>
        </header>

        <LessonPlanner />
      </div>
    </main>
  );
}

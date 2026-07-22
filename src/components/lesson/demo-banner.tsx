import { isDemoMode } from "@/lib/demo-mode";

/**
 * Aviso visível no GitHub Pages: deixa claro que os planos são mockados.
 */
export function DemoBanner() {
  if (!isDemoMode) return null;

  return (
    <div className="print:hidden border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-sm text-amber-950">
      <strong className="font-semibold">Modo demo</strong>
      {" — "}
      planos gerados com dados mockados (sem chamada de IA). Clone o repo e
      configure <code className="rounded bg-amber-100 px-1">OPENAI_API_KEY</code>{" "}
      para a geração real.
    </div>
  );
}

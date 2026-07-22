"use client";

import { PrinterIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type PrintButtonProps = {
  disabled?: boolean;
};

/**
 * Dispara o diálogo nativo de impressão do navegador.
 * O CSS `@media print` em `globals.css` oculta a chrome do site
 * e mantém apenas o documento A4 (`.lesson-print-root`).
 */
export function PrintButton({ disabled = false }: PrintButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      disabled={disabled}
      onClick={() => window.print()}
      className="print:hidden"
    >
      <PrinterIcon />
      Imprimir / Exportar PDF
    </Button>
  );
}

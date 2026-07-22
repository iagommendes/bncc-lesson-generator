import type { Metadata } from "next";
import { Literata, Source_Sans_3 } from "next/font/google";

import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BNCC Lesson Generator",
  description:
    "Gerador open-source de planos de aula alinhados à BNCC — formulário simples, zero prompt para o professor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sourceSans.variable} ${literata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

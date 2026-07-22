# BNCC Lesson Generator

Gerador open-source de planos de aula alinhados à BNCC. O professor preenche um formulário tradicional; o sistema monta, nos bastidores, um prompt pedagógico completo e devolve um plano estruturado pronto para impressão/PDF.

**Zero-prompt para o professor. Fácil de clonar e customizar disciplinas.**

## Stack

- Next.js (App Router) + TypeScript estrito
- Tailwind CSS + Shadcn UI
- React Hook Form + Zod
- Vercel AI SDK (`generateObject`)
- CSS Print (Salvar como PDF nativo do navegador)

## Começando

```bash
git clone https://github.com/iagommendes/bncc-lesson-generator.git
cd bncc-lesson-generator
npm install
cp .env.example .env.local
# edite .env.local e adicione OPENAI_API_KEY
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Estrutura de pastas

```text
src/
├── actions/                 # Server Actions (chamada à IA)
│   └── generate-lesson-plan.ts
├── components/
│   ├── lesson/              # UI do domínio (formulário, documento, print)
│   │   ├── lesson-form.tsx
│   │   ├── lesson-planner.tsx
│   │   ├── lesson-plan-document.tsx
│   │   └── print-button.tsx
│   └── ui/                  # Primitivos Shadcn (genéricos)
├── constants/               # Listas editáveis: níveis, séries, disciplinas
│   ├── education-levels.ts
│   ├── grades.ts
│   ├── subjects.ts          # ← ponto principal de customização
│   ├── durations.ts
│   └── index.ts
├── lib/
│   ├── ai/
│   │   ├── schema.ts        # Zod: formulário + plano estruturado
│   │   └── system-prompt.ts # System prompt + bridge do formulário → LLM
│   └── utils.ts
├── types/
│   └── lesson.ts
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css          # inclui @media print para PDF
```

### Por que essa separação?

| Pasta | Responsabilidade | Quem edita com frequência |
| --- | --- | --- |
| `constants/` | Dados de domínio (séries, disciplinas) | Contribuidores pedagógicos / forks |
| `actions/` | Integração com o LLM (sem UI) | Quem troca provider/modelo |
| `lib/ai/` | Prompt + schema de saída | Quem afina qualidade pedagógica |
| `components/lesson/` | Fluxo do produto | Frontend |
| `components/ui/` | Design system genérico | Quase nunca (Shadcn) |

Isso evita que um professor/dev que só quer **adicionar Geografia em um nível** precise abrir o formulário ou o prompt.

## Customizar disciplinas

Edite `src/constants/subjects.ts`:

```ts
{ id: "educacao-financeira", label: "Educação Financeira" }
```

O formulário e o system prompt leem essa lista automaticamente. Não é necessário alterar a UI.

## Fluxo zero-prompt

1. `LessonForm` coleta nível, série, disciplina, duração e tema.
2. `generateLessonPlan` (Server Action) valida com Zod.
3. `system-prompt.ts` transforma os inputs em instrução de coordenadora pedagógica.
4. `generateObject` força o retorno no schema (BNCC, metodologia, passo a passo, avaliação).
5. `LessonPlanDocument` renderiza estilo A4; `PrintButton` chama `window.print()`.

## Scripts

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção
npm run start   # servir build
npm run lint    # ESLint
```

## Licença

MIT — veja [LICENSE](./LICENSE).

import { EDUCATION_LEVELS, getGradesForLevel, getSubjectLabel } from "@/constants";
import type { LessonFormValues, LessonPlan } from "@/types/lesson";

/**
 * Gera um plano de aula determinístico para o modo demo (GitHub Pages).
 * Espelha o schema real para a UI funcionar sem chave de API / sem server.
 */
export function generateMockLessonPlan(input: LessonFormValues): LessonPlan {
  const levelLabel =
    EDUCATION_LEVELS.find((level) => level.id === input.educationLevel)
      ?.label ?? input.educationLevel;
  const gradeLabel =
    getGradesForLevel(input.educationLevel).find(
      (grade) => grade.id === input.grade,
    )?.label ?? input.grade;
  const subjectLabel = getSubjectLabel(input.educationLevel, input.subject);

  const total = input.durationMinutes;
  const warm = Math.max(5, Math.round(total * 0.15));
  const develop = Math.max(15, Math.round(total * 0.55));
  const practice = Math.max(8, Math.round(total * 0.2));
  const close = Math.max(5, total - warm - develop - practice);

  return {
    title: `${subjectLabel}: ${input.theme}`,
    summary: `Plano demonstrativo para ${gradeLabel} (${levelLabel}) em ${subjectLabel}, com foco em "${input.theme}". Este conteúdo é mockado para testes no GitHub Pages — no deploy com API, a IA gera o plano completo.`,
    bnccCompetences: [
      {
        code: "N/A",
        description: `Mobilizar conhecimentos de ${subjectLabel} relacionados a "${input.theme}", conforme a BNCC do ${levelLabel.toLowerCase()}.`,
      },
      {
        code: "N/A",
        description:
          "Argumentar com base em fatos, dados e informações confiáveis, exercitando a curiosidade intelectual.",
      },
    ],
    methodology: {
      name: "Aula dialogada com estação interativa",
      description:
        "Combina exposição dialogada breve, atividade em grupos e socialização dos achados, priorizando recursos simples de escola pública.",
      interactiveDynamics: `Estações de aprendizagem: os estudantes rotacionam entre 2–3 postos (leitura/visualização, manipulação/resolução e registro) sobre "${input.theme}", com cartões-desafio e um mural coletivo ao final.`,
    },
    steps: [
      {
        title: "Abertura e ativação de conhecimentos prévios",
        durationMinutes: warm,
        description: `Provoca hipóteses iniciais sobre "${input.theme}" com pergunta-gatilho e registro no quadro.`,
        teacherActions:
          "Apresenta o objetivo da aula, lança a pergunta-gatilho e organiza a escuta das respostas.",
        studentActions:
          "Compartilham o que já sabem e anotam dúvidas iniciais no caderno.",
      },
      {
        title: "Desenvolvimento conceitual",
        durationMinutes: develop,
        description: `Explora o núcleo de "${input.theme}" com exemplos do cotidiano e linguagem adequada ao ${gradeLabel}.`,
        teacherActions:
          "Media a explicação, usa apoio visual (quadro/slides) e verifica compreensão com perguntas intercaladas.",
        studentActions:
          "Acompanham exemplos, fazem perguntas e resolvem um item-guia em dupla.",
      },
      {
        title: "Prática guiada / dinâmica interativa",
        durationMinutes: practice,
        description:
          "Aplica a dinâmica das estações para consolidar o conteúdo de forma ativa.",
        teacherActions:
          "Organiza os grupos, circula pelas estações e oferece feedback formativo.",
        studentActions:
          "Colaboram na resolução dos cartões-desafio e registram conclusões no mural.",
      },
      {
        title: "Síntese e fechamento avaliativo",
        durationMinutes: close,
        description:
          "Retoma o objetivo, sistematiza aprendizagens e coleta evidências rápidas de compreensão.",
        teacherActions:
          "Conduz a síntese coletiva e aplica um ticket de saída com 1–2 perguntas-chave.",
        studentActions:
          "Verbalizam a aprendizagem principal e entregam o ticket de saída.",
      },
    ],
    assessment: {
      method:
        "Avaliação formativa contínua, com observação da participação nas estações e ticket de saída ao final.",
      criteria: [
        `Explica com as próprias palavras o conceito central de "${input.theme}"`,
        "Colabora na atividade em grupo e respeita turnos de fala",
        "Aplica o conteúdo em pelo menos um exemplo ou exercício proposto",
      ],
      instruments: [
        "Observação estruturada (checklist do professor)",
        "Produção do mural/estação",
        "Ticket de saída (2 perguntas curtas)",
      ],
    },
    materials: [
      "Quadro e pincel",
      "Cartões-desafio impressos ou manuscritos",
      "Folhas para mural coletivo",
      "Caderno do estudante",
      "Projetor ou imagens impressas (opcional)",
    ],
  };
}

export function simulateDemoLatency(ms = 850): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

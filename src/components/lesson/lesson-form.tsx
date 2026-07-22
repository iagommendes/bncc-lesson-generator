"use client";

import { useEffect, type ReactNode } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";

import {
  EDUCATION_LEVELS,
  LESSON_DURATIONS,
  getGradesForLevel,
  getSubjectsForLevel,
} from "@/constants";
import { lessonFormSchema } from "@/lib/ai/schema";
import type { EducationLevelId, LessonFormValues } from "@/types/lesson";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type LessonFormProps = {
  onSubmit: (values: LessonFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
};

const DEFAULT_VALUES: LessonFormValues = {
  educationLevel: "ensino-medio",
  grade: "1-serie",
  subject: "matematica",
  durationMinutes: 50,
  theme: "",
};

export function LessonForm({ onSubmit, isSubmitting = false }: LessonFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<LessonFormValues>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onSubmit",
  });

  const educationLevel = useWatch({
    control,
    name: "educationLevel",
    defaultValue: DEFAULT_VALUES.educationLevel,
  });
  const grades = getGradesForLevel(educationLevel);
  const subjects = getSubjectsForLevel(educationLevel);

  // Ao trocar o nível, redefine série/disciplina se a seleção atual for inválida.
  useEffect(() => {
    const currentGrade = getValues("grade");
    const currentSubject = getValues("subject");
    const nextGrades = getGradesForLevel(educationLevel as EducationLevelId);
    const nextSubjects = getSubjectsForLevel(
      educationLevel as EducationLevelId,
    );

    if (!nextGrades.some((grade) => grade.id === currentGrade)) {
      const nextGrade = nextGrades[0]?.id;
      if (nextGrade) setValue("grade", nextGrade, { shouldValidate: true });
    }

    if (!nextSubjects.some((subject) => subject.id === currentSubject)) {
      const nextSubject = nextSubjects[0]?.id;
      if (nextSubject) {
        setValue("subject", nextSubject, { shouldValidate: true });
      }
    }
  }, [educationLevel, getValues, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      noValidate
    >
      <fieldset className="grid gap-4 sm:grid-cols-2" disabled={isSubmitting}>
        <legend className="sr-only">Dados da aula</legend>

        <Field
          label="Nível de ensino"
          htmlFor="educationLevel"
          error={errors.educationLevel?.message}
        >
          <Controller
            name="educationLevel"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <SelectTrigger
                  id="educationLevel"
                  className="w-full"
                  aria-invalid={Boolean(errors.educationLevel)}
                >
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          label="Ano / Série"
          htmlFor="grade"
          error={errors.grade?.message}
        >
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <SelectTrigger
                  id="grade"
                  className="w-full"
                  aria-invalid={Boolean(errors.grade)}
                >
                  <SelectValue placeholder="Selecione o ano/série" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade.id} value={grade.id}>
                      {grade.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          label="Disciplina"
          htmlFor="subject"
          error={errors.subject?.message}
        >
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value);
                }}
              >
                <SelectTrigger
                  id="subject"
                  className="w-full"
                  aria-invalid={Boolean(errors.subject)}
                >
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field
          label="Duração da aula"
          htmlFor="durationMinutes"
          error={errors.durationMinutes?.message}
        >
          <Controller
            name="durationMinutes"
            control={control}
            render={({ field }) => (
              <Select
                value={String(field.value)}
                onValueChange={(value) => {
                  if (value) field.onChange(Number(value));
                }}
              >
                <SelectTrigger
                  id="durationMinutes"
                  className="w-full"
                  aria-invalid={Boolean(errors.durationMinutes)}
                >
                  <SelectValue placeholder="Selecione a duração" />
                </SelectTrigger>
                <SelectContent>
                  {LESSON_DURATIONS.map((duration) => (
                    <SelectItem
                      key={duration.minutes}
                      value={String(duration.minutes)}
                    >
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </fieldset>

      <Field
        label="Tema ou objetivo da aula"
        htmlFor="theme"
        error={errors.theme?.message}
        hint='Ex.: "Trigonometria básica e ângulos notáveis"'
      >
        <Textarea
          id="theme"
          rows={3}
          placeholder="Descreva o tema ou o objetivo de aprendizagem..."
          aria-invalid={Boolean(errors.theme)}
          disabled={isSubmitting}
          {...register("theme")}
        />
      </Field>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2Icon className="animate-spin" />
            Gerando plano...
          </>
        ) : (
          "Gerar plano de aula"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {hint && !error ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

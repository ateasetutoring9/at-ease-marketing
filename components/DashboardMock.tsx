import { Check, Circle, X } from "lucide-react";

type View = "week" | "topic" | "subjects";

const weekData = {
  studentFirstName: "Maya",
  totalTime: "3h 40m this week",
  topics: [
    {
      subject: "Mathematics Methods ATAR",
      title: "Quadratic Functions — Graphs and Features",
      status: "done" as const,
      score: "6/7 correct",
    },
    {
      subject: "Human Biology ATAR",
      title: "Homeostasis and Thermoregulation",
      status: "done" as const,
      score: "5/6 correct",
    },
    {
      subject: "English ATAR",
      title: "Analysing Persuasive Techniques",
      status: "in-progress" as const,
      score: null,
    },
    {
      subject: "Mathematics Methods ATAR",
      title: "Circles and Other Relations",
      status: "done" as const,
      score: "7/7 correct",
    },
    {
      subject: "Human Biology ATAR",
      title: "Cell Transport and Membranes",
      status: "in-progress" as const,
      score: null,
    },
  ],
};

const topicData = {
  subject: "Mathematics Methods ATAR",
  title: "Quadratic Functions — Graphs and Features",
  questions: [
    { label: "Q1 · Identifying vertex form", correct: true },
    { label: "Q2 · Axis of symmetry from an equation", correct: true },
    { label: "Q3 · Sketching a parabola from key features", correct: true },
    { label: "Q4 · Finding the y-intercept", correct: false },
    { label: "Q5 · Number of x-intercepts from the discriminant", correct: true },
    { label: "Q6 · Converting to turning point form", correct: false },
    { label: "Q7 · Explaining the effect of a dilation", correct: true },
  ],
  repeatedMistake:
    "Sign error when expanding (x − h)² in turning point form — shows up in Q4 and Q6.",
};

const subjectsData = [
  { subject: "Mathematics Methods ATAR", filled: 4 },
  { subject: "Human Biology ATAR", filled: 3 },
  { subject: "English ATAR", filled: 5 },
];

const SEGMENTS = 6;

function progressLabel(filled: number) {
  if (filled >= 5) return "Strong";
  if (filled >= 3) return "Building";
  return "Just started";
}

const rowLayout = "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between";
const list = "flex flex-col divide-y divide-border border-t border-b border-border";

export function DashboardMock({ view }: { view: View }) {
  if (view === "week") {
    return (
      <div className="flex flex-col gap-4">
        <div className={rowLayout}>
          <p className="text-subsection-title text-fg">{weekData.studentFirstName}&apos;s week</p>
          <p className="text-small text-muted">{weekData.totalTime}</p>
        </div>
        <div className={list}>
          {weekData.topics.map((t) => (
            <div key={t.title} className={`${rowLayout} py-3`}>
              <div className="min-w-0">
                <p className="text-small font-medium text-fg">{t.title}</p>
                <p className="text-small text-muted">{t.subject}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {t.status === "done" ? (
                  <span className="inline-flex items-center gap-1 text-small font-medium text-success">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                    Done
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-small font-medium text-muted">
                    <Circle className="w-3.5 h-3.5" aria-hidden="true" />
                    In progress
                  </span>
                )}
                {t.score && <span className="text-small text-muted">{t.score}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "topic") {
    return (
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-subsection-title text-fg">{topicData.title}</p>
          <p className="text-small text-muted">{topicData.subject}</p>
        </div>
        <div className={list}>
          {topicData.questions.map((q) => (
            <div key={q.label} className="flex items-center justify-between gap-3 py-2.5">
              <p className="text-small text-fg">{q.label}</p>
              {q.correct ? (
                <Check className="w-4 h-4 text-success flex-shrink-0" aria-hidden="true" />
              ) : (
                <X className="w-4 h-4 text-error flex-shrink-0" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        <div className="rounded-md bg-panel border border-border p-3">
          <p className="text-small text-muted">
            <span className="font-medium text-fg">Repeated mistake — </span>
            {topicData.repeatedMistake}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={list}>
      {subjectsData.map((s) => (
        <div key={s.subject} className={`${rowLayout} py-3`}>
          <p className="text-small font-medium text-fg">{s.subject}</p>
          <div
            className="flex items-center gap-2"
            role="img"
            aria-label={`Progress: ${progressLabel(s.filled)}`}
          >
            <div className="flex gap-1" aria-hidden="true">
              {Array.from({ length: SEGMENTS }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${i < s.filled ? "bg-accent" : "bg-border"}`}
                />
              ))}
            </div>
            <span className="text-small text-muted">{progressLabel(s.filled)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

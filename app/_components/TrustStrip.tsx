import { BookOpen, CircleOff, Heart } from "lucide-react";

const signals = [
  {
    label: "Australian Curriculum Aligned",
    icon: <BookOpen className="w-6 h-6" aria-hidden="true" />,
  },
  {
    label: "No Ads, Ever",
    icon: <CircleOff className="w-6 h-6" aria-hidden="true" />,
  },
  {
    label: "Australian Made",
    icon: <Heart className="w-6 h-6" aria-hidden="true" />,
  },
];

export function TrustStrip() {
  return (
    <div className="bg-accent-soft border-y border-border py-10 px-4">
      <div className="max-w-page mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {signals.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 text-center">
              <div className="text-accent">{s.icon}</div>
              <p className="text-small font-semibold text-fg">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

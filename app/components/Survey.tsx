"use client";

import { useState, useEffect } from "react";
import { questions } from "@/app/data/questions";
import { questionsEN } from "@/app/data/questions.en";
import { questionsJA } from "@/app/data/questions.ja";
import { questionsZHHans } from "@/app/data/questions.zh-hans";
import { questionsZHHant } from "@/app/data/questions.zh-hant";
import { questionsES } from "@/app/data/questions.es";
import { questionsFR } from "@/app/data/questions.fr";
import { questionsDE } from "@/app/data/questions.de";
import { questionsAR } from "@/app/data/questions.ar";
import { LangCode, UI } from "@/app/data/i18n";

interface SurveyProps {
  lang: LangCode;
  onComplete: (answers: number[]) => void;
}

function getQuestions(lang: LangCode) {
  switch (lang) {
    case "en":      return questionsEN;
    case "ja":      return questionsJA;
    case "zh-hans": return questionsZHHans;
    case "zh-hant": return questionsZHHant;
    case "es":      return questionsES;
    case "fr":      return questionsFR;
    case "de":      return questionsDE;
    case "ar":      return questionsAR;
    default:        return questions;
  }
}

export default function Survey({ lang, onComplete }: SurveyProps) {
  const t = UI[lang];
  const isRTL = lang === "ar";
  const qs = getQuestions(lang);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(qs.length).fill(null)
  );
  const [animKey, setAnimKey] = useState(0);

  const q = qs[current];
  const isLast = current === qs.length - 1;
  const hasAnswer = answers[current] !== null;
  const progress = Math.round((current / qs.length) * 100);

  function selectOption(i: number) {
    const next = [...answers];
    next[current] = i;
    setAnswers(next);
  }

  function goNext() {
    if (!hasAnswer) return;
    if (isLast) {
      onComplete(answers as number[]);
    } else {
      setAnimKey((k) => k + 1);
      setCurrent((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goPrev() {
    if (current === 0) return;
    setAnimKey((k) => k + 1);
    setCurrent((c) => c - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const num = parseInt(e.key);
      if (num >= 1 && num <= q.options.length) selectOption(num - 1);
      if (e.key === "Enter" && hasAnswer) goNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, hasAnswer, q.options.length]);

  return (
    <div className="max-w-2xl mx-auto px-6 pb-24" dir={isRTL ? "rtl" : "ltr"}>
      {/* 헤더 */}
      <div
        className="sticky top-0 z-10 pt-6 pb-4"
        style={{ background: "linear-gradient(to bottom, #1a1625 80%, transparent)" }}
      >
        <div className="text-xs tracking-widest mb-2 uppercase" style={{ color: "#c9a96e" }}>
          {q.part}
        </div>
        <div className="w-full h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "linear-gradient(to right, #c97b8a, #c9a96e)" }}
          />
        </div>
        <div className="text-xs mt-2 text-right" style={{ color: "#c8c2d8" }}>
          {t.questionOf(current + 1, qs.length)}
        </div>
      </div>

      {/* 질문 카드 */}
      <div
        key={animKey}
        className="animate-slideIn rounded-2xl p-8 mt-2"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div
          className="inline-block text-xs px-3 py-1 rounded-full mb-4"
          style={{ color: "#c9a96e", background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.25)" }}
        >
          {q.section}
        </div>
        <div className="text-xs mb-3" style={{ color: "#c8c2d8" }}>Q{current + 1}</div>
        <p className="font-serif text-xl font-semibold leading-relaxed mb-8" style={{ color: "#f5f0e8" }}>
          {q.text}
        </p>
        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const selected = answers[current] === i;
            return (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className="flex items-start gap-3 rounded-xl px-5 py-4 text-left transition-all duration-200"
                style={{
                  background: selected ? "rgba(201,169,110,0.15)" : "rgba(255,255,255,0.05)",
                  border: selected ? "1.5px solid #c9a96e" : "1.5px solid rgba(255,255,255,0.13)",
                }}
              >
                <div
                  className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: selected ? "#c9a96e" : "transparent",
                    border: selected ? "1.5px solid #c9a96e" : "1.5px solid rgba(255,255,255,0.35)",
                  }}
                >
                  {selected && (
                    <span className="text-xs font-bold" style={{ color: "#1a1625" }}>✓</span>
                  )}
                </div>
                <span className="text-base leading-relaxed font-medium" style={{ color: "#e8e4f0" }}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 네비게이션 */}
      <div
        className="flex justify-between items-center mt-8 pt-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          onClick={goPrev}
          className="px-7 py-3 rounded-full text-sm transition-all duration-200"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.18)",
            color: current === 0 ? "transparent" : "#d4cfdf",
            cursor: current === 0 ? "default" : "pointer",
            pointerEvents: current === 0 ? "none" : "auto",
          }}
        >
          {t.prev}
        </button>
        <button
          onClick={goNext}
          disabled={!hasAnswer}
          className="px-9 py-3.5 rounded-full text-base font-bold transition-all duration-200"
          style={{
            background: hasAnswer ? "linear-gradient(135deg, #c9a96e, #e8c98a)" : "rgba(255,255,255,0.08)",
            color: hasAnswer ? "#1a1625" : "rgba(255,255,255,0.3)",
            cursor: hasAnswer ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => { if (hasAnswer) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
        >
          {isLast ? t.finish : t.next}
        </button>
      </div>
    </div>
  );
}

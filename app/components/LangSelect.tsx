"use client";

import { LANGUAGES, LangCode } from "@/app/data/i18n";

interface LangSelectProps {
  onSelect: (lang: LangCode) => void;
}

export default function LangSelect({ onSelect }: LangSelectProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
      <div className="text-5xl mb-8 animate-float">🧭</div>
      <h1
        className="font-serif text-3xl font-bold mb-1 text-center"
        style={{ color: "#e8c98a" }}
      >
        SYS 인생 항해 점검표
      </h1>
      <p
        className="text-base mb-3 text-center"
        style={{ color: "#d4cfdf" }}
      >
        나의 인생 나침반
      </p>
      <p className="text-sm mb-12 text-center" style={{ color: "#c8c2d8" }}>
        My Life Compass · 私の人生コンパス · 我的人生罗盘
      </p>

      <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1.5px solid rgba(255,255,255,0.1)",
              color: "#e8e4f0",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(201,169,110,0.12)";
              el.style.borderColor = "rgba(201,169,110,0.5)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.background = "rgba(255,255,255,0.05)";
              el.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <span className="text-2xl">{lang.flag}</span>
            <span className="text-xs font-medium leading-tight text-center">
              {lang.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

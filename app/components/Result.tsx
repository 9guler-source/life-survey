"use client";

import { useEffect, useRef } from "react";
import { LangCode, UI } from "@/app/data/i18n";

interface ResultProps {
  text: string;
  lang: LangCode;
  onRestart: () => void;
}

export default function Result({ text, lang, onRestart }: ResultProps) {
  const t = UI[lang];
  const isRTL = lang === "ar";
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !text) return;
    const el = textRef.current;
    el.textContent = "";

    const cursor = document.createElement("span");
    cursor.style.cssText =
      "display:inline-block;width:2px;height:1.2em;background:#c9a96e;margin-left:2px;vertical-align:text-bottom;animation:blink 1s infinite";
    el.appendChild(cursor);

    const style = document.createElement("style");
    style.textContent = "@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}";
    document.head.appendChild(style);

    let i = 0;
    const id = setInterval(() => {
      if (i >= text.length) {
        clearInterval(id);
        cursor.remove();
        return;
      }
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      if (i % 60 === 0) el.scrollIntoView({ block: "end", behavior: "smooth" });
    }, 20);

    return () => {
      clearInterval(id);
      style.remove();
    };
  }, [text]);

  return (
    <div
      className="max-w-2xl mx-auto px-6 py-16 animate-fadeIn"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-center mb-12">
        <div className="text-5xl mb-6">✨</div>
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#c9a96e" }}>
          {t.resultEyebrow}
        </div>
        <h2 className="font-serif text-3xl font-bold mb-3" style={{ color: "#f5f0e8" }}>
          {t.resultTitle}
        </h2>
        <p className="text-sm" style={{ color: "#c8c2d8" }}>
          {t.resultSubtitle}
        </p>
      </div>

      <div
        className="rounded-3xl p-10 mb-8"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <div
          ref={textRef}
          className="font-serif text-lg leading-loose whitespace-pre-wrap"
          style={{ color: "#f0ece8" }}
        />
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl text-base transition-all duration-200"
        style={{ background: "transparent", border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.08)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
      >
        {t.restartBtn}
      </button>
    </div>
  );
}

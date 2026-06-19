"use client";

import { useEffect, useState } from "react";
import { LangCode, UI } from "@/app/data/i18n";

interface LoadingProps {
  lang: LangCode;
}

export default function Loading({ lang }: LoadingProps) {
  const t = UI[lang];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx((i) => (i + 1) % t.loadingMsgs.length);
    }, 3000);
    return () => clearInterval(id);
  }, [t.loadingMsgs.length]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div
        className="w-20 h-20 rounded-full mb-10 animate-pulse-orb"
        style={{
          background: "radial-gradient(circle, #e8c98a, #c97b8a, #2d2440)",
          boxShadow: "0 0 60px rgba(201,169,110,0.3)",
        }}
      />
      <h2 className="font-serif text-2xl mb-3" style={{ color: "#e8c98a" }}>
        {t.loadingTitle}
      </h2>
      <p className="text-sm mb-6" style={{ color: "#d4cfdf" }}>
        {t.loadingDesc}
      </p>
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: "#c9a96e",
              animation: `dot 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <p className="text-sm h-5" style={{ color: "#c8c2d8" }}>
        {t.loadingMsgs[msgIdx]}
      </p>
      <style>{`
        @keyframes dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

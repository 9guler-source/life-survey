"use client";

import { LangCode, UI } from "@/app/data/i18n";

interface IntroProps {
  lang: LangCode;
  onStart: () => void;
}

export default function Intro({ lang, onStart }: IntroProps) {
  const t = UI[lang];
  const isRTL = lang === "ar";

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-6 py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="text-6xl mb-8 animate-float">🌅</div>
      <h1 className="font-serif text-3xl font-bold mb-2 leading-tight" style={{ color: "#e8c98a" }}>
        SYS 인생 항해 점검표
      </h1>
      <p className="font-serif text-xl font-medium mb-6" style={{ color: "#d4cfdf" }}>
        {lang === "ko" ? "나의 인생 나침반" :
         lang === "ja" ? "私の人生コンパス" :
         lang === "zh-hans" ? "我的人生罗盘" :
         lang === "zh-hant" ? "我的人生羅盤" :
         lang === "es" ? "Mi Brújula de Vida" :
         lang === "fr" ? "Ma Boussole de Vie" :
         lang === "de" ? "Mein Lebenskompass" :
         lang === "ar" ? "بوصلة حياتي" :
         "My Life Compass"}
      </p>
      <p className="text-lg leading-relaxed mb-12 max-w-sm" style={{ color: "#d4cfdf" }}>
        {lang === "ko" ? "지나온 길과 앞으로의 여정을 돌아보는\n40가지 질문의 여행입니다.\n\n당신의 솔직한 답변이 모이면,\n원하는 AI 앱에 붙여넣어 당신만을 위한 이야기를 받아보실 수 있습니다." :
         lang === "ja" ? "歩んできた道とこれからの旅を振り返る\n40の問いの旅です。\n\nあなたの誠実な答えが集まれば、\nお好きなAIアプリに貼り付けて、あなただけの物語を受け取ることができます。" :
         "40 questions reflecting on your past journey\nand the road ahead.\n\nYour honest answers will become\na certificate you can paste into any AI app to receive your own personal story."}
      </p>

      <div className="flex gap-8 mb-14 text-sm" style={{ color: "#d4cfdf" }}>
        <span>📋 40</span>
        <span>⏱ ~10min</span>
        <span>✨ AI</span>
      </div>

      <button
        onClick={onStart}
        className="px-16 py-5 rounded-full text-lg font-bold transition-all duration-200 hover:-translate-y-1"
        style={{ background: "linear-gradient(135deg, #c9a96e, #e8c98a)", color: "#1a1625" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(201,169,110,0.4)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
      >
        {t.startBtn}
      </button>
    </div>
  );
}

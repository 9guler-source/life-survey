"use client";

import { useState } from "react";
import Stars from "./components/Stars";
import LangSelect from "./components/LangSelect";
import ProfileForm, { Profile } from "./components/ProfileForm";
import Intro from "./components/Intro";
import Survey from "./components/Survey";
import Loading from "./components/Loading";
import Result from "./components/Result";
import { LangCode, UI } from "./data/i18n";

type Phase = "lang" | "profile" | "intro" | "survey" | "loading" | "result" | "error";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("lang");
  const [lang, setLang] = useState<LangCode>("ko");
  const [profile, setProfile] = useState<Profile>({ nationality: "", birthYear: "", gender: "" });
  const [resultText, setResultText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleLang(l: LangCode) {
    setLang(l);
    setPhase("profile");
  }

  function handleProfile(p: Profile) {
    setProfile(p);
    setPhase("intro");
  }

  async function handleComplete(answers: number[]) {
    setPhase("loading");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          lang,
          nationality: profile.nationality,
          birthYear: profile.birthYear,
          gender: profile.gender,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");

      setResultText(data.result);
      setPhase("result");
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : "Unknown error");
      setPhase("error");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setResultText("");
    setErrorMsg("");
    setPhase("lang");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const t = UI[lang];

  return (
    <>
      <Stars />
      <main className="relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>
        {phase === "lang"     && <LangSelect onSelect={handleLang} />}
        {phase === "profile"  && <ProfileForm lang={lang} onComplete={handleProfile} />}
        {phase === "intro"    && <Intro lang={lang} onStart={() => setPhase("survey")} />}
        {phase === "survey"   && <Survey lang={lang} onComplete={handleComplete} />}
        {phase === "loading"  && <Loading lang={lang} />}
        {phase === "result"   && <Result text={resultText} lang={lang} onRestart={restart} />}
        {phase === "error"    && (
          <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
            <div className="text-5xl mb-6">⚠️</div>
            <h2 className="font-serif text-2xl mb-4" style={{ color: "#e8c98a" }}>
              {t.errorTitle}
            </h2>
            <div
              className="rounded-xl p-5 mb-8 text-sm leading-relaxed max-w-md"
              style={{ background: "rgba(201,100,100,0.1)", border: "1px solid rgba(201,100,100,0.3)", color: "#e8a0a0" }}
            >
              {errorMsg}
            </div>
            <button
              onClick={restart}
              className="px-10 py-4 rounded-full font-bold"
              style={{ background: "linear-gradient(135deg, #c9a96e, #e8c98a)", color: "#1a1625" }}
            >
              {t.retryBtn}
            </button>
          </div>
        )}
      </main>
    </>
  );
}

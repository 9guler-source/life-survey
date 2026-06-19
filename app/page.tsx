"use client";

import { useState } from "react";
import Stars from "./components/Stars";
import LangSelect from "./components/LangSelect";
import ProfileForm, { Profile } from "./components/ProfileForm";
import Intro from "./components/Intro";
import Survey from "./components/Survey";
import Result from "./components/Result";
import { LangCode } from "./data/i18n";
import { questions } from "./data/questions";
import { questionsEN } from "./data/questions.en";
import { questionsJA } from "./data/questions.ja";
import { questionsZHHans } from "./data/questions.zh-hans";
import { questionsZHHant } from "./data/questions.zh-hant";
import { questionsES } from "./data/questions.es";
import { questionsFR } from "./data/questions.fr";
import { questionsDE } from "./data/questions.de";
import { questionsAR } from "./data/questions.ar";

type Phase = "lang" | "profile" | "intro" | "survey" | "result";

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

export default function Home() {
  const [phase, setPhase] = useState<Phase>("lang");
  const [lang, setLang] = useState<LangCode>("ko");
  const [profile, setProfile] = useState<Profile>({ nationality: "", birthYear: "", gender: "" });
  const [answers, setAnswers] = useState<number[]>([]);

  function handleLang(l: LangCode) {
    setLang(l);
    setPhase("profile");
  }

  function handleProfile(p: Profile) {
    setProfile(p);
    setPhase("intro");
  }

  function handleComplete(finalAnswers: number[]) {
    setAnswers(finalAnswers);
    setPhase("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restart() {
    setAnswers([]);
    setPhase("lang");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Stars />
      <main className="relative z-10" dir={lang === "ar" ? "rtl" : "ltr"}>
        {phase === "lang"    && <LangSelect onSelect={handleLang} />}
        {phase === "profile" && <ProfileForm lang={lang} onComplete={handleProfile} />}
        {phase === "intro"   && <Intro lang={lang} onStart={() => setPhase("survey")} />}
        {phase === "survey"  && <Survey lang={lang} onComplete={handleComplete} />}
        {phase === "result"  && (
          <Result
            lang={lang}
            profile={profile}
            answers={answers}
            questions={getQuestions(lang)}
            onRestart={restart}
          />
        )}
      </main>
    </>
  );
}

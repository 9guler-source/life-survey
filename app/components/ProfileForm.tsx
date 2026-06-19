"use client";

import { useState } from "react";
import { LangCode, UI, COUNTRIES } from "@/app/data/i18n";

export interface Profile {
  nationality: string;
  birthYear: string;
  gender: string;
}

interface ProfileFormProps {
  lang: LangCode;
  onComplete: (profile: Profile) => void;
}

const MIN_AGE = 25;
const currentYear = new Date().getFullYear();
// 만 25세 이상만 선택 가능 — 매년 자동으로 적용됨
const MAX_BIRTH_YEAR = currentYear - MIN_AGE;
const MIN_BIRTH_YEAR = currentYear - 110;
const YEARS = Array.from(
  { length: MAX_BIRTH_YEAR - MIN_BIRTH_YEAR + 1 },
  (_, i) => MAX_BIRTH_YEAR - i
);

export default function ProfileForm({ lang, onComplete }: ProfileFormProps) {
  const t = UI[lang];
  const countries = COUNTRIES[lang];
  const isRTL = lang === "ar";

  const [profile, setProfile] = useState<Profile>({
    nationality: "",
    birthYear: "",
    gender: "",
  });
  const [showAgeBlock, setShowAgeBlock] = useState(false);

  // 선택한 출생년도로 나이 계산 (만 나이)
  function calcAge(year: string): number {
    return currentYear - parseInt(year);
  }

  function handleBirthYear(year: string) {
    const age = calcAge(year);
    if (age < MIN_AGE) {
      setProfile((p) => ({ ...p, birthYear: year }));
      setShowAgeBlock(true);
    } else {
      setShowAgeBlock(false);
      setProfile((p) => ({ ...p, birthYear: year }));
    }
  }

  function update(key: keyof Profile, value: string) {
    setProfile((p) => ({ ...p, [key]: value }));
  }

  const isAgeValid =
    profile.birthYear !== "" && calcAge(profile.birthYear) >= MIN_AGE;

  const isComplete =
    profile.nationality !== "" &&
    profile.birthYear !== "" &&
    profile.gender !== "" &&
    isAgeValid;

  // ── 나이 제한 안내 화면 ──────────────────────────────────
  if (showAgeBlock) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="text-6xl mb-8">🌱</div>

        <h2
          className="font-serif text-2xl font-bold mb-4"
          style={{ color: "#e8c98a" }}
        >
          {t.ageRestrictionTitle}
        </h2>

        <p
          className="text-base font-medium mb-4 max-w-sm"
          style={{ color: "#e8e4f0" }}
        >
          {t.ageRestrictionMsg}
        </p>

        <p
          className="text-sm leading-relaxed mb-10 max-w-sm whitespace-pre-line"
          style={{ color: "#c8c2d8" }}
        >
          {t.ageRestrictionSub}
        </p>

        {/* 진행 불가 표시 */}
        <div
          className="w-full max-w-xs rounded-2xl p-5 mb-8"
          style={{
            background: "rgba(201,169,110,0.07)",
            border: "1px solid rgba(201,169,110,0.2)",
          }}
        >
          <p className="text-sm" style={{ color: "#c9a96e" }}>
            {lang === "ko" && `선택하신 출생년도 기준 현재 만 ${calcAge(profile.birthYear)}세입니다.`}
            {lang === "en" && `Based on your birth year, you are currently ${calcAge(profile.birthYear)} years old.`}
            {lang === "ja" && `選択された生まれ年によると、現在${calcAge(profile.birthYear)}歳です。`}
            {lang === "zh-hans" && `根据您选择的出生年份，您目前${calcAge(profile.birthYear)}岁。`}
            {lang === "zh-hant" && `根據您選擇的出生年份，您目前${calcAge(profile.birthYear)}歲。`}
            {lang === "es" && `Según el año de nacimiento seleccionado, tienes ${calcAge(profile.birthYear)} años.`}
            {lang === "fr" && `Selon l'année de naissance sélectionnée, vous avez ${calcAge(profile.birthYear)} ans.`}
            {lang === "de" && `Basierend auf dem gewählten Geburtsjahr bist du ${calcAge(profile.birthYear)} Jahre alt.`}
            {lang === "ar" && `بناءً على سنة الميلاد المختارة، عمرك حالياً ${calcAge(profile.birthYear)} عامًا.`}
          </p>
        </div>

        <button
          onClick={() => {
            setShowAgeBlock(false);
            setProfile((p) => ({ ...p, birthYear: "" }));
          }}
          className="px-8 py-3.5 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            background: "transparent",
            border: "1.5px solid rgba(201,169,110,0.5)",
            color: "#c9a96e",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(201,169,110,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
          }}
        >
          {t.ageRestrictionBtn}
        </button>
      </div>
    );
  }

  // ── 일반 프로필 입력 화면 ────────────────────────────────
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 py-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-4xl mb-5">👤</div>
          <h2
            className="font-serif text-2xl font-bold mb-2"
            style={{ color: "#e8c98a" }}
          >
            {t.profileTitle}
          </h2>
          <p className="text-sm" style={{ color: "#c8c2d8" }}>
            {t.profileSubtitle}
          </p>
        </div>

        {/* 국적 */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#e8e4f0" }}
          >
            {t.nationality}
          </label>
          <div className="relative">
            <select
              value={profile.nationality}
              onChange={(e) => update("nationality", e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-sm appearance-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: profile.nationality
                  ? "1.5px solid #c9a96e"
                  : "1.5px solid rgba(255,255,255,0.15)",
                color: profile.nationality ? "#e8e4f0" : "#9b95a8",
              }}
            >
              <option value="" disabled style={{ background: "#2d2440" }}>
                —
              </option>
              {countries.map((c) => (
                <option
                  key={c.value}
                  value={c.value}
                  style={{ background: "#2d2440", color: "#e8e4f0" }}
                >
                  {c.label}
                </option>
              ))}
            </select>
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2"
              style={{ [isRTL ? "left" : "right"]: "14px", color: "#c9a96e" }}
            >
              ▾
            </div>
          </div>
        </div>

        {/* 출생년도 — 만 25세 이상만 표시 */}
        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#e8e4f0" }}
          >
            {t.birthYear}
            <span
              className="ml-2 text-xs font-normal"
              style={{ color: "#c9a96e" }}
            >
              {lang === "ko" && `(만 ${MIN_AGE}세 이상)`}
              {lang === "en" && `(${MIN_AGE}+ years)`}
              {lang === "ja" && `(${MIN_AGE}歳以上)`}
              {lang === "zh-hans" && `(${MIN_AGE}岁以上)`}
              {lang === "zh-hant" && `(${MIN_AGE}歲以上)`}
              {lang === "es" && `(+${MIN_AGE} años)`}
              {lang === "fr" && `(${MIN_AGE} ans et plus)`}
              {lang === "de" && `(ab ${MIN_AGE} Jahren)`}
              {lang === "ar" && `(${MIN_AGE} عامًا فأكثر)`}
            </span>
          </label>
          <div className="relative">
            <select
              value={profile.birthYear}
              onChange={(e) => handleBirthYear(e.target.value)}
              className="w-full rounded-xl px-4 py-3.5 text-sm appearance-none cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: profile.birthYear
                  ? "1.5px solid #c9a96e"
                  : "1.5px solid rgba(255,255,255,0.15)",
                color: profile.birthYear ? "#e8e4f0" : "#9b95a8",
              }}
            >
              <option value="" disabled style={{ background: "#2d2440" }}>
                —
              </option>
              {YEARS.map((y) => (
                <option
                  key={y}
                  value={String(y)}
                  style={{ background: "#2d2440", color: "#e8e4f0" }}
                >
                  {y}
                </option>
              ))}
            </select>
            <div
              className="pointer-events-none absolute top-1/2 -translate-y-1/2"
              style={{ [isRTL ? "left" : "right"]: "14px", color: "#c9a96e" }}
            >
              ▾
            </div>
          </div>
        </div>

        {/* 성별 토글 */}
        <div className="mb-10">
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "#e8e4f0" }}
          >
            {t.gender}
          </label>
          <div className="flex gap-2">
            {t.genderOptions.map((g) => {
              const selected = profile.gender === g.value;
              return (
                <button
                  key={g.value}
                  onClick={() => update("gender", g.value)}
                  className="flex-1 py-3 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{
                    background: selected
                      ? "rgba(201,169,110,0.2)"
                      : "rgba(255,255,255,0.05)",
                    border: selected
                      ? "1.5px solid #c9a96e"
                      : "1.5px solid rgba(255,255,255,0.12)",
                    color: selected ? "#e8c98a" : "#c8c2d8",
                  }}
                >
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={() => isComplete && onComplete(profile)}
          disabled={!isComplete}
          className="w-full py-4 rounded-full text-base font-bold transition-all duration-200"
          style={{
            background: isComplete
              ? "linear-gradient(135deg, #c9a96e, #e8c98a)"
              : "rgba(255,255,255,0.07)",
            color: isComplete ? "#1a1625" : "rgba(255,255,255,0.25)",
            cursor: isComplete ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => {
            if (isComplete)
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform =
              "translateY(0)";
          }}
        >
          {t.startBtn}
        </button>
      </div>
    </div>
  );
}

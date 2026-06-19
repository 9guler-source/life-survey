"use client";

import { useState } from "react";
import { LangCode, UI } from "@/app/data/i18n";
import { Profile } from "./ProfileForm";
import { Question } from "@/app/data/questions";

interface ResultProps {
  lang: LangCode;
  profile: Profile;
  answers: number[];
  questions: Question[];
  onRestart: () => void;
}

const SITE_LABEL: Record<LangCode, string> = {
  ko: "다음은 내가 Ohana portal (https://ohana-portal.vercel.app)에서 'SYS 인생 항해 점검표'에 나와있는 각 문항에 내가 응답한 내역이야. 내가 솔직한 속마음을 드러내어 응답한 내역이니 정성을 들여서 잘 해석해서 나에게 알려줘!",
  en: "Below is my response record for the 'SYS Life Voyage Checklist' on Ohana portal (https://ohana-portal.vercel.app). I answered each question as honestly as I could. Please read it carefully and share a thoughtful interpretation with me.",
  ja: "以下は、Ohana portal（https://ohana-portal.vercel.app）の「SYS人生航海チェックリスト」の各設問に対する私の回答記録です。正直な気持ちで答えました。丁寧に読み解いて、私に伝えてください。",
  "zh-hans": "以下是我在Ohana portal（https://ohana-portal.vercel.app）'SYS人生航海检查表'中各题目的回答记录。我是真诚地表达内心想法作答的，请用心为我解读。",
  "zh-hant": "以下是我在Ohana portal（https://ohana-portal.vercel.app）「SYS人生航海檢查表」中各題目的回答記錄。我是真誠地表達內心想法作答的，請用心為我解讀。",
  es: "A continuación está mi registro de respuestas para la 'Lista de Verificación del Viaje de Vida SYS' en Ohana portal (https://ohana-portal.vercel.app). Respondí cada pregunta con la mayor honestidad posible. Por favor, léelo con atención y compárteme una interpretación reflexiva.",
  fr: "Voici mon dossier de réponses pour la 'Liste de Vérification du Voyage de Vie SYS' sur Ohana portal (https://ohana-portal.vercel.app). J'ai répondu à chaque question aussi honnêtement que possible. Merci de le lire attentivement et de me partager une interprétation réfléchie.",
  de: "Im Folgenden findest du mein Antwortprotokoll für die 'SYS Lebensreise-Checkliste' auf Ohana portal (https://ohana-portal.vercel.app). Ich habe jede Frage so ehrlich wie möglich beantwortet. Bitte lies es aufmerksam und teile mir eine durchdachte Interpretation mit.",
  ar: "فيما يلي سجل إجاباتي على 'قائمة فحص رحلة الحياة SYS' في Ohana portal (https://ohana-portal.vercel.app). أجبت على كل سؤال بأكبر قدر ممكن من الصدق. يرجى قراءته بعناية ومشاركتي بتفسير متأمل.",
};

const ATTACH_LABEL: Record<LangCode, string> = {
  ko: "[첨부 정보]",
  en: "[Attached Information]",
  ja: "[添付情報]",
  "zh-hans": "[附加信息]",
  "zh-hant": "[附加資訊]",
  es: "[Información adjunta]",
  fr: "[Informations jointes]",
  de: "[Beigefügte Informationen]",
  ar: "[معلومات مرفقة]",
};

const FIELD_LABELS: Record<
  LangCode,
  { datetime: string; nationality: string; birthYear: string; gender: string }
> = {
  ko: { datetime: "응답 일시", nationality: "국적", birthYear: "출생년도", gender: "성별" },
  en: { datetime: "Response Date/Time", nationality: "Nationality", birthYear: "Birth Year", gender: "Gender" },
  ja: { datetime: "回答日時", nationality: "国籍", birthYear: "生まれ年", gender: "性別" },
  "zh-hans": { datetime: "回答日期时间", nationality: "国籍", birthYear: "出生年份", gender: "性别" },
  "zh-hant": { datetime: "回答日期時間", nationality: "國籍", birthYear: "出生年份", gender: "性別" },
  es: { datetime: "Fecha y hora de respuesta", nationality: "Nacionalidad", birthYear: "Año de nacimiento", gender: "Género" },
  fr: { datetime: "Date et heure de réponse", nationality: "Nationalité", birthYear: "Année de naissance", gender: "Genre" },
  de: { datetime: "Antwortdatum/-zeit", nationality: "Nationalität", birthYear: "Geburtsjahr", gender: "Geschlecht" },
  ar: { datetime: "تاريخ ووقت الإجابة", nationality: "الجنسية", birthYear: "سنة الميلاد", gender: "الجنس" },
};

const SECTION_LABELS: Record<LangCode, { myAnswers: string; allOptions: string }> = {
  ko: { myAnswers: "[1~40번 문항 — 나의 응답]", allOptions: "[1~40번 문항 — 전체 선택지]" },
  en: { myAnswers: "[Questions 1-40 — My Answers]", allOptions: "[Questions 1-40 — All Options]" },
  ja: { myAnswers: "[第1〜40問 — 私の回答]", allOptions: "[第1〜40問 — 全選択肢]" },
  "zh-hans": { myAnswers: "[第1～40题 — 我的回答]", allOptions: "[第1～40题 — 全部选项]" },
  "zh-hant": { myAnswers: "[第1～40題 — 我的回答]", allOptions: "[第1～40題 — 全部選項]" },
  es: { myAnswers: "[Preguntas 1-40 — Mis Respuestas]", allOptions: "[Preguntas 1-40 — Todas las Opciones]" },
  fr: { myAnswers: "[Questions 1-40 — Mes Réponses]", allOptions: "[Questions 1-40 — Toutes les Options]" },
  de: { myAnswers: "[Fragen 1-40 — Meine Antworten]", allOptions: "[Fragen 1-40 — Alle Optionen]" },
  ar: { myAnswers: "[الأسئلة 1-40 — إجاباتي]", allOptions: "[الأسئلة 1-40 — جميع الخيارات]" },
};

function genderDisplay(gender: string, lang: LangCode): string {
  const map: Record<string, Record<LangCode, string>> = {
    male: { ko: "남성", en: "Male", ja: "男性", "zh-hans": "男性", "zh-hant": "男性", es: "Masculino", fr: "Homme", de: "Männlich", ar: "ذكر" },
    female: { ko: "여성", en: "Female", ja: "女性", "zh-hans": "女性", "zh-hant": "女性", es: "Femenino", fr: "Femme", de: "Weiblich", ar: "أنثى" },
    other: { ko: "기타", en: "Other", ja: "その他", "zh-hans": "其他", "zh-hant": "其他", es: "Otro", fr: "Autre", de: "Divers", ar: "آخر" },
  };
  return map[gender]?.[lang] ?? gender;
}

function buildCertificateText(
  lang: LangCode,
  profile: Profile,
  answers: number[],
  questions: Question[]
): string {
  const now = new Date();
  const datetime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate()
  ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(
    2,
    "0"
  )}`;

  const fields = FIELD_LABELS[lang];
  const sections = SECTION_LABELS[lang];
  const genderText = genderDisplay(profile.gender, lang);
  const header = SITE_LABEL[lang];

  const attachBlock = [
    ATTACH_LABEL[lang],
    `${fields.datetime}: ${datetime}`,
    `${fields.nationality}: ${profile.nationality}`,
    `${fields.birthYear}: ${profile.birthYear}`,
    `${fields.gender}: ${genderText}`,
  ].join("\n");

  const myAnswersBlock = questions
    .map((q, i) => {
      const chosen = q.options[answers[i]];
      return `Q${i + 1}. ${q.text}\n→ ${chosen}`;
    })
    .join("\n\n");

  const allOptionsBlock = questions
    .map((q, i) => {
      const opts = q.options.map((o, idx) => `  ${idx + 1}) ${o}`).join("\n");
      return `Q${i + 1}. ${q.text}\n${opts}`;
    })
    .join("\n\n");

  return [
    header,
    "",
    attachBlock,
    "",
    sections.myAnswers,
    myAnswersBlock,
    "",
    sections.allOptions,
    allOptionsBlock,
  ].join("\n");
}

export default function Result({ lang, profile, answers, questions, onRestart }: ResultProps) {
  const t = UI[lang];
  const isRTL = lang === "ar";
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = buildCertificateText(lang, profile, answers, questions);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
      } catch {
        // ignore — user can select manually
      }
      document.body.removeChild(textarea);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 animate-fadeIn" dir={isRTL ? "rtl" : "ltr"}>
      <div className="text-center mb-10">
        <div className="text-5xl mb-6">📜</div>
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
        className="rounded-3xl p-8 sm:p-10 mb-8"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)" }}
      >
        <p className="font-serif text-lg font-semibold leading-relaxed mb-5" style={{ color: "#f0ece8" }}>
          {t.resultThanks}
        </p>
        <p className="text-base leading-loose whitespace-pre-wrap" style={{ color: "#d4cfdf" }}>
          {t.resultExplain}
        </p>
      </div>

      <button
        onClick={handleCopy}
        className="w-full py-6 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-200 mb-6"
        style={{
          background: copied
            ? "linear-gradient(135deg, #7ba68a, #9bc2a8)"
            : "linear-gradient(135deg, #c9a96e, #e8c98a)",
          color: "#1a1625",
          boxShadow: "0 8px 30px rgba(201,169,110,0.25)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
        }}
      >
        {copied ? t.copyBtnDone : t.copyBtnLabel}
      </button>

      <div
        className="rounded-2xl p-6 sm:p-8 mb-8"
        style={{ background: "rgba(201,169,110,0.06)", border: "1px solid rgba(201,169,110,0.18)" }}
      >
        <p className="text-sm font-semibold mb-4" style={{ color: "#c9a96e" }}>
          {t.copyInstructionTitle}
        </p>
        <ol className="flex flex-col gap-3">
          {t.copyInstructionList.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "rgba(201,169,110,0.2)", color: "#e8c98a" }}
              >
                {i + 1}
              </span>
              <span className="text-sm leading-relaxed" style={{ color: "#d4cfdf" }}>
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <button
        onClick={onRestart}
        className="w-full py-4 rounded-xl text-base transition-all duration-200"
        style={{ background: "transparent", border: "1px solid rgba(201,169,110,0.4)", color: "#c9a96e" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,169,110,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {t.restartBtn}
      </button>
    </div>
  );
}

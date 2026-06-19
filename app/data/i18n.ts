export type LangCode =
  | "ko"
  | "en"
  | "ja"
  | "zh-hans"
  | "zh-hant"
  | "es"
  | "fr"
  | "de"
  | "ar";

export interface LangMeta {
  code: LangCode;
  label: string;       // 해당 언어로 표기
  flag: string;
  dir?: "rtl" | "ltr";
}

export const LANGUAGES: LangMeta[] = [
  { code: "ko",      label: "한국어",    flag: "🇰🇷" },
  { code: "en",      label: "English",   flag: "🇺🇸" },
  { code: "ja",      label: "日本語",    flag: "🇯🇵" },
  { code: "zh-hans", label: "简体中文",  flag: "🇨🇳" },
  { code: "zh-hant", label: "繁體中文",  flag: "🇹🇼" },
  { code: "es",      label: "Español",   flag: "🇪🇸" },
  { code: "fr",      label: "Français",  flag: "🇫🇷" },
  { code: "de",      label: "Deutsch",   flag: "🇩🇪" },
  { code: "ar",      label: "العربية",   flag: "🇸🇦", dir: "rtl" },
];

// ── UI 문자열 번역 ─────────────────────────────────────────
export interface UIStrings {
  // 언어 선택
  selectLanguage: string;
  // 프로필 화면
  profileTitle: string;
  profileSubtitle: string;
  nationality: string;
  birthYear: string;
  gender: string;
  genderOptions: { value: string; label: string }[];
  startBtn: string;
  // 설문
  prev: string;
  next: string;
  finish: string;
  questionOf: (cur: number, total: number) => string;
  // 로딩
  loadingTitle: string;
  loadingDesc: string;
  loadingMsgs: string[];
  // 결과
  resultEyebrow: string;
  resultTitle: string;
  resultSubtitle: string;
  restartBtn: string;
  // 에러
  errorTitle: string;
  retryBtn: string;
  // 나이 제한
  ageRestrictionTitle: string;
  ageRestrictionMsg: string;
  ageRestrictionSub: string;
  ageRestrictionBtn: string;
}

export const UI: Record<LangCode, UIStrings> = {
  ko: {
    selectLanguage: "언어를 선택하세요",
    profileTitle: "잠깐, 당신에 대해 알려주세요",
    profileSubtitle: "더 정확한 해설을 위해 몇 가지 정보가 필요합니다.",
    nationality: "국적",
    birthYear: "출생년도",
    gender: "성별",
    genderOptions: [
      { value: "male",   label: "남성" },
      { value: "female", label: "여성" },
      { value: "other",  label: "기타 / 밝히지 않음" },
    ],
    startBtn: "여정을 시작합니다",
    prev: "← 이전",
    next: "다음 →",
    finish: "완료 — 나의 이야기 보기 ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "당신의 이야기를 읽고 있습니다",
    loadingDesc: "40개의 답변에서 당신만의 지도를 그리는 중...",
    loadingMsgs: [
      "40개의 답변을 깊이 읽고 있습니다...",
      "당신의 과거와 미래를 연결하고 있습니다...",
      "오직 당신만을 위한 이야기를 쓰고 있습니다...",
      "거의 다 됐습니다...",
    ],
    resultEyebrow: "당신만을 위한 이야기",
    resultTitle: "나의 인생 나침반 결과",
    resultSubtitle: "지금까지 살아온 길, 그리고 앞으로의 여정",
    restartBtn: "🔄 처음부터 다시 하기",
    errorTitle: "잠시 문제가 발생했습니다",
    retryBtn: "다시 시작하기",
    ageRestrictionTitle: "참여 연령 제한 안내",
    ageRestrictionMsg: "이 설문은 만 25세 이상만 참여하실 수 있습니다.",
    ageRestrictionSub: "인생의 충분한 경험을 쌓은 분들을 위해 설계된 깊이 있는 설문입니다.\n조금 더 시간이 지난 후, 다시 찾아주세요.",
    ageRestrictionBtn: "← 출생년도 다시 선택하기",
  },

  en: {
    selectLanguage: "Select your language",
    profileTitle: "Tell us a little about you",
    profileSubtitle: "A few details help us personalize your reading.",
    nationality: "Nationality",
    birthYear: "Birth Year",
    gender: "Gender",
    genderOptions: [
      { value: "male",   label: "Male" },
      { value: "female", label: "Female" },
      { value: "other",  label: "Other / Prefer not to say" },
    ],
    startBtn: "Begin the journey",
    prev: "← Back",
    next: "Next →",
    finish: "Finish — See my story ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "Reading your story…",
    loadingDesc: "Drawing your personal map from 40 answers…",
    loadingMsgs: [
      "Reading your 40 answers carefully…",
      "Connecting your past and future…",
      "Writing a story just for you…",
      "Almost there…",
    ],
    resultEyebrow: "Your personal story",
    resultTitle: "My Life Compass — Result",
    resultSubtitle: "The road you've walked, and the journey ahead",
    restartBtn: "🔄 Start over",
    errorTitle: "Something went wrong",
    retryBtn: "Try again",
    ageRestrictionTitle: "Age Requirement",
    ageRestrictionMsg: "This survey is available to participants aged 25 and above.",
    ageRestrictionSub: "This is a deeply reflective survey designed for those who have gathered meaningful life experience.\nPlease come back when the time is right.",
    ageRestrictionBtn: "← Choose a different birth year",
  },

  ja: {
    selectLanguage: "言語を選択してください",
    profileTitle: "あなたについて教えてください",
    profileSubtitle: "より的確な結果のために、いくつかの情報が必要です。",
    nationality: "国籍",
    birthYear: "生まれ年",
    gender: "性別",
    genderOptions: [
      { value: "male",   label: "男性" },
      { value: "female", label: "女性" },
      { value: "other",  label: "その他 / 回答しない" },
    ],
    startBtn: "旅を始めましょう",
    prev: "← 前へ",
    next: "次へ →",
    finish: "完了 — 私の物語を見る ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "あなたの物語を読んでいます",
    loadingDesc: "40の回答からあなただけの地図を描いています…",
    loadingMsgs: [
      "40の回答を丁寧に読んでいます…",
      "あなたの過去と未来をつないでいます…",
      "あなただけのために物語を書いています…",
      "もうすぐです…",
    ],
    resultEyebrow: "あなただけの物語",
    resultTitle: "私の人生コンパス — 結果",
    resultSubtitle: "歩んできた道、そしてこれからの旅へ",
    restartBtn: "🔄 最初からやり直す",
    errorTitle: "問題が発生しました",
    retryBtn: "もう一度始める",
    ageRestrictionTitle: "年齢制限のご案内",
    ageRestrictionMsg: "このアンケートは25歳以上の方のみご参加いただけます。",
    ageRestrictionSub: "人生の豊かな経験を積まれた方のために設計された、深みのあるアンケートです。\nもう少し時間が経ってから、また訪れてください。",
    ageRestrictionBtn: "← 生まれ年を選び直す",
  },

  "zh-hans": {
    selectLanguage: "请选择语言",
    profileTitle: "请告诉我们一些关于您的信息",
    profileSubtitle: "这些信息将帮助我们为您提供更准确的解读。",
    nationality: "国籍",
    birthYear: "出生年份",
    gender: "性别",
    genderOptions: [
      { value: "male",   label: "男性" },
      { value: "female", label: "女性" },
      { value: "other",  label: "其他 / 不愿透露" },
    ],
    startBtn: "开始旅程",
    prev: "← 上一步",
    next: "下一步 →",
    finish: "完成 — 查看我的故事 ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "正在读取您的故事…",
    loadingDesc: "正在从40个回答中绘制您的个人地图…",
    loadingMsgs: [
      "正在仔细阅读您的40个回答…",
      "正在连接您的过去与未来…",
      "正在为您专属撰写故事…",
      "即将完成…",
    ],
    resultEyebrow: "专属于您的故事",
    resultTitle: "我的人生罗盘 — 结果",
    resultSubtitle: "走过的路，以及前方的旅程",
    restartBtn: "🔄 重新开始",
    errorTitle: "出现了问题",
    retryBtn: "重新开始",
    ageRestrictionTitle: "年龄限制说明",
    ageRestrictionMsg: "本问卷仅供25岁及以上人士参与。",
    ageRestrictionSub: "这是一份为积累了丰富人生经验的人士设计的深度问卷。\n请在适当的时候再回来。",
    ageRestrictionBtn: "← 重新选择出生年份",
  },

  "zh-hant": {
    selectLanguage: "請選擇語言",
    profileTitle: "請告訴我們一些關於您的資訊",
    profileSubtitle: "這些資訊將幫助我們為您提供更準確的解讀。",
    nationality: "國籍",
    birthYear: "出生年份",
    gender: "性別",
    genderOptions: [
      { value: "male",   label: "男性" },
      { value: "female", label: "女性" },
      { value: "other",  label: "其他 / 不願透露" },
    ],
    startBtn: "開始旅程",
    prev: "← 上一步",
    next: "下一步 →",
    finish: "完成 — 查看我的故事 ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "正在讀取您的故事…",
    loadingDesc: "正在從40個回答中繪製您的個人地圖…",
    loadingMsgs: [
      "正在仔細閱讀您的40個回答…",
      "正在連結您的過去與未來…",
      "正在為您專屬撰寫故事…",
      "即將完成…",
    ],
    resultEyebrow: "專屬於您的故事",
    resultTitle: "我的人生羅盤 — 結果",
    resultSubtitle: "走過的路，以及前方的旅程",
    restartBtn: "🔄 重新開始",
    errorTitle: "出現了問題",
    retryBtn: "重新開始",
    ageRestrictionTitle: "年齡限制說明",
    ageRestrictionMsg: "本問卷僅供25歲及以上人士參與。",
    ageRestrictionSub: "這是一份為積累了豐富人生經驗的人士設計的深度問卷。\n請在適當的時候再回來。",
    ageRestrictionBtn: "← 重新選擇出生年份",
  },

  es: {
    selectLanguage: "Selecciona tu idioma",
    profileTitle: "Cuéntanos un poco sobre ti",
    profileSubtitle: "Algunos datos nos ayudan a personalizar tu lectura.",
    nationality: "Nacionalidad",
    birthYear: "Año de nacimiento",
    gender: "Género",
    genderOptions: [
      { value: "male",   label: "Masculino" },
      { value: "female", label: "Femenino" },
      { value: "other",  label: "Otro / Prefiero no decir" },
    ],
    startBtn: "Comenzar el viaje",
    prev: "← Atrás",
    next: "Siguiente →",
    finish: "Terminar — Ver mi historia ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "Leyendo tu historia…",
    loadingDesc: "Trazando tu mapa personal desde 40 respuestas…",
    loadingMsgs: [
      "Leyendo tus 40 respuestas con cuidado…",
      "Conectando tu pasado y tu futuro…",
      "Escribiendo una historia solo para ti…",
      "Ya casi terminamos…",
    ],
    resultEyebrow: "Tu historia personal",
    resultTitle: "Mi Brújula de Vida — Resultado",
    resultSubtitle: "El camino recorrido y el viaje por delante",
    restartBtn: "🔄 Volver al inicio",
    errorTitle: "Algo salió mal",
    retryBtn: "Intentar de nuevo",
    ageRestrictionTitle: "Restricción de edad",
    ageRestrictionMsg: "Esta encuesta está disponible solo para personas de 25 años o más.",
    ageRestrictionSub: "Es una encuesta profunda diseñada para quienes han acumulado experiencia de vida significativa.\nVuelve cuando llegue el momento.",
    ageRestrictionBtn: "← Elegir otro año de nacimiento",
  },

  fr: {
    selectLanguage: "Choisissez votre langue",
    profileTitle: "Parlez-nous un peu de vous",
    profileSubtitle: "Quelques informations nous aident à personnaliser votre lecture.",
    nationality: "Nationalité",
    birthYear: "Année de naissance",
    gender: "Genre",
    genderOptions: [
      { value: "male",   label: "Homme" },
      { value: "female", label: "Femme" },
      { value: "other",  label: "Autre / Je préfère ne pas répondre" },
    ],
    startBtn: "Commencer le voyage",
    prev: "← Retour",
    next: "Suivant →",
    finish: "Terminer — Voir mon histoire ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "Nous lisons votre histoire…",
    loadingDesc: "Dessinons votre carte personnelle à partir de 40 réponses…",
    loadingMsgs: [
      "Nous lisons vos 40 réponses attentivement…",
      "Nous relions votre passé et votre avenir…",
      "Nous écrivons une histoire rien que pour vous…",
      "Nous y sommes presque…",
    ],
    resultEyebrow: "Votre histoire personnelle",
    resultTitle: "Ma Boussole de Vie — Résultat",
    resultSubtitle: "Le chemin parcouru et le voyage à venir",
    restartBtn: "🔄 Recommencer",
    errorTitle: "Un problème est survenu",
    retryBtn: "Recommencer",
    ageRestrictionTitle: "Restriction d'âge",
    ageRestrictionMsg: "Ce questionnaire est réservé aux personnes âgées de 25 ans et plus.",
    ageRestrictionSub: "Il s'agit d'un questionnaire approfondi conçu pour ceux qui ont accumulé une expérience de vie significative.\nRevenez quand le moment sera venu.",
    ageRestrictionBtn: "← Choisir une autre année de naissance",
  },

  de: {
    selectLanguage: "Sprache auswählen",
    profileTitle: "Erzähl uns ein bisschen über dich",
    profileSubtitle: "Einige Angaben helfen uns, deine Auswertung zu personalisieren.",
    nationality: "Nationalität",
    birthYear: "Geburtsjahr",
    gender: "Geschlecht",
    genderOptions: [
      { value: "male",   label: "Männlich" },
      { value: "female", label: "Weiblich" },
      { value: "other",  label: "Divers / Keine Angabe" },
    ],
    startBtn: "Die Reise beginnen",
    prev: "← Zurück",
    next: "Weiter →",
    finish: "Fertig — Meine Geschichte sehen ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "Deine Geschichte wird gelesen…",
    loadingDesc: "Deine persönliche Karte aus 40 Antworten wird gezeichnet…",
    loadingMsgs: [
      "40 Antworten werden sorgfältig gelesen…",
      "Deine Vergangenheit und Zukunft werden verbunden…",
      "Eine Geschichte wird nur für dich geschrieben…",
      "Fast fertig…",
    ],
    resultEyebrow: "Deine persönliche Geschichte",
    resultTitle: "Mein Lebenskompass — Ergebnis",
    resultSubtitle: "Der Weg, den du gegangen bist, und die Reise, die vor dir liegt",
    restartBtn: "🔄 Von vorne beginnen",
    errorTitle: "Etwas ist schiefgelaufen",
    retryBtn: "Erneut versuchen",
    ageRestrictionTitle: "Altersbeschränkung",
    ageRestrictionMsg: "Dieser Fragebogen ist nur für Personen ab 25 Jahren zugänglich.",
    ageRestrictionSub: "Es handelt sich um einen tiefgründigen Fragebogen, der für Menschen konzipiert wurde, die bedeutende Lebenserfahrung gesammelt haben.\nKomm wieder, wenn die Zeit gekommen ist.",
    ageRestrictionBtn: "← Geburtsjahr neu wählen",
  },

  ar: {
    selectLanguage: "اختر لغتك",
    profileTitle: "أخبرنا قليلاً عنك",
    profileSubtitle: "بعض المعلومات تساعدنا على تخصيص قراءتك.",
    nationality: "الجنسية",
    birthYear: "سنة الميلاد",
    gender: "الجنس",
    genderOptions: [
      { value: "male",   label: "ذكر" },
      { value: "female", label: "أنثى" },
      { value: "other",  label: "آخر / أفضّل عدم الإفصاح" },
    ],
    startBtn: "ابدأ الرحلة",
    prev: "→ السابق",
    next: "← التالي",
    finish: "إنهاء — رؤية قصتي ✨",
    questionOf: (c, t) => `${c} / ${t}`,
    loadingTitle: "نقرأ قصتك…",
    loadingDesc: "نرسم خريطتك الشخصية من 40 إجابة…",
    loadingMsgs: [
      "نقرأ إجاباتك الـ 40 بعناية…",
      "نربط ماضيك بمستقبلك…",
      "نكتب قصة خاصة بك وحدك…",
      "اكتملت تقريباً…",
    ],
    resultEyebrow: "قصتك الشخصية",
    resultTitle: "بوصلة حياتي — النتيجة",
    resultSubtitle: "الطريق الذي سلكته والرحلة التي تنتظرك",
    restartBtn: "🔄 البدء من جديد",
    errorTitle: "حدث خطأ ما",
    retryBtn: "حاول مرة أخرى",
    ageRestrictionTitle: "اشتراط العمر",
    ageRestrictionMsg: "هذا الاستبيان متاح فقط للأشخاص الذين تبلغ أعمارهم 25 عامًا فأكثر.",
    ageRestrictionSub: "إنه استبيان عميق مصمم لمن راكموا تجارب حياتية ثرية ومعبّرة.\nعُد إلينا حين يحين الوقت المناسب.",
    ageRestrictionBtn: "→ اختر سنة ميلاد مختلفة",
  },
};

// ── 국가 목록 (주요 국가) ────────────────────────────────
export const COUNTRIES: Record<LangCode, { value: string; label: string }[]> = {
  ko: [
    { value: "KR", label: "대한민국" },
    { value: "JP", label: "일본" },
    { value: "CN", label: "중국" },
    { value: "US", label: "미국" },
    { value: "GB", label: "영국" },
    { value: "CA", label: "캐나다" },
    { value: "AU", label: "호주" },
    { value: "DE", label: "독일" },
    { value: "FR", label: "프랑스" },
    { value: "ES", label: "스페인" },
    { value: "BR", label: "브라질" },
    { value: "IN", label: "인도" },
    { value: "VN", label: "베트남" },
    { value: "TH", label: "태국" },
    { value: "SA", label: "사우디아라비아" },
    { value: "OTHER", label: "기타" },
  ],
  en: [
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "KR", label: "South Korea" },
    { value: "JP", label: "Japan" },
    { value: "CN", label: "China" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "ES", label: "Spain" },
    { value: "BR", label: "Brazil" },
    { value: "IN", label: "India" },
    { value: "VN", label: "Vietnam" },
    { value: "TH", label: "Thailand" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "OTHER", label: "Other" },
  ],
  ja: [
    { value: "JP", label: "日本" },
    { value: "KR", label: "韓国" },
    { value: "CN", label: "中国" },
    { value: "US", label: "アメリカ" },
    { value: "GB", label: "イギリス" },
    { value: "CA", label: "カナダ" },
    { value: "AU", label: "オーストラリア" },
    { value: "DE", label: "ドイツ" },
    { value: "FR", label: "フランス" },
    { value: "ES", label: "スペイン" },
    { value: "BR", label: "ブラジル" },
    { value: "IN", label: "インド" },
    { value: "SA", label: "サウジアラビア" },
    { value: "OTHER", label: "その他" },
  ],
  "zh-hans": [
    { value: "CN", label: "中国" },
    { value: "TW", label: "台湾" },
    { value: "HK", label: "香港" },
    { value: "SG", label: "新加坡" },
    { value: "US", label: "美国" },
    { value: "KR", label: "韩国" },
    { value: "JP", label: "日本" },
    { value: "GB", label: "英国" },
    { value: "CA", label: "加拿大" },
    { value: "AU", label: "澳大利亚" },
    { value: "DE", label: "德国" },
    { value: "FR", label: "法国" },
    { value: "OTHER", label: "其他" },
  ],
  "zh-hant": [
    { value: "TW", label: "台灣" },
    { value: "HK", label: "香港" },
    { value: "CN", label: "中國" },
    { value: "SG", label: "新加坡" },
    { value: "US", label: "美國" },
    { value: "KR", label: "韓國" },
    { value: "JP", label: "日本" },
    { value: "GB", label: "英國" },
    { value: "CA", label: "加拿大" },
    { value: "AU", label: "澳大利亞" },
    { value: "OTHER", label: "其他" },
  ],
  es: [
    { value: "ES", label: "España" },
    { value: "MX", label: "México" },
    { value: "AR", label: "Argentina" },
    { value: "CO", label: "Colombia" },
    { value: "CL", label: "Chile" },
    { value: "US", label: "Estados Unidos" },
    { value: "BR", label: "Brasil" },
    { value: "PE", label: "Perú" },
    { value: "VE", label: "Venezuela" },
    { value: "OTHER", label: "Otro" },
  ],
  fr: [
    { value: "FR", label: "France" },
    { value: "BE", label: "Belgique" },
    { value: "CH", label: "Suisse" },
    { value: "CA", label: "Canada" },
    { value: "MA", label: "Maroc" },
    { value: "SN", label: "Sénégal" },
    { value: "US", label: "États-Unis" },
    { value: "DE", label: "Allemagne" },
    { value: "OTHER", label: "Autre" },
  ],
  de: [
    { value: "DE", label: "Deutschland" },
    { value: "AT", label: "Österreich" },
    { value: "CH", label: "Schweiz" },
    { value: "US", label: "USA" },
    { value: "GB", label: "Großbritannien" },
    { value: "FR", label: "Frankreich" },
    { value: "OTHER", label: "Sonstiges" },
  ],
  ar: [
    { value: "SA", label: "المملكة العربية السعودية" },
    { value: "EG", label: "مصر" },
    { value: "AE", label: "الإمارات العربية المتحدة" },
    { value: "KW", label: "الكويت" },
    { value: "QA", label: "قطر" },
    { value: "JO", label: "الأردن" },
    { value: "LB", label: "لبنان" },
    { value: "MA", label: "المغرب" },
    { value: "IQ", label: "العراق" },
    { value: "OTHER", label: "أخرى" },
  ],
};

// ── 설문 다국어 번역 ─────────────────────────────────────
// 각 언어별 questions 번역 (part, section, text, options)
// 분량상 영어와 일본어만 포함 — 나머지는 한국어 fallback 사용
// (실제 서비스에서는 전체 번역 추가)

export interface TranslatedQuestion {
  part: string;
  section: string;
  text: string;
  options: string[];
}

// 영어 번역
export const questionsEN: TranslatedQuestion[] = [
  { part:"Part 1 · My Roots", section:"A. The Origin of My Being", text:"How well do you feel you know yourself?", options:["I know exactly who I am","I mostly know, but there are still parts undiscovered","Sometimes I feel like a stranger to myself","I'm still searching for my true self"] },
  { part:"Part 1 · My Roots", section:"A. The Origin of My Being", text:"How do you feel right now about your body, appearance, and personality?", options:["I love myself just as I am","I mostly accept myself, but sometimes feel regret","I tell myself it doesn't matter, but I do care","I feel like a lifelong roommate with a stranger — myself"] },
  { part:"Part 1 · My Roots", section:"A. The Origin of My Being", text:"If your life were a book, what would the title be so far?", options:["\"A Lucky Narrative\" — mostly smooth and grateful","\"Breaking Through Adversity\" — hardships overcome","\"Unfinished Beauty\" — a messy, growing story","\"Still at the Starting Line\" — feels like I haven't begun"] },
  { part:"Part 1 · My Roots", section:"A. The Origin of My Being", text:"What is the most precious 'inheritance' you received from your family?", options:["Material comfort or environment","Values like warmth or diligence","Resilience to endure hardship","A special talent or disposition","The resolve to live differently from them","Gratitude is still outweighed by resentment"] },
  { part:"Part 1 · My Roots", section:"B. The Soil of Life — Environment & Relationships", text:"When you look back at the environment you grew up in:", options:["I'm certain I grew up in a blessed environment","It was imperfect, but it was the soil that shaped me","It was lacking, but that made me stronger","I grew in wounded soil, but now I want to cultivate it"] },
  { part:"Part 1 · My Roots", section:"B. The Soil of Life — Environment & Relationships", text:"What has been the 'pillar' that sustained you in life?", options:["Family love","True friendship","A mentor's guidance","Religion or faith","Art, music, books","My own will and perseverance","A special person (partner, spouse)","Only myself"] },
  { part:"Part 1 · My Roots", section:"B. The Soil of Life — Environment & Relationships", text:"What insight have you gained about 'relationships'?", options:["People are only complete within relationships","A few deep relationships beat many shallow ones","Relationships are beautiful but also a source of wounds","I'm still learning what true relationships are","Being alone is actually more comfortable and free"] },
  { part:"Part 1 · My Roots", section:"B. The Soil of Life — Environment & Relationships", text:"If your childhood self saw you today, what would they say?", options:["\"You grew up to be amazing!\"","\"I might be a little disappointed...\"","\"It's okay, live the way you want\"","\"Sorry, I couldn't protect your dreams\"","\"Come quickly, I miss you\""] },
  { part:"Part 1 · My Roots", section:"C. The Weight of Life — Regret & Pain", text:"What is your greatest 'regret' in life so far?", options:["Words unsaid to loved ones, irreversible wounds","Missed opportunities, roads not taken","Time spent living for others' expectations","Challenges I was too afraid to start","No regrets — every moment was part of my journey"] },
  { part:"Part 1 · My Roots", section:"C. The Weight of Life — Regret & Pain", text:"When was the darkest 'tunnel' in your life?", options:["The death or loss of someone","A health crisis or physical pain","Financial ruin or unemployment","Mental crisis or depression","Betrayal or deep disappointment","I'm still passing through that tunnel"] },
  { part:"Part 1 · My Roots", section:"C. The Weight of Life — Regret & Pain", text:"What did you discover while passing through that tunnel?", options:["I am stronger than I thought","I also need to know how to receive help","Pain makes me deeper","The world is worth living in","I haven't discovered anything yet"] },
  { part:"Part 1 · My Roots", section:"C. The Weight of Life — Regret & Pain", text:"If you could go back to that hard moment, what one thing would you say to yourself?", options:["\"This pain will one day make you shine\"","\"It's okay, it wasn't your fault\"","\"You can cry, it's okay to be weak\"","\"Just holding on is enough\"","\"I'm sorry I couldn't be by your side\""] },
  { part:"Part 1 · My Roots", section:"D. The Light of Life — Happiness & Gratitude", text:"When was your happiest moment in life so far?", options:["An ordinary day with someone I love","The thrill of achieving a long-held dream","Being genuinely thanked after helping someone","Peace felt alone in nature","A moment when I was accepted just as I am","I haven't experienced that moment yet"] },
  { part:"Part 1 · My Roots", section:"D. The Light of Life — Happiness & Gratitude", text:"Where did that happiness mainly come from?", options:["'Having' — when I got what I wanted","'Giving' — when I gave to someone","'Togetherness' — when I connected with someone","'Understanding' — when I grasped something","'Being' — simply feeling alive in this moment"] },
  { part:"Part 1 · My Roots", section:"D. The Light of Life — Happiness & Gratitude", text:"What is a 'small miracle' in your life?", options:["Opening my eyes every morning","The breathing of someone I love","The scenery of changing seasons","An unexpected act of kindness","The existence of one person who believes in me","I don't believe in miracles"] },
  { part:"Part 1 · My Roots", section:"D. The Light of Life — Happiness & Gratitude", text:"Right now, if you name 3 things you're 'grateful for':", options:["A healthy body and mind","The people around me","Experiences and lessons so far","The ordinary routine of each day","The possibility of tomorrow not yet over","A reality where I have no room for gratitude"] },
  { part:"Part 1 · My Roots", section:"E. The Meaning of Life — What Have I Lived For", text:"Where do you mainly find the 'meaning' of life?", options:["In love and relationships","In achievement and reaching goals","In helping others and changing the world","In personal growth and insight","Life itself is meaning; the search for it is the meaning","I haven't found meaning yet"] },
  { part:"Part 1 · My Roots", section:"E. The Meaning of Life — What Have I Lived For", text:"What is the best thing you've done in life so far?", options:["Changed someone's life","Never gave up in difficult times","Made a courageous choice for myself","Protected someone I love","Spread a little kindness in the world","Nothing I'd call my 'best thing' yet"] },
  { part:"Part 1 · My Roots", section:"E. The Meaning of Life — What Have I Lived For", text:"In one sentence, how would you define your life?", options:["\"A life of receiving and giving love\"","\"A journey of endless questions and answers\"","\"A tree hardened by falling and rising\"","\"An unfinished story still being written\"","\"An ordinary masterpiece of regret and achievement\"","\"Still searching for my own definition\""] },
  { part:"Part 1 · My Roots", section:"E. The Meaning of Life — What Have I Lived For", text:"If you scored your life so far? (100 = 'a life lived authentically as me')", options:["90-100: I am proud of myself","70-89: Mostly satisfied, with some regret","50-69: Half success, half failure","30-49: Much lacking, but not over yet","0-29: I have been a bystander in my own life"] },
  { part:"Part 2 · My Tree", section:"A. Blueprint of My Being", text:"In the rest of your life, what kind of person do you want to become?", options:["Someone who can give deeper love","Someone who becomes a small light in the world","Someone who fully loves themselves","Someone who achieves their dreams","Someone ordinary but without regret","Someone who keeps being exactly who I am now"] },
  { part:"Part 2 · My Tree", section:"A. Blueprint of My Being", text:"What will you value most going forward?", options:["Health and well-being","Time with family","True friendship and relationships","Financial stability and freedom","Work, achievement, and recognition","Spiritual growth and insight","Art and beauty","Service and giving to others","Freedom and adventure"] },
  { part:"Part 2 · My Tree", section:"A. Blueprint of My Being", text:"If only one year of life remained, what would you do right now?", options:["Spend every day with those I love","Leave to fulfill postponed dreams","Create something to leave for the world","Live as usual — right now is already beautiful enough","Do everything I want without fear"] },
  { part:"Part 2 · My Tree", section:"A. Blueprint of My Being", text:"How do you want to redefine 'success'?", options:["Not what others envy, but a life I can sleep peacefully with","Not money, but the number of people who love me","Not titles, but the warmth I leave in the world","Not age, but a life of learning and growing daily","I'm not ready to redefine success yet"] },
  { part:"Part 2 · My Tree", section:"B. The Future of Relationships — Love & Connection", text:"What words do you most want to hear from someone in the future?", options:["\"My life changed because of you\"","\"Thank you for believing in me\"","\"I love you, you are everything to me\"","\"Well done, I'm proud of you\"","\"It's okay, you are enough just as you are\""] },
  { part:"Part 2 · My Tree", section:"B. The Future of Relationships — Love & Connection", text:"What do you want to do best going forward?", options:["Tell the people I love 'I love you' every day","Not hurt others even when I'm angry","Make time together instead of using busyness as an excuse","Apologize first and forgive first","Love myself as much as I love others"] },
  { part:"Part 2 · My Tree", section:"B. The Future of Relationships — Love & Connection", text:"If you could write a letter to only one person after leaving this world, who would it be?", options:["The parents who gave birth to me","My spouse or partner","My child","A teacher who guided me","A friend who understood me","My future self"] },
  { part:"Part 2 · My Tree", section:"B. The Future of Relationships — Love & Connection", text:"How do you want to prepare for 'farewell'?", options:["I want to leave after telling loved ones everything","I want to leave quietly, without anyone knowing","I want to leave surrounded by the things I love","I'm not at an age to think about farewell yet","I think every day is practice for farewell"] },
  { part:"Part 2 · My Tree", section:"C. Commitment to Action — Starting Today", text:"What do you want to start 'right now'?", options:["Small habits to care for my body (exercise, diet, sleep)","Reaching out to someone I've been putting off","Taking the first step toward something I've wanted to do","Reconciliation and forgiveness — with myself or others","Writing a daily gratitude journal","I won't start anything — I'm fine as I am"] },
  { part:"Part 2 · My Tree", section:"C. Commitment to Action — Starting Today", text:"What will you 'never give up' going forward?", options:["The love for myself","Dreams and hope","Connection with people","Learning and growth","Justice and conscience","I haven't found it yet"] },
  { part:"Part 2 · My Tree", section:"C. Commitment to Action — Starting Today", text:"To you, what is 'courage'?", options:["Not the absence of fear, but moving forward despite it","Choosing a path different from others","Showing weakness and asking for help","Saying 'I love you'","Simply living through today itself"] },
  { part:"Part 2 · My Tree", section:"C. Commitment to Action — Starting Today", text:"What 'choice today' will your self 10 years from now thank you for?", options:["A small change started for health","The courage to restore a difficult relationship","One step toward a dream","One 'no' for myself","One 'yes, let's do it together' for someone"] },
  { part:"Part 2 · My Tree", section:"D. Facing Death — A Well-Dying Perspective", text:"How do you see death?", options:["A natural period and a new beginning","A shadow that makes life more precious","Still something fearful I want to avoid","Not a meaningless end, but the final chapter completing life","I've never thought about it"] },
  { part:"Part 2 · My Tree", section:"D. Facing Death — A Well-Dying Perspective", text:"In the last moment before death, what do you think you'll regret most?", options:["Time not spent with loved ones","Connections that passed without saying what I felt","A life lived without doing what I wanted","A life too conscious of others' eyes","Leaving nothing behind in the world","No regrets — I lived every day to the fullest"] },
  { part:"Part 2 · My Tree", section:"D. Facing Death — A Well-Dying Perspective", text:"What 'legacy' do you want to leave the world?", options:["Memories of love — warmth left in someone's heart","Traces of creation — writing, art, or something made","Seeds of teaching — growth of those I taught","Ripples of change — making the world a little better","Nothing is fine — existing itself was enough"] },
  { part:"Part 2 · My Tree", section:"D. Facing Death — A Well-Dying Perspective", text:"Are you ready to 'die well' right now?", options:["Yes, I am satisfied with my life and can leave","Mostly satisfied, but there are things I still want to do","Not ready yet — I want to live longer","Death is not something to prepare for, but to live toward"] },
  { part:"Part 2 · My Tree", section:"E. The Final Questions — To You", text:"Is there something you realized 'for the first time' through this survey?", options:["I am a person with more than I thought","I can still love and I deserve to be loved","I had forgotten how important this moment is","I am still the protagonist of my own life","No special realization — and that's okay too"] },
  { part:"Part 2 · My Tree", section:"E. The Final Questions — To You", text:"If this survey becomes a small turning point, what will you do 'right now'?", options:["One contact — after a long time, or for the first time","One word of apology — or forgiveness","One step of beginning — even if small","One pause — remembering it's okay to rest","One line of writing — for today's self"] },
  { part:"Part 2 · My Tree", section:"E. The Final Questions — To You", text:"To you, what is 'life'?", options:["A precious, once-in-a-lifetime gift","A journey of endless questions and answers","An opportunity to give and receive love","An art where pain and joy intersect","It has no meaning, but I give it meaning","I don't know yet — and that's why I live"] },
  { part:"Part 2 · My Tree", section:"E. The Final Questions — To You", text:"If you could close this life and be born again into this world, would you want to be reborn?", options:["I want to be reborn","I don't want to be reborn","I'll think about it slowly after I die"] },
];

// 일본어 번역 (주요 문항만 — 나머지는 한국어 표시)
export const questionsJA: TranslatedQuestion[] = [
  { part:"第1部 · 私の根", section:"A. 私という存在の起源", text:"あなたは「自分」という存在をどれくらいよく知っていると感じますか？", options:["自分が誰であるかは確かにわかっている","大体はわかっているが、まだ発見していない部分もある","時々自分が見知らぬ人のように感じることがある","まだ「本当の自分」を探している途中だ"] },
  { part:"第1部 · 私の根", section:"A. 私という存在の起源", text:"生まれつきの体・容貌・性格について、今この瞬間どんな気持ちですか？", options:["ありのままの自分を愛している","大体は受け入れているが、時々惜しく思う","大切ではないと思うが、正直気になる","自分とは一生同居しなければならない「見知らぬルームメイト」のような気分だ"] },
  { part:"第1部 · 私の根", section:"A. 私という存在の起源", text:"もし人生を一冊の本として書くなら、これまでのタイトルは？", options:["「幸運者の叙事詩」— 概ね順調で感謝な物語","「逆境を突き破って」— 苦難があったが乗り越えた物語","「未完成の美しさ」— まだ終わっていない、混乱と成長の物語","「まだスタートラインに立っている」— 始まった気がしない"] },
  { part:"第1部 · 私の根", section:"A. 私という存在の起源", text:"ご両親・家族から受け継いだもので、最も感謝している「遺産」は何ですか？", options:["物質的な豊かさや環境","温かさや誠実さといった価値観","困難でも耐え抜く強さ","特別な才能や気質","むしろ「彼らとは違う生き方をしよう」という決意","まだ感謝より恨みの方が大きい"] },
  { part:"第1部 · 私の根", section:"B. 人生の土壌 — 環境と関係", text:"育った環境（家族・国・友人・教育・自然）を振り返ると：", options:["恵まれた環境で育ったと確信している","不完全だったが、私を作ってくれた大切な土壌だった","かなり不足していたが、それがかえって私を強くした","傷ついた土地で育ったが、今はその土地を耕したい"] },
  { part:"第1部 · 私の根", section:"B. 人生の土壌 — 環境と関係", text:"これまでの人生で「自分を支えてくれた柱」は何でしたか？", options:["家族の愛","本当の友人たちの友情","師匠やメンターの教え","宗教や信仰","芸術・音楽・本などの精神的糧","自分自身の意志と粘り強さ","特別な人（恋人・配偶者）の存在","ただ一人、自分だけだった"] },
  { part:"第1部 · 私の根", section:"B. 人生の土壌 — 環境と関係", text:"「関係」についてどんな気づきを得ましたか？", options:["人は関係の中で初めて完成される","深い関係数個が、多くの浅い関係に勝る","関係は美しいが、傷の源でもある","まだ本当の関係を学んでいる途中だ","一人でいる方がむしろ楽で自由だ"] },
  { part:"第1部 · 私の根", section:"B. 人生の土壌 — 環境と関係", text:"幼い頃の「自分」が今のあなたを見たら、何と言うでしょうか？", options:["「こんなに大きくなってかっこいい！」","「少し失望するかもしれない...」","「いいよ、自分の思う通りに生きて」","「ごめんね、あなたの夢を守れなくて」","「早く来て、あなたに会いたい」"] },
  { part:"第1部 · 私の根", section:"C. 人生の重さ — 後悔と痛み", text:"これまで生きてきて最大の「後悔」は何ですか？", options:["愛する人に言えなかった言葉、取り返しのつかない傷","逃した機会、行かなかった道への未練","自分のためではなく他人の期待だけのために生きた時間","怖くて始められなかった挑戦","後悔はない。すべての瞬間が自分のための旅だった"] },
  { part:"第1部 · 私の根", section:"C. 人生の重さ — 後悔と痛み", text:"人生で最も「暗いトンネル」はいつでしたか？", options:["誰かの死や別れ","健康の危機や身体的な苦痛","経済的な破綻や失業","精神的パニックやうつ","裏切りや深い失望","まだそのトンネルを通っている最中だ"] },
  { part:"第1部 · 私の根", section:"C. 人生の重さ — 後悔と痛み", text:"そのトンネルを通り抜けながら、何を発見しましたか？", options:["私は思ったより強い人間だ","私も助けを受けることを知る必要がある","苦痛は私をより深みのある人にする","世界は生きる価値がある","まだ発見できていない"] },
  { part:"第1部 · 私の根", section:"C. 人生の重さ — 後悔と痛み", text:"過去の辛い瞬間に戻れるなら、あの頃の「自分」に一言かけるとしたら？", options:["「この痛みはいつかあなたを輝かせるよ」","「大丈夫、あなたが悪いわけじゃない」","「泣いてもいい、弱くていい」","「ただ耐えるだけで十分だよ」","「ごめんね、そばにいてあげられなくて」"] },
  { part:"第1部 · 私の根", section:"D. 人生の光 — 幸福と感謝", text:"これまで生きてきて最も「幸せだった瞬間」はいつですか？", options:["愛する人と共にした平凡な日常","長年の夢を叶えた瞬間の快感","誰かを助けて心から感謝された時","一人で自然の中で感じた平和","ありのままの自分を受け入れてもらえた瞬間","まだその瞬間を経験したことがない"] },
  { part:"第1部 · 私の根", section:"D. 人生の光 — 幸福と感謝", text:"その幸せは主にどこから来ましたか？", options:["「持つこと」から — 欲しいものを得た時","「与えること」から — 誰かに与えた時","「共にいること」から — 誰かとつながった時","「気づき」から — 何かを理解した時","「在ること」から — ただ今この瞬間に生きていると感じる時"] },
  { part:"第1部 · 私の根", section:"D. 人生の光 — 幸福と感謝", text:"あなたの人生における「小さな奇跡」は何ですか？", options:["毎朝目が覚めること","愛する人の寝息","季節が変わる風景","予期せぬ親切","自分を信じてくれる一人の人の存在","奇跡は信じない"] },
  { part:"第1部 · 私の根", section:"D. 人生の光 — 幸福と感謝", text:"今この瞬間、「感謝していること」を3つ挙げるとしたら？", options:["健康な体と心","そばにいる人たち","これまでの経験と学び","日々の平凡な日常","まだ終わっていない明日の可能性","感謝する余裕すらない現実"] },
  { part:"第1部 · 私の根", section:"E. 人生の意味 — 何のために生きてきたか", text:"あなたにとって人生の「意味」は主にどこから見つかりますか？", options:["愛と関係の中で","成就と目標達成の中で","他者を助け世界を変えることで","自分自身の成長と気づきで","人生そのものが意味であり、意味を探すことが意味だ","まだ意味を見つけられていない"] },
  { part:"第1部 · 私の根", section:"E. 人生の意味 — 何のために生きてきたか", text:"これまで生きてきて最も「よくやったこと」は何ですか？", options:["誰かの人生を変えたこと","困難の中でも諦めなかったこと","自分のために勇気を出して選択したこと","愛する人を守ったこと","世界に小さな善を施したこと","まだ「よくやったこと」と呼べるものがない"] },
  { part:"第1部 · 私の根", section:"E. 人生の意味 — 何のために生きてきたか", text:"あなたの人生を一文で定義するなら？", options:["「愛を受け、愛を与えて生きた人生」","「絶えず問い、答えを探す旅」","「転んでは起きて強くなった木」","「まだ書かれている、未完成の叙事詩」","「後悔と成就が交差する平凡な傑作」","「自分だけの定義を探している最中」"] },
  { part:"第1部 · 私の根", section:"E. 人生の意味 — 何のために生きてきたか", text:"これまでの人生を「点数」で表すなら？（100点＝「自分らしく生きた人生」）", options:["90-100点：自分を誇りに思う","70-89点：概ね満足だが惜しい部分もある","50-69点：半分は成功、半分は失敗の連続だった","30-49点：かなり不足しているが、まだ終わっていない","0-29点：私は自分の人生の傍観者だった"] },
  { part:"第2部 · 私の木", section:"A. 私という存在の設計図", text:"残りの人生で、どんな「自分」になりたいですか？", options:["より深い愛を与えられる人","世界に小さな光となる人","自分自身を完全に愛せる人","夢を叶える人","平凡だが後悔のない人","今の自分そのままを守る人"] },
  { part:"第2部 · 私の木", section:"A. 私という存在の設計図", text:"これから最も「大切にすること」は何ですか？", options:["健康とウェルビーイング","家族との時間","本当の友情と関係","経済的な安定と自由","仕事と成就、名誉","精神的な成長と気づき","芸術と美しさ","他者への奉仕と分かち合い","自由と冒険"] },
  { part:"第2部 · 私の木", section:"A. 私という存在の設計図", text:"もし人生があと1年しかないなら、今すぐ何をしますか？", options:["愛する人たちと毎日を過ごす","先延ばしにしていた夢を叶えるために旅立つ","世界に残せる何かを作る","いつも通りに生きる — 今がすでに十分に美しい","恐れなく、やりたいことを全てする"] },
  { part:"第2部 · 私の木", section:"A. 私という存在の設計図", text:"「成功」をどう再定義したいですか？", options:["他者が羨むものではなく、夜安らかに眠れる人生","お金ではなく、愛してくれる人の数","肩書きではなく、世界に残した温もり","年齢ではなく、毎日学び成長する人生","まだ成功を再定義する準備ができていない"] },
  { part:"第2部 · 私の木", section:"B. 関係の未来 — 愛とつながり", text:"これから誰かに最も「聞きたい言葉」は何ですか？", options:["「あなたがいて、私の人生が変わった」","「ありがとう、あなたが私を信じてくれたから」","「愛してる、あなたが私の全てだよ」","「よくやった、あなたが誇らしい」","「大丈夫、あなたのままで十分だよ」"] },
  { part:"第2部 · 私の木", section:"B. 関係の未来 — 愛とつながり", text:"これから最も「上手にやりたいこと」は何ですか？", options:["愛する人に毎日「愛してる」と言うこと","怒っても傷つけないこと","忙しいという言い訳の代わりに共に過ごす時間を作ること","先に謝り、先に許すこと","相手を愛するように自分も自分を愛すること"] },
  { part:"第2部 · 私の木", section:"B. 関係の未来 — 愛とつながり", text:"もしこの世を去った後、一人にだけ手紙が書けるなら、誰に？", options:["産んでくれた両親","共に歩んだ配偶者・恋人","自分が生んだ子供","教えてくれた師","理解してくれた友","未来の自分"] },
  { part:"第2部 · 私の木", section:"B. 関係の未来 — 愛とつながり", text:"「別れ」についてどう準備したいですか？", options:["愛する人に全てを伝えて去りたい","静かに、誰にも知られずに去りたい","愛したものに囲まれて去りたい","まだ別れを考える年齢ではない","毎日が別れの練習だと思っている"] },
  { part:"第2部 · 私の木", section:"C. 実践の誓い — 今日から始める", text:"「今すぐ」始めたいことは何ですか？", options:["体を大切にする小さな習慣（運動・食事・睡眠）","先延ばしにしていた人に連絡する","やりたかったことの第一歩を踏み出す","和解と許し — 自分自身または他者との","毎日感謝日記を書く","何も始めない — 今のままで良い"] },
  { part:"第2部 · 私の木", section:"C. 実践の誓い — 今日から始める", text:"これから「絶対に諦めないこと」は何ですか？", options:["自分を愛する心","夢と希望","人とのつながり","学びと成長","正義と良心","まだ見つかっていない"] },
  { part:"第2部 · 私の木", section:"C. 実践の誓い — 今日から始める", text:"あなたにとって「勇気」とは何ですか？", options:["恐れがないことではなく、恐れながらも進むこと","他者と違う道を選ぶこと","弱さをさらけ出し助けを求めること","「愛してる」と言うこと","今日も生きていること自体"] },
  { part:"第2部 · 私の木", section:"C. 実践の誓い — 今日から始める", text:"10年後の自分が今のあなたに感謝するかもしれない「今日の選択」は？", options:["健康のために始めた小さな変化","難しい関係を修復した勇気","夢への一歩","自分のための一度の「ノー」","誰かのための一度の「はい、一緒にやりましょう」"] },
  { part:"第2部 · 私の木", section:"D. 死と向き合う — ウェルダイイングの視点", text:"あなたは死をどう見ていますか？", options:["自然な終止符であり新たな始まり","人生をより大切にさせてくれる影","まだ怖くて避けたい存在","意味のない終わりではなく、人生を完成させる最終章","考えたことがない"] },
  { part:"第2部 · 私の木", section:"D. 死と向き合う — ウェルダイイングの視点", text:"死の直前、最も後悔しそうなことは？", options:["愛する人と共に過ごせなかった時間","気持ちを伝えられないまま過ぎた縁","したいことができないまま生きた人生","自分のためではなく他者の目だけを意識した人生","世界に何も残せなかったこと","後悔はないだろう — 毎日を精一杯生きたから"] },
  { part:"第2部 · 私の木", section:"D. 死と向き合う — ウェルダイイングの視点", text:"世界に残したい「遺産」は何ですか？", options:["愛の記憶 — 誰かの心に残った温もり","創造の跡 — 文章・芸術・作ったもの","教えの種 — 教えた人たちの成長","変化の波紋 — 世界を少しより良くしたこと","何も残さなくていい — 生きていたことで十分"] },
  { part:"第2部 · 私の木", section:"D. 死と向き合う — ウェルダイイングの視点", text:"今「よく死ぬ準備」ができていますか？", options:["はい、人生に満足して旅立てる","概ね満足だが、まだやりたいことがある","まだ準備できていない — もっと生きたい","死は準備するものではなく、生きていくものだと思う"] },
  { part:"第2部 · 私の木", section:"E. 最後の質問 — あなたへ", text:"このアンケートを通じて「初めて」気づいたことがあるとすれば？", options:["私は思ったより多くのものを持った人だ","私はまだ愛することができるし、愛される価値がある","私は今この瞬間が大切だということを忘れて生きていた","私はまだ自分の人生の主人公だ","特別な気づきはなかった — それも大丈夫だ"] },
  { part:"第2部 · 私の木", section:"E. 最後の質問 — あなたへ", text:"このアンケートが小さな転換点になるとしたら、「今すぐ」何を行動に移しますか？", options:["連絡一つ — 久しぶりに、あるいは初めて","謝罪の一言 — あるいは許しの一言","始まりの一歩 — 小さくていい","一度の休憩 — 休んでもいいということを","記録の一行 — 今日の自分のために"] },
  { part:"第2部 · 私の木", section:"E. 最後の質問 — あなたへ", text:"あなたにとって「人生」とは何ですか？", options:["一度きりの、大切な贈り物","終わりなき問いと答えを探す旅","愛を与え合う機会","苦痛と喜びが交差する芸術","意味はないが、私が意味を与えるもの","まだわからない — だから生きている"] },
  { part:"第2部 · 私の木", section:"E. 最後の質問 — あなたへ", text:"この人生を終えて再びこの世に生まれることができるなら、また生まれたいですか？", options:["また生まれたい","また生まれたくない","死んでからゆっくり考えます"] },
];

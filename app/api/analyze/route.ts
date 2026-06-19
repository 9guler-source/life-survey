import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { questions } from "@/app/data/questions";
import { questionsEN } from "@/app/data/questions.en";
import { questionsJA } from "@/app/data/questions.ja";
import { questionsZHHans } from "@/app/data/questions.zh-hans";
import { questionsZHHant } from "@/app/data/questions.zh-hant";
import { questionsES } from "@/app/data/questions.es";
import { questionsFR } from "@/app/data/questions.fr";
import { questionsDE } from "@/app/data/questions.de";
import { questionsAR } from "@/app/data/questions.ar";
import { LangCode } from "@/app/data/i18n";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function getQuestions(lang: LangCode) {
  switch (lang) {
    case "en": return questionsEN;
    case "ja": return questionsJA;
    case "zh-hans": return questionsZHHans;
    case "zh-hant": return questionsZHHant;
    case "es": return questionsES;
    case "fr": return questionsFR;
    case "de": return questionsDE;
    case "ar": return questionsAR;
    default: return questions;
  }
}

function getGenderLabel(gender: string, lang: LangCode): string {
  const map: Record<string, Record<string, string>> = {
    male:   { ko:"남성", en:"Male", ja:"男性", "zh-hans":"男性", "zh-hant":"男性", es:"Masculino", fr:"Homme", de:"Männlich", ar:"ذكر" },
    female: { ko:"여성", en:"Female", ja:"女性", "zh-hans":"女性", "zh-hant":"女性", es:"Femenino", fr:"Femme", de:"Weiblich", ar:"أنثى" },
    other:  { ko:"기타", en:"Other", ja:"その他", "zh-hans":"其他", "zh-hant":"其他", es:"Otro", fr:"Autre", de:"Divers", ar:"آخر" },
  };
  return map[gender]?.[lang] ?? gender;
}

export async function POST(req: NextRequest) {
  try {
    const { answers, lang, nationality, birthYear, gender } = await req.json();
    const qs = getQuestions(lang as LangCode);

    if (!Array.isArray(answers) || answers.length !== qs.length) {
      return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
    }

    const age = new Date().getFullYear() - parseInt(birthYear);
    const genderLabel = getGenderLabel(gender, lang as LangCode);

    const summary = qs
      .map((q, i) => `Q${i + 1} [${q.section}]\n${q.text}\n→ ${q.options[answers[i]]}`)
      .join("\n\n");

    const promptMap: Record<string, string> = {
      ko: `당신은 따뜻하고 깊이 있는 인생 상담사이자 작가입니다.
아래는 ${nationality} 국적의 ${age}세 ${genderLabel}이(가) '나의 인생 나침반' 설문에 응답한 40개의 답변입니다.
이 사람의 나이, 성별, 국적과 문화적 배경을 충분히 고려하여 오직 이 사람만을 위한 개인화된 인생 해설을 한국어로 써주세요.

[응답자 정보]
국적: ${nationality} | 나이: ${age}세 | 성별: ${genderLabel}

[설문 응답]
${summary}

[작성 지침]
1. 응답자에게 직접 말을 걸듯이 2인칭('당신')으로 작성하세요.
2. 과거(지나온 길), 현재(지금 이 순간), 미래(앞으로의 여정) 세 흐름으로 구성하세요.
3. 구체적인 답변 내용을 녹여 개인화된 해설을 작성하세요.
4. 응답자의 나이와 문화적 배경을 자연스럽게 반영하세요.
5. 감동적이고 따뜻하되 진부하지 않게 써주세요.
6. 마지막에 오늘 당장 실천할 수 있는 작은 행동 하나를 제안하세요.
7. 총 600~900자 사이로 작성하세요.
8. 제목 없이 바로 본문으로 시작하고, 이모지나 특수기호 없이 순수한 글로만 작성하세요.`,

      en: `You are a warm and insightful life counselor and writer.
Below are 40 answers from a ${age}-year-old ${genderLabel} of ${nationality} nationality who completed the 'My Life Compass' survey.
Please write a deeply personalized life narrative in English, taking fully into account their age, gender, nationality, and cultural background.

[Respondent Info]
Nationality: ${nationality} | Age: ${age} | Gender: ${genderLabel}

[Survey Answers]
${summary}

[Writing Guidelines]
1. Address the respondent directly in second person ('you').
2. Organize naturally around: past (the road walked), present (this moment), future (the journey ahead).
3. Weave in specific answers to create a personalized narrative.
4. Naturally reflect the respondent's age and cultural background.
5. Be moving and warm without being clichéd.
6. End with one small, concrete action they can take today.
7. Write 400-600 words.
8. Begin directly with the body text — no title, no emoji, no special symbols.`,

      ja: `あなたは温かく深みのある人生カウンセラーであり作家です。
以下は、${nationality}国籍の${age}歳・${genderLabel}が「私の人生コンパス」アンケートに回答した40の答えです。
この方の年齢・性別・国籍・文化的背景を十分に考慮し、この方だけのための個人化された人生の解説を日本語で書いてください。

[回答者情報]
国籍: ${nationality} | 年齢: ${age}歳 | 性別: ${genderLabel}

[アンケート回答]
${summary}

[執筆指針]
1. 回答者に直接語りかけるように2人称で書いてください。
2. 過去・現在・未来の三つの流れで構成してください。
3. 具体的な回答内容を織り込んで個人化された解説を書いてください。
4. 回答者の年齢と文化的背景を自然に反映してください。
5. 感動的で温かく、陳腐にならないように書いてください。
6. 最後に今日すぐ実践できる小さな行動を一つ提案してください。
7. 600〜900文字で書いてください。
8. タイトルなしで本文から始め、絵文字や特殊記号なしで書いてください。`,

      "zh-hans": `您是一位温暖而深刻的人生顾问和作家。
以下是一位来自${nationality}、${age}岁${genderLabel}完成"我的人生罗盘"问卷的40个回答。
请充分考虑此人的年龄、性别、国籍和文化背景，用简体中文撰写专属的个性化人生解读。

[受访者信息]
国籍: ${nationality} | 年龄: ${age}岁 | 性别: ${genderLabel}

[问卷回答]
${summary}

[写作指南]
1. 以第二人称直接向受访者说话。
2. 围绕过去、现在、未来三个流程自然展开。
3. 融入具体的回答内容，创作个性化的解读。
4. 自然地反映受访者的年龄和文化背景。
5. 感人而温暖，但不要流于俗套。
6. 最后提出一个今天就能付诸实践的小行动。
7. 总字数在400至600字之间。
8. 直接从正文开始，不需要标题，不使用表情符号。`,

      "zh-hant": `您是一位溫暖而深刻的人生顧問和作家。
以下是一位來自${nationality}、${age}歲${genderLabel}完成「我的人生羅盤」問卷的40個回答。
請充分考慮此人的年齡、性別、國籍和文化背景，用繁體中文撰寫專屬的個性化人生解讀。

[受訪者資訊]
國籍: ${nationality} | 年齡: ${age}歲 | 性別: ${genderLabel}

[問卷回答]
${summary}

[寫作指南]
1. 以第二人稱直接向受訪者說話。
2. 圍繞過去、現在、未來三個流程自然展開。
3. 融入具體的回答內容，創作個性化的解讀。
4. 自然地反映受訪者的年齡和文化背景。
5. 感人而溫暖，但不要流於俗套。
6. 最後提出一個今天就能付諸實踐的小行動。
7. 總字數在400至600字之間。
8. 直接從正文開始，不需要標題，不使用表情符號。`,

      es: `Eres un asesor de vida y escritor cálido y perspicaz.
A continuación se presentan 40 respuestas de una persona de ${nationality}, de ${age} años, género ${genderLabel}.
Por favor, escribe en español una narrativa de vida profundamente personalizada.

[Información del encuestado]
Nacionalidad: ${nationality} | Edad: ${age} años | Género: ${genderLabel}

[Respuestas]
${summary}

[Directrices]
1. Dirígete al encuestado en segunda persona.
2. Organiza en torno a: pasado, presente y futuro.
3. Incorpora las respuestas específicas para crear una narrativa personalizada.
4. Refleja naturalmente la edad y el contexto cultural.
5. Sé conmovedor y cálido, sin caer en clichés.
6. Termina con una pequeña acción concreta para hoy.
7. Escribe entre 400 y 600 palabras.
8. Comienza directamente con el texto, sin título ni emojis.`,

      fr: `Vous êtes un conseiller de vie chaleureux et perspicace.
Voici 40 réponses d'une personne de nationalité ${nationality}, âgée de ${age} ans, de genre ${genderLabel}.
Veuillez rédiger en français une narration de vie profondément personnalisée.

[Informations]
Nationalité: ${nationality} | Âge: ${age} ans | Genre: ${genderLabel}

[Réponses]
${summary}

[Directives]
1. Adressez-vous au répondant à la deuxième personne.
2. Organisez autour du passé, présent et futur.
3. Intégrez les réponses spécifiques pour créer un récit personnalisé.
4. Reflétez naturellement l'âge et le contexte culturel.
5. Soyez émouvant et chaleureux, sans tomber dans les clichés.
6. Terminez par une petite action concrète pour aujourd'hui.
7. Rédigez entre 400 et 600 mots.
8. Commencez directement par le texte, sans titre ni emoji.`,

      de: `Du bist ein einfühlsamer Lebensberater und Autor.
Im Folgenden findest du 40 Antworten einer ${age}-jährigen Person aus ${nationality}, Geschlecht ${genderLabel}.
Bitte verfasse auf Deutsch eine tiefgründig personalisierte Lebenserzählung.

[Angaben]
Nationalität: ${nationality} | Alter: ${age} Jahre | Geschlecht: ${genderLabel}

[Antworten]
${summary}

[Richtlinien]
1. Sprich die Person direkt in der zweiten Person an.
2. Gliedere die Erzählung in Vergangenheit, Gegenwart und Zukunft.
3. Webe spezifische Antworten ein für eine persönliche Erzählung.
4. Reflektiere natürlich das Alter und den kulturellen Hintergrund.
5. Sei bewegend und warm, ohne klischeehaft zu sein.
6. Schließe mit einer kleinen konkreten Handlung für heute.
7. Schreibe 400-600 Wörter.
8. Beginne direkt mit dem Text, ohne Titel oder Emojis.`,

      ar: `أنت مستشار حياة ودود وبصير وكاتب متمرس.
فيما يلي 40 إجابة من شخص يحمل جنسية ${nationality}، عمره ${age} عاماً، جنسه ${genderLabel}.
يُرجى كتابة سرد حياة شخصي عميق باللغة العربية.

[معلومات المشارك]
الجنسية: ${nationality} | العمر: ${age} عاماً | الجنس: ${genderLabel}

[الإجابات]
${summary}

[إرشادات الكتابة]
1. خاطب المشارك بضمير المخاطب.
2. نظّم السرد حول الماضي والحاضر والمستقبل.
3. ضمّن الإجابات المحددة لتخصيص السرد.
4. عكس عمر المشارك وخلفيته الثقافية بشكل طبيعي.
5. اكتب بأسلوب مؤثر ودافئ.
6. اختم باقتراح إجراء صغير وملموس لليوم.
7. اكتب ما بين 400 و600 كلمة.
8. ابدأ مباشرةً بالنص دون عنوان أو رموز.`,
    };

    const prompt = promptMap[lang as string] ?? promptMap.ko;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ result: text });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again." },
      { status: 500 }
    );
  }
}

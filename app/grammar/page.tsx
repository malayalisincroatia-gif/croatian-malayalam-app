"use client";

import Link from "next/link";

const topics = [
  {
    number: "01",
    title: "Croatian Alphabet",
    malayalam: "ക്രൊയേഷ്യൻ അക്ഷരങ്ങളും ഉച്ചാരണവും",
    description: "A–Ž വരെ അക്ഷരങ്ങൾ എങ്ങനെ വായിക്കാം എന്ന് പഠിക്കാം.",
    icon: "🔤",
    href: "/grammar/alphabet",
  },
  {
    number: "02",
    title: "Personal Pronouns",
    malayalam: "ഞാൻ, നീ, അവൻ, അവൾ, അവർ",
    description: "Ja, Ti, On, Ona, Mi, Vi, Oni എന്നിവ ഉപയോഗിക്കുന്നത് പഠിക്കാം.",
    icon: "👤",
    href: "/grammar/pronouns",
  },
  {
    number: "03",
    title: "Verb: Biti",
    malayalam: "ആണ് / ഇരിക്കുക എന്ന അടിസ്ഥാന verb",
    description: "Sam, Si, Je, Smo, Ste, Su ഉപയോഗിക്കുന്നത് പഠിക്കാം.",
    icon: "📘",
    href: "/grammar/biti",
  },
  {
    number: "04",
    title: "Present Tense",
    malayalam: "വർത്തമാനകാലം",
    description: "ഇപ്പോൾ നടക്കുന്ന കാര്യങ്ങൾ Croatian-ൽ പറയാൻ പഠിക്കാം.",
    icon: "⏰",
    href: "/grammar/present",
  },
  {
    number: "05",
    title: "Questions",
    malayalam: "ചോദ്യങ്ങൾ ചോദിക്കുന്നത്",
    description: "Tko, Što, Gdje, Kada, Kako, Zašto എന്നിവ ഉപയോഗിക്കാം.",
    icon: "❓",
    href: "/grammar/questions",
  },
  {
    number: "06",
    title: "Negation",
    malayalam: "അല്ല / ഇല്ല എന്ന് പറയുന്നത്",
    description: "Ne ഉപയോഗിച്ച് negative sentences ഉണ്ടാക്കുന്നത് പഠിക്കാം.",
    icon: "🚫",
    href: "/grammar/negation",
  },
  {
    number: "07",
    title: "Nouns & Gender",
    malayalam: "പേരുകളും Gender-ഉം",
    description: "Muški, Ženski, Srednji gender-ന്റെ basic rules പഠിക്കാം.",
    icon: "📚",
    href: "/grammar/nouns",
  },
  {
    number: "08",
    title: "Cases – Basic",
    malayalam: "Croatian Cases അടിസ്ഥാനമായി",
    description: "Case system എന്താണെന്നും basic usage എങ്ങനെയെന്നും മനസ്സിലാക്കാം.",
    icon: "🧩",
    href: "/grammar/cases",
  },
];

export default function GrammarPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
          <div>
            <Link
              href="/"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Home
            </Link>

            <h1 className="mt-2 text-3xl font-black text-slate-900">
              Croatian Grammar
            </h1>

            <p className="mt-1 text-slate-600">
              മലയാളത്തിൽ എളുപ്പമായി Croatian Grammar പഠിക്കാം
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 sm:flex">
            <span className="text-2xl">📖</span>

            <div>
              <p className="text-xs font-bold text-blue-600">
                GRAMMAR
              </p>

              <p className="text-sm font-semibold text-slate-800">
                Beginner → A1
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-7 text-white shadow-lg md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-100">
              Learn step by step
            </p>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Croatian Grammar Made Easy
            </h2>

            <p className="mt-4 text-base leading-7 text-blue-50 md:text-lg">
              Grammar പേടിക്കേണ്ട. ഓരോ topic-ഉം മലയാളത്തിൽ explanation,
              Croatian examples, pronunciation, meaning, practice എന്നിവയോടെ
              step-by-step പഠിക്കാം.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.number}
              href={topic.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:bg-blue-100">
                  {topic.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black text-blue-600">
                      TOPIC {topic.number}
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Start Lesson →
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-black text-slate-900 group-hover:text-blue-700">
                    {topic.title}
                  </h3>

                  <p className="mt-1 font-semibold text-blue-700">
                    {topic.malayalam}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {topic.description}
                  </p>

                  <div className="mt-4 text-sm font-bold text-blue-600">
                    Open Lesson →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-2xl">🇭🇷</div>

            <h3 className="mt-3 font-black text-slate-900">
              Croatian
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Real Croatian examples
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-2xl">🇮🇳</div>

            <h3 className="mt-3 font-black text-slate-900">
              Malayalam
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Easy Malayalam explanations
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-2xl">📝</div>

            <h3 className="mt-3 font-black text-slate-900">
              Practice
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Examples and questions
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/vocabulary"
            className="rounded-2xl bg-slate-900 px-5 py-3 font-bold text-white hover:bg-slate-800"
          >
            📚 Vocabulary
          </Link>

          <Link
            href="/listening"
            className="rounded-2xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
          >
            🎧 Listening
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 hover:bg-slate-50"
          >
            📊 Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
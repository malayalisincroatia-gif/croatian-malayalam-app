"use client";

import { useState } from "react";

const cases = [
  {
    name: "Nominative",
    malayalam: "ആര്? എന്ത്?",
    question: "Tko? Što?",
    use: "Sentence-ന്റെ subject / സാധാരണ dictionary form.",
    examples: [
      {
        croatian: "Čovjek radi.",
        malayalam: "ആ മനുഷ്യൻ ജോലി ചെയ്യുന്നു.",
        pronunciation: "ചോവ്യേക് റാദി",
      },
      {
        croatian: "Kuća je velika.",
        malayalam: "വീട് വലുതാണ്.",
        pronunciation: "കുച്ചാ യെ വെലിക്കാ",
      },
    ],
  },
  {
    name: "Accusative",
    malayalam: "ആരെ? എന്തിനെ?",
    question: "Koga? Što?",
    use: "Direct object-നെ പറയാൻ സാധാരണ ഉപയോഗിക്കുന്നു.",
    examples: [
      {
        croatian: "Vidim čovjeka.",
        malayalam: "ഞാൻ ആ മനുഷ്യനെ കാണുന്നു.",
        pronunciation: "വിദിം ചോവ്യേകാ",
      },
      {
        croatian: "Kupujem kruh.",
        malayalam: "ഞാൻ ബ്രെഡ് വാങ്ങുന്നു.",
        pronunciation: "കുപുയേം ക്രുഹ്",
      },
    ],
  },
  {
    name: "Locative",
    malayalam: "എവിടെ? ആരെക്കുറിച്ച്?",
    question: "Gdje? O kome? O čemu?",
    use: "സ്ഥലം അല്ലെങ്കിൽ ഒരു കാര്യത്തെക്കുറിച്ച് പറയുമ്പോൾ.",
    examples: [
      {
        croatian: "U Zagrebu.",
        malayalam: "സാഗ്രെബിൽ.",
        pronunciation: "ഉ സാഗ്രെബു",
      },
      {
        croatian: "Pričam o poslu.",
        malayalam: "ഞാൻ ജോലിയെക്കുറിച്ച് സംസാരിക്കുന്നു.",
        pronunciation: "പ്രീചാം ഓ പോസ്ലു",
      },
    ],
  },
];

export default function CasesPage() {
  const [selected, setSelected] = useState(cases[0]);

  const speak = (text: string) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hr-HR";
    utterance.rate = 0.8;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <a
            href="/grammar"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Grammar
          </a>
        </div>

        <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white shadow-lg">
          <div className="text-sm font-semibold uppercase tracking-wide">
            Grammar Topic 08
          </div>

          <h1 className="mt-2 text-3xl font-bold">
            Croatian Cases – Basic
          </h1>

          <p className="mt-3 text-lg">
            Croatian Cases വളരെ എളുപ്പത്തിൽ മനസ്സിലാക്കാം.
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            🧠 Case എന്നത് എന്താണ്?
          </h2>

          <p className="mt-3 leading-7 text-slate-700">
            Croatian-ൽ sentence-ൽ ഒരു noun-ന്റെ role അനുസരിച്ച്
            അതിന്റെ രൂപം മാറാം. അതിനെയാണ് Case എന്ന് പറയുന്നത്.
          </p>

          <div className="mt-4 rounded-2xl bg-blue-50 p-5">
            <p className="font-semibold text-blue-800">
              A1 level-ൽ ആദ്യം എല്ലാ 7 cases-ഉം ഒരുമിച്ച് പഠിക്കേണ്ടതില്ല.
            </p>

            <p className="mt-2 text-slate-700">
              ആദ്യം Nominative, Accusative, Locative എന്നിവ
              തിരിച്ചറിയാൻ പഠിക്കുന്നത് സഹായകരമാണ്.
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            1️⃣ Basic Cases
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {cases.map((item) => (
              <button
                key={item.name}
                onClick={() => setSelected(item)}
                className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:shadow-md"
              >
                <div className="text-xl font-bold text-indigo-700">
                  {item.name}
                </div>

                <p className="mt-2 font-semibold text-slate-900">
                  {item.question}
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  {item.malayalam}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            🎯 {selected.name}
          </h2>

          <div className="mt-3 rounded-2xl bg-indigo-50 p-5">
            <p className="text-lg font-bold text-indigo-700">
              {selected.question}
            </p>

            <p className="mt-2 text-slate-700">
              {selected.malayalam}
            </p>

            <p className="mt-3 text-slate-700">
              {selected.use}
            </p>
          </div>

          <h3 className="mt-6 text-xl font-bold text-slate-900">
            Examples
          </h3>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {selected.examples.map((item) => (
              <button
                key={item.croatian}
                onClick={() => speak(item.croatian)}
                className="rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-slate-900">
                    {item.croatian}
                  </span>

                  <span>🔊</span>
                </div>

                <p className="mt-2 text-blue-700">
                  {item.malayalam}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.pronunciation}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-yellow-50 p-6">
          <h2 className="text-xl font-bold text-yellow-900">
            💡 Easy Tip
          </h2>

          <div className="mt-4 space-y-3 text-slate-700">
            <p>
              <strong>Nominative</strong> → ആര്? എന്ത്?
            </p>

            <p>
              <strong>Accusative</strong> → ആരെ? എന്തിനെ?
            </p>

            <p>
              <strong>Locative</strong> → എവിടെ? എന്തിനെക്കുറിച്ച്?
            </p>
          </div>

          <p className="mt-4 text-slate-700">
            Cases Croatian grammar-ന്റെ വലിയ ഭാഗമാണ്.
            ഇപ്പോൾ ഈ 3 basic cases തിരിച്ചറിയുന്നത് മതി.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/grammar"
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
          >
            ← All Grammar
          </a>

          <a
            href="/vocabulary"
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Vocabulary
          </a>

          <a
            href="/dashboard"
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}
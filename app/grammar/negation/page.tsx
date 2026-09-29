"use client";

import { useState } from "react";

const forms = [
  {
    croatian: "Ja nisam",
    malayalam: "ഞാൻ അല്ല",
    pronunciation: "യാ നിസാം",
    example: "Ja nisam umoran.",
    exampleMalayalam: "ഞാൻ ക്ഷീണിച്ചിട്ടില്ല.",
  },
  {
    croatian: "Ti nisi",
    malayalam: "നീ അല്ല",
    pronunciation: "തി നിസി",
    example: "Ti nisi spreman.",
    exampleMalayalam: "നീ തയ്യാറല്ല.",
  },
  {
    croatian: "On nije",
    malayalam: "അവൻ അല്ല",
    pronunciation: "ഓൻ നിയെ",
    example: "On nije kod kuće.",
    exampleMalayalam: "അവൻ വീട്ടിലില്ല.",
  },
  {
    croatian: "Ona nije",
    malayalam: "അവൾ അല്ല",
    pronunciation: "ഓന നിയെ",
    example: "Ona nije umorna.",
    exampleMalayalam: "അവൾ ക്ഷീണിച്ചിട്ടില്ല.",
  },
  {
    croatian: "Mi nismo",
    malayalam: "ഞങ്ങൾ അല്ല",
    pronunciation: "മി നിസ്മോ",
    example: "Mi nismo spremni.",
    exampleMalayalam: "ഞങ്ങൾ തയ്യാറല്ല.",
  },
  {
    croatian: "Vi niste",
    malayalam: "നിങ്ങൾ അല്ല",
    pronunciation: "വി നിസ്തെ",
    example: "Vi niste kasno.",
    exampleMalayalam: "നിങ്ങൾ വൈകിയിട്ടില്ല.",
  },
  {
    croatian: "Oni nisu",
    malayalam: "അവർ അല്ല",
    pronunciation: "ഓനി നിസു",
    example: "Oni nisu ovdje.",
    exampleMalayalam: "അവർ ഇവിടെ ഇല്ല.",
  },
];

const sentences = [
  {
    croatian: "Ne radim.",
    malayalam: "ഞാൻ ജോലി ചെയ്യുന്നില്ല.",
    pronunciation: "നെ റാദിം",
  },
  {
    croatian: "Ne razumijem.",
    malayalam: "എനിക്ക് മനസ്സിലാകുന്നില്ല.",
    pronunciation: "നെ റസുമിയേം",
  },
  {
    croatian: "Ne znam.",
    malayalam: "എനിക്ക് അറിയില്ല.",
    pronunciation: "നെ സ്നാം",
  },
];

export default function NegationPage() {
  const [selected, setSelected] = useState(forms[0]);

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

        <section className="rounded-3xl bg-gradient-to-r from-red-600 to-orange-500 p-6 text-white shadow-lg">
          <div className="text-sm font-semibold uppercase tracking-wide">
            Grammar Topic 06
          </div>

          <h1 className="mt-2 text-3xl font-bold">
            Croatian Negation
          </h1>

          <p className="mt-3 text-lg">
            നിഷേധവാക്യങ്ങൾ — “അല്ല / ഇല്ല / ചെയ്യുന്നില്ല” എങ്ങനെ പറയാം?
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            🧠 ആദ്യം ഈ Rule മനസ്സിലാക്കാം
          </h2>

          <div className="mt-4 rounded-2xl bg-red-50 p-5">
            <p className="text-lg font-semibold text-red-700">
              Biti (to be) → Ne അല്ല, പ്രത്യേക രൂപങ്ങൾ ഉപയോഗിക്കും.
            </p>

            <p className="mt-3 text-slate-700">
              sam → nisam
            </p>

            <p className="text-slate-700">
              si → nisi
            </p>

            <p className="text-slate-700">
              je → nije
            </p>

            <p className="text-slate-700">
              smo → nismo
            </p>

            <p className="text-slate-700">
              ste → niste
            </p>

            <p className="text-slate-700">
              su → nisu
            </p>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            1️⃣ Biti — Negative Forms
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {forms.map((item) => (
              <button
                key={item.croatian}
                onClick={() => {
                  setSelected(item);
                  speak(item.croatian);
                }}
                className="rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-red-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    {item.croatian}
                  </h3>

                  <span className="text-xl">🔊</span>
                </div>

                <p className="mt-2 text-lg text-blue-700">
                  {item.malayalam}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.pronunciation}
                </p>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            🎯 Selected Form
          </h2>

          <div className="mt-4 rounded-2xl bg-slate-50 p-5">
            <div className="text-2xl font-bold text-red-600">
              {selected.croatian}
            </div>

            <div className="mt-2 text-lg text-blue-700">
              {selected.malayalam}
            </div>

            <div className="mt-1 text-sm text-slate-500">
              {selected.pronunciation}
            </div>

            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="font-semibold text-slate-700">
                Example:
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900">
                {selected.example}
              </p>

              <p className="mt-1 text-blue-700">
                {selected.exampleMalayalam}
              </p>

              <button
                onClick={() => speak(selected.example)}
                className="mt-4 rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
              >
                🔊 കേൾക്കുക
              </button>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            2️⃣ സാധാരണ Verbs — “Ne”
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {sentences.map((item) => (
              <button
                key={item.croatian}
                onClick={() => speak(item.croatian)}
                className="rounded-2xl bg-white p-5 text-left shadow-sm transition hover:shadow-md"
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

          <p className="mt-3 text-slate-700">
            “Biti” verb-ന്റെ negative forms പ്രത്യേകം ഓർമ്മിക്കുക:
          </p>

          <div className="mt-3 grid gap-2 text-slate-800 md:grid-cols-3">
            <div>sam → <strong>nisam</strong></div>
            <div>si → <strong>nisi</strong></div>
            <div>je → <strong>nije</strong></div>
            <div>smo → <strong>nismo</strong></div>
            <div>ste → <strong>niste</strong></div>
            <div>su → <strong>nisu</strong></div>
          </div>

          <p className="mt-4 text-slate-700">
            മറ്റ് സാധാരണ verbs-ൽ സാധാരണയായി verb-ന് മുമ്പിൽ
            <strong> ne </strong>
            ഉപയോഗിക്കും.
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
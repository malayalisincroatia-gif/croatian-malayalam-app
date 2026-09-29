"use client";

import { useState } from "react";

const genders = [
  {
    gender: "Masculine",
    malayalam: "പുരുഷലിംഗം",
    color: "blue",
    examples: [
      {
        croatian: "stol",
        malayalam: "മേശ",
        pronunciation: "സ്തോൽ",
      },
      {
        croatian: "grad",
        malayalam: "നഗരം",
        pronunciation: "ഗ്രാദ്",
      },
      {
        croatian: "posao",
        malayalam: "ജോലി",
        pronunciation: "പൊസാവോ",
      },
    ],
  },
  {
    gender: "Feminine",
    malayalam: "സ്ത്രീലിംഗം",
    color: "pink",
    examples: [
      {
        croatian: "kuća",
        malayalam: "വീട്",
        pronunciation: "കുച്ചാ",
      },
      {
        croatian: "žena",
        malayalam: "സ്ത്രീ",
        pronunciation: "ഷേന",
      },
      {
        croatian: "škola",
        malayalam: "സ്കൂൾ",
        pronunciation: "ഷ്കോള",
      },
    ],
  },
  {
    gender: "Neuter",
    malayalam: "നപുംസകലിംഗം",
    color: "green",
    examples: [
      {
        croatian: "auto",
        malayalam: "കാർ",
        pronunciation: "ഔതോ",
      },
      {
        croatian: "more",
        malayalam: "കടൽ",
        pronunciation: "മോരെ",
      },
      {
        croatian: "selo",
        malayalam: "ഗ്രാമം",
        pronunciation: "സേലോ",
      },
    ],
  },
];

const rules = [
  {
    ending: "-o / -e",
    gender: "Neuter",
    malayalam: "പലപ്പോഴും നപുംസകലിംഗം",
    examples: "auto, more, selo",
  },
  {
    ending: "-a",
    gender: "Feminine",
    malayalam: "പലപ്പോഴും സ്ത്രീലിംഗം",
    examples: "žena, škola, kuća",
  },
  {
    ending: "Consonant",
    gender: "Masculine",
    malayalam: "പലപ്പോഴും പുരുഷലിംഗം",
    examples: "stol, grad, rad",
  },
];

export default function NounsPage() {
  const [selected, setSelected] = useState(genders[0]);

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

        <section className="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white shadow-lg">
          <div className="text-sm font-semibold uppercase tracking-wide">
            Grammar Topic 07
          </div>

          <h1 className="mt-2 text-3xl font-bold">
            Croatian Nouns & Gender
          </h1>

          <p className="mt-3 text-lg">
            Croatian nouns-ന്റെ ലിംഗം എങ്ങനെ തിരിച്ചറിയാം?
          </p>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            🧠 Croatian-ൽ 3 Genders ഉണ്ട്
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <button
              onClick={() => setSelected(genders[0])}
              className="rounded-2xl bg-blue-50 p-5 text-left hover:shadow-md"
            >
              <div className="text-2xl">👨</div>
              <h3 className="mt-2 text-xl font-bold text-blue-700">
                Masculine
              </h3>
              <p className="mt-1 text-slate-700">
                പുരുഷലിംഗം
              </p>
            </button>

            <button
              onClick={() => setSelected(genders[1])}
              className="rounded-2xl bg-pink-50 p-5 text-left hover:shadow-md"
            >
              <div className="text-2xl">👩</div>
              <h3 className="mt-2 text-xl font-bold text-pink-700">
                Feminine
              </h3>
              <p className="mt-1 text-slate-700">
                സ്ത്രീലിംഗം
              </p>
            </button>

            <button
              onClick={() => setSelected(genders[2])}
              className="rounded-2xl bg-green-50 p-5 text-left hover:shadow-md"
            >
              <div className="text-2xl">🟢</div>
              <h3 className="mt-2 text-xl font-bold text-green-700">
                Neuter
              </h3>
              <p className="mt-1 text-slate-700">
                നപുംസകലിംഗം
              </p>
            </button>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            1️⃣ Gender Examples
          </h2>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-purple-700">
              {selected.gender}
            </h3>

            <p className="mt-1 text-lg text-slate-600">
              {selected.malayalam}
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {selected.examples.map((item) => (
                <button
                  key={item.croatian}
                  onClick={() => speak(item.croatian)}
                  className="rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">
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
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            2️⃣ Easy Gender Rules
          </h2>

          <p className="mt-2 text-slate-600">
            താഴെയുള്ള endings നോക്കുന്നത് തുടക്കത്തിൽ സഹായിക്കും.
            പക്ഷേ ഇവ 100% rules അല്ല.
          </p>

          <div className="mt-5 space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.ending}
                className="rounded-2xl bg-slate-50 p-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-xl bg-purple-100 px-3 py-1 font-bold text-purple-700">
                    {rule.ending}
                  </span>

                  <span className="font-bold text-slate-900">
                    {rule.gender}
                  </span>
                </div>

                <p className="mt-2 text-slate-700">
                  {rule.malayalam}
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Examples: {rule.examples}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-yellow-50 p-6">
          <h2 className="text-xl font-bold text-yellow-900">
            💡 Easy Tip
          </h2>

          <p className="mt-3 text-slate-700">
            തുടക്കത്തിൽ ഒരു Croatian noun പഠിക്കുമ്പോൾ
            അതിന്റെ gender കൂടി ഓർമ്മിക്കുക.
          </p>

          <div className="mt-4 space-y-2 text-slate-800">
            <p>
              <strong>stol</strong> → Masculine
            </p>

            <p>
              <strong>kuća</strong> → Feminine
            </p>

            <p>
              <strong>auto</strong> → Neuter
            </p>
          </div>

          <p className="mt-4 text-slate-700">
            Ending നോക്കി gender അനുമാനിക്കാം, പക്ഷേ എല്ലാ വാക്കുകൾക്കും
            ഒരേ rule ബാധകമല്ല.
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
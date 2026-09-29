"use client";

import Link from "next/link";
import { useState } from "react";

const pronouns = [
  {
    croatian: "Ja",
    malayalam: "ഞാൻ",
    pronunciation: "യാ",
    example: "Ja sam radnik.",
    exampleMalayalam: "ഞാൻ ഒരു തൊഴിലാളിയാണ്.",
  },
  {
    croatian: "Ti",
    malayalam: "നീ",
    pronunciation: "തി",
    example: "Ti si moj kolega.",
    exampleMalayalam: "നീ എന്റെ സഹപ്രവർത്തകനാണ്.",
  },
  {
    croatian: "On",
    malayalam: "അവൻ",
    pronunciation: "ഓൻ",
    example: "On je radnik.",
    exampleMalayalam: "അവൻ ഒരു തൊഴിലാളിയാണ്.",
  },
  {
    croatian: "Ona",
    malayalam: "അവൾ",
    pronunciation: "ഓനാ",
    example: "Ona je liječnica.",
    exampleMalayalam: "അവൾ ഒരു ഡോക്ടറാണ്.",
  },
  {
    croatian: "Ono",
    malayalam: "അത്",
    pronunciation: "ഓനോ",
    example: "Ono je dobro.",
    exampleMalayalam: "അത് നല്ലതാണ്.",
  },
  {
    croatian: "Mi",
    malayalam: "ഞങ്ങൾ",
    pronunciation: "മി",
    example: "Mi smo prijatelji.",
    exampleMalayalam: "ഞങ്ങൾ സുഹൃത്തുക്കളാണ്.",
  },
  {
    croatian: "Vi",
    malayalam: "നിങ്ങൾ",
    pronunciation: "വി",
    example: "Vi ste moj šef.",
    exampleMalayalam: "നിങ്ങൾ എന്റെ ബോസാണ്.",
  },
  {
    croatian: "Oni",
    malayalam: "അവർ",
    pronunciation: "ഓനി",
    example: "Oni su radnici.",
    exampleMalayalam: "അവർ തൊഴിലാളികളാണ്.",
  },
  {
    croatian: "One",
    malayalam: "അവർ (സ്ത്രീകൾ)",
    pronunciation: "ഓനേ",
    example: "One su kolegice.",
    exampleMalayalam: "അവർ സഹപ്രവർത്തകരാണ്.",
  },
];

export default function PronounsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = pronouns[selectedIndex];

  function speak(text: string) {
    if (typeof window === "undefined") {
      return;
    }

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hr-HR";
    utterance.rate = 0.75;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-5">
          <Link
            href="/grammar"
            className="text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            ← Grammar
          </Link>

          <div className="mt-3">
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              Grammar Topic 02
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Personal Pronouns
            </h1>

            <p className="text-slate-600 mt-2">
              ഞാൻ, നീ, അവൻ, അവൾ, ഞങ്ങൾ, നിങ്ങൾ, അവർ
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-7 md:p-10 shadow-lg">
          <p className="text-blue-100 font-bold">
            🇭🇷 ആദ്യം ഇത് മനസ്സിലാക്കുക
          </p>

          <h2 className="text-2xl md:text-3xl font-black mt-2">
            Personal Pronouns എന്താണ്?
          </h2>

          <p className="text-blue-50 leading-7 mt-4 max-w-3xl">
            ഒരു sentence-ൽ ആരെക്കുറിച്ചാണ് സംസാരിക്കുന്നത് എന്ന് പറയാൻ
            pronouns ഉപയോഗിക്കുന്നു. Croatian-ൽ Ja = ഞാൻ, Ti = നീ,
            On = അവൻ, Ona = അവൾ എന്നിങ്ങനെ ഉപയോഗിക്കുന്നു.
          </p>

          <button
            onClick={() =>
              speak("Ja. Ti. On. Ona. Mi. Vi. Oni.")
            }
            className="mt-5 rounded-2xl bg-white text-blue-700 px-5 py-3 font-black hover:bg-blue-50"
          >
            🔊 Pronouns കേൾക്കുക
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">
            Croatian Pronouns
          </h2>

          <p className="text-slate-600 mt-1">
            ഓരോ pronoun-ലും click ചെയ്ത് example കേൾക്കാം.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {pronouns.map((item, index) => (
              <button
                key={item.croatian}
                onClick={() => {
                  setSelectedIndex(index);
                  speak(item.croatian);
                }}
                className={
                  selectedIndex === index
                    ? "rounded-2xl bg-blue-600 text-white p-5 shadow-md"
                    : "rounded-2xl bg-white border border-slate-200 text-slate-900 p-5 hover:border-blue-300"
                }
              >
                <div className="text-2xl font-black">
                  {item.croatian}
                </div>

                <div className="text-sm font-semibold mt-1 opacity-80">
                  {item.malayalam}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <p className="text-xs font-black text-blue-600">
            SELECTED PRONOUN
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-3xl font-black text-blue-700">
                  {selected.croatian}
                </div>

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    {selected.malayalam}
                  </p>

                  <p className="text-blue-700 font-semibold mt-1">
                    {selected.pronunciation}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => speak(selected.example)}
              className="rounded-2xl bg-blue-600 text-white px-6 py-4 font-black hover:bg-blue-700"
            >
              🔊 Example കേൾക്കുക
            </button>
          </div>

          <div className="mt-7 rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-bold text-slate-500">
              CROATIAN SENTENCE
            </p>

            <p className="text-2xl font-black text-slate-900 mt-2">
              {selected.example}
            </p>

            <p className="text-blue-700 font-bold mt-3">
              {selected.exampleMalayalam}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900">
              👤 Singular
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Ja</span>
                <span>ഞാൻ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Ti</span>
                <span>നീ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">On</span>
                <span>അവൻ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Ona</span>
                <span>അവൾ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Ono</span>
                <span>അത്</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-black text-slate-900">
              👥 Plural
            </h2>

            <div className="mt-4 space-y-3">
              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Mi</span>
                <span>ഞങ്ങൾ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Vi</span>
                <span>നിങ്ങൾ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">Oni</span>
                <span>അവർ</span>
              </div>

              <div className="flex justify-between rounded-xl bg-slate-50 p-4">
                <span className="font-black">One</span>
                <span>അവർ (സ്ത്രീകൾ)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-amber-50 border border-amber-200 p-6">
          <h2 className="text-xl font-black text-slate-900">
            💡 Easy Tip
          </h2>

          <p className="text-slate-700 leading-7 mt-2">
            Croatian sentence പഠിക്കുമ്പോൾ ആദ്യം pronoun തിരിച്ചറിയുക.
            ഉദാഹരണം: <strong>Ja</strong> കണ്ടാൽ “ഞാൻ”,
            <strong>Ti</strong> കണ്ടാൽ “നീ”, <strong>On</strong> കണ്ടാൽ
            “അവൻ”, <strong>Ona</strong> കണ്ടാൽ “അവൾ” എന്ന് ഓർക്കുക.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/grammar"
            className="rounded-2xl bg-slate-900 text-white px-5 py-3 font-bold hover:bg-slate-800"
          >
            ← All Grammar
          </Link>

          <Link
            href="/grammar/alphabet"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            🔤 Alphabet
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-blue-600 text-white px-5 py-3 font-bold hover:bg-blue-700"
          >
            📊 Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
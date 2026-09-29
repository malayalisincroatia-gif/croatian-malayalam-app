"use client";

import Link from "next/link";
import { useState } from "react";

const forms = [
  {
    croatian: "Ja sam",
    malayalam: "ഞാൻ ആണ്",
    pronunciation: "യാ സാം",
    example: "Ja sam radnik.",
    exampleMalayalam: "ഞാൻ ഒരു തൊഴിലാളിയാണ്.",
  },
  {
    croatian: "Ti si",
    malayalam: "നീ ആണ്",
    pronunciation: "തി സി",
    example: "Ti si moj kolega.",
    exampleMalayalam: "നീ എന്റെ സഹപ്രവർത്തകനാണ്.",
  },
  {
    croatian: "On je",
    malayalam: "അവൻ ആണ്",
    pronunciation: "ഓൻ യെ",
    example: "On je radnik.",
    exampleMalayalam: "അവൻ ഒരു തൊഴിലാളിയാണ്.",
  },
  {
    croatian: "Ona je",
    malayalam: "അവൾ ആണ്",
    pronunciation: "ഓനാ യെ",
    example: "Ona je liječnica.",
    exampleMalayalam: "അവൾ ഒരു ഡോക്ടറാണ്.",
  },
  {
    croatian: "Ono je",
    malayalam: "അത് ആണ്",
    pronunciation: "ഓനോ യെ",
    example: "Ono je dobro.",
    exampleMalayalam: "അത് നല്ലതാണ്.",
  },
  {
    croatian: "Mi smo",
    malayalam: "ഞങ്ങൾ ആണ്",
    pronunciation: "മി സ്മോ",
    example: "Mi smo prijatelji.",
    exampleMalayalam: "ഞങ്ങൾ സുഹൃത്തുക്കളാണ്.",
  },
  {
    croatian: "Vi ste",
    malayalam: "നിങ്ങൾ ആണ്",
    pronunciation: "വി സ്റ്റെ",
    example: "Vi ste moj šef.",
    exampleMalayalam: "നിങ്ങൾ എന്റെ ബോസാണ്.",
  },
  {
    croatian: "Oni su",
    malayalam: "അവർ ആണ്",
    pronunciation: "ഓനി സു",
    example: "Oni su radnici.",
    exampleMalayalam: "അവർ തൊഴിലാളികളാണ്.",
  },
];

export default function BitiPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = forms[selectedIndex];

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
              Grammar Topic 03
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Verb: Biti
            </h1>

            <p className="text-slate-600 mt-2">
              Biti = ആയിരിക്കുക / ആണ്
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-7 md:p-10 shadow-lg">
          <p className="text-emerald-100 font-bold">
            🇭🇷 ആദ്യം ഇത് മനസ്സിലാക്കുക
          </p>

          <h2 className="text-2xl md:text-3xl font-black mt-2">
            Biti എന്താണ്?
          </h2>

          <p className="text-emerald-50 leading-7 mt-4 max-w-3xl">
            Croatian ഭാഷയിലെ വളരെ പ്രധാനപ്പെട്ട verb ആണ്
            <strong> Biti</strong>. ഇതിന്റെ basic meaning
            “ആയിരിക്കുക” എന്നാണ്. English-ലെ “am / is / are” പോലെ
            sentence ഉണ്ടാക്കാൻ ഇത് ഉപയോഗിക്കുന്നു.
          </p>

          <button
            onClick={() => speak("Ja sam. Ti si. On je. Ona je. Mi smo. Vi ste. Oni su.")}
            className="mt-5 rounded-2xl bg-white text-emerald-700 px-5 py-3 font-black hover:bg-emerald-50"
          >
            🔊 Biti forms കേൾക്കുക
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">
            Biti Forms
          </h2>

          <p className="text-slate-600 mt-1">
            ഓരോ form-ലും click ചെയ്ത് pronunciation കേൾക്കാം.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {forms.map((item, index) => (
              <button
                key={item.croatian}
                onClick={() => {
                  setSelectedIndex(index);
                  speak(item.croatian);
                }}
                className={
                  selectedIndex === index
                    ? "rounded-2xl bg-emerald-600 text-white p-5 shadow-md"
                    : "rounded-2xl bg-white border border-slate-200 text-slate-900 p-5 hover:border-emerald-300"
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
          <p className="text-xs font-black text-emerald-600">
            SELECTED FORM
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-2xl font-black text-emerald-700 px-3">
                  {selected.croatian}
                </div>

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    {selected.malayalam}
                  </p>

                  <p className="text-emerald-700 font-semibold mt-1">
                    {selected.pronunciation}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => speak(selected.example)}
              className="rounded-2xl bg-emerald-600 text-white px-6 py-4 font-black hover:bg-emerald-700"
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

            <p className="text-emerald-700 font-bold mt-3">
              {selected.exampleMalayalam}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            📚 Easy Biti Table
          </h2>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-100 p-4 font-black text-slate-700">
              <span>Pronoun</span>
              <span>Biti</span>
              <span>Malayalam</span>
            </div>

            {forms.map((item) => (
              <div
                key={item.croatian}
                className="grid grid-cols-3 p-4 border-t border-slate-200"
              >
                <span className="font-black text-slate-900">
                  {item.croatian.split(" ")[0]}
                </span>

                <span className="font-black text-emerald-700">
                  {item.croatian.split(" ")[1]}
                </span>

                <span className="text-slate-700">
                  {item.malayalam}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-amber-50 border border-amber-200 p-6">
          <h2 className="text-xl font-black text-slate-900">
            💡 Easy Tip
          </h2>

          <p className="text-slate-700 leading-7 mt-2">
            ആദ്യം ഈ 7 forms മനസ്സിലാക്കുക:
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl p-4 font-black">
              Ja → sam
            </div>

            <div className="bg-white rounded-xl p-4 font-black">
              Ti → si
            </div>

            <div className="bg-white rounded-xl p-4 font-black">
              On/Ona → je
            </div>

            <div className="bg-white rounded-xl p-4 font-black">
              Mi → smo
            </div>

            <div className="bg-white rounded-xl p-4 font-black">
              Vi → ste
            </div>

            <div className="bg-white rounded-xl p-4 font-black">
              Oni → su
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/grammar"
            className="rounded-2xl bg-slate-900 text-white px-5 py-3 font-bold hover:bg-slate-800"
          >
            ← All Grammar
          </Link>

          <Link
            href="/grammar/pronouns"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            👤 Pronouns
          </Link>

          <Link
            href="/grammar/alphabet"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            🔤 Alphabet
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-emerald-600 text-white px-5 py-3 font-bold hover:bg-emerald-700"
          >
            📊 Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
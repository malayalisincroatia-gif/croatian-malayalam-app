"use client";

import Link from "next/link";
import { useState } from "react";

const examples = [
  {
    croatian: "Radim",
    malayalam: "ഞാൻ ജോലി ചെയ്യുന്നു",
    pronunciation: "റാദിം",
    subject: "Ja",
    verb: "raditi",
    sentence: "Ja radim.",
    sentenceMalayalam: "ഞാൻ ജോലി ചെയ്യുന്നു.",
  },
  {
    croatian: "Radiš",
    malayalam: "നീ ജോലി ചെയ്യുന്നു",
    pronunciation: "റാദിഷ്",
    subject: "Ti",
    verb: "raditi",
    sentence: "Ti radiš.",
    sentenceMalayalam: "നീ ജോലി ചെയ്യുന്നു.",
  },
  {
    croatian: "Radi",
    malayalam: "അവൻ / അവൾ ജോലി ചെയ്യുന്നു",
    pronunciation: "റാദി",
    subject: "On / Ona",
    verb: "raditi",
    sentence: "On radi.",
    sentenceMalayalam: "അവൻ ജോലി ചെയ്യുന്നു.",
  },
  {
    croatian: "Radimo",
    malayalam: "ഞങ്ങൾ ജോലി ചെയ്യുന്നു",
    pronunciation: "റാദിമോ",
    subject: "Mi",
    verb: "raditi",
    sentence: "Mi radimo.",
    sentenceMalayalam: "ഞങ്ങൾ ജോലി ചെയ്യുന്നു.",
  },
  {
    croatian: "Radite",
    malayalam: "നിങ്ങൾ ജോലി ചെയ്യുന്നു",
    pronunciation: "റാദിതെ",
    subject: "Vi",
    verb: "raditi",
    sentence: "Vi radite.",
    sentenceMalayalam: "നിങ്ങൾ ജോലി ചെയ്യുന്നു.",
  },
  {
    croatian: "Rade",
    malayalam: "അവർ ജോലി ചെയ്യുന്നു",
    pronunciation: "റാദെ",
    subject: "Oni",
    verb: "raditi",
    sentence: "Oni rade.",
    sentenceMalayalam: "അവർ ജോലി ചെയ്യുന്നു.",
  },
];

export default function PresentPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = examples[selectedIndex];

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
              Grammar Topic 04
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Present Tense
            </h1>

            <p className="text-slate-600 mt-2">
              ഇപ്പോൾ നടക്കുന്നത് എങ്ങനെ പറയാം?
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white p-7 md:p-10 shadow-lg">
          <p className="text-purple-100 font-bold">
            🇭🇷 ആദ്യം ഇത് മനസ്സിലാക്കുക
          </p>

          <h2 className="text-2xl md:text-3xl font-black mt-2">
            Present Tense എന്താണ്?
          </h2>

          <p className="text-purple-50 leading-7 mt-4 max-w-3xl">
            ഇപ്പോൾ ഒരു പ്രവർത്തി നടക്കുന്നു എന്ന് പറയാൻ Present Tense
            ഉപയോഗിക്കുന്നു. Croatian-ൽ verb മാറുന്നത് ആരാണ് പ്രവർത്തി
            ചെയ്യുന്നത് എന്നതിനെ ആശ്രയിച്ചാണ്.
          </p>

          <div className="mt-5 rounded-2xl bg-white/10 p-5">
            <p className="font-bold">Example:</p>

            <p className="text-2xl font-black mt-2">
              Ja radim.
            </p>

            <p className="text-purple-100 mt-1">
              ഞാൻ ജോലി ചെയ്യുന്നു.
            </p>
          </div>

          <button
            onClick={() => speak("Ja radim. Ti radiš. On radi. Mi radimo. Vi radite. Oni rade.")}
            className="mt-5 rounded-2xl bg-white text-purple-700 px-5 py-3 font-black hover:bg-purple-50"
          >
            🔊 Forms കേൾക്കുക
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">
            Verb: Raditi
          </h2>

          <p className="text-slate-600 mt-1">
            <strong>Raditi</strong> = ജോലി ചെയ്യുക
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {examples.map((item, index) => (
              <button
                key={item.croatian}
                onClick={() => {
                  setSelectedIndex(index);
                  speak(item.croatian);
                }}
                className={
                  selectedIndex === index
                    ? "rounded-2xl bg-purple-600 text-white p-5 shadow-md"
                    : "rounded-2xl bg-white border border-slate-200 text-slate-900 p-5 hover:border-purple-300"
                }
              >
                <div className="text-2xl font-black">
                  {item.croatian}
                </div>

                <div className="text-sm font-semibold mt-1 opacity-80">
                  {item.subject}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <p className="text-xs font-black text-purple-600">
            SELECTED FORM
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-28 h-20 rounded-3xl bg-purple-50 flex items-center justify-center text-2xl font-black text-purple-700 px-3">
                  {selected.croatian}
                </div>

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    {selected.malayalam}
                  </p>

                  <p className="text-purple-700 font-semibold mt-1">
                    {selected.pronunciation}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => speak(selected.sentence)}
              className="rounded-2xl bg-purple-600 text-white px-6 py-4 font-black hover:bg-purple-700"
            >
              🔊 Sentence കേൾക്കുക
            </button>
          </div>

          <div className="mt-7 rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-bold text-slate-500">
              CROATIAN SENTENCE
            </p>

            <p className="text-2xl font-black text-slate-900 mt-2">
              {selected.sentence}
            </p>

            <p className="text-purple-700 font-bold mt-3">
              {selected.sentenceMalayalam}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            📚 Present Tense Table
          </h2>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-100 p-4 font-black text-slate-700">
              <span>Person</span>
              <span>Raditi</span>
              <span>Meaning</span>
            </div>

            {examples.map((item) => (
              <div
                key={item.croatian}
                className="grid grid-cols-3 p-4 border-t border-slate-200"
              >
                <span className="font-black text-slate-900">
                  {item.subject}
                </span>

                <span className="font-black text-purple-700">
                  {item.croatian}
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
            Croatian Present Tense പഠിക്കുമ്പോൾ ആദ്യം subject
            തിരിച്ചറിയുക. അതിന് ശേഷം ശരിയായ verb form ഉപയോഗിക്കുക.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Ja → radim</p>
              <p className="text-sm text-slate-600 mt-1">ഞാൻ ചെയ്യുന്നു</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Ti → radiš</p>
              <p className="text-sm text-slate-600 mt-1">നീ ചെയ്യുന്നു</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">On/Ona → radi</p>
              <p className="text-sm text-slate-600 mt-1">അവൻ/അവൾ ചെയ്യുന്നു</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Mi → radimo</p>
              <p className="text-sm text-slate-600 mt-1">ഞങ്ങൾ ചെയ്യുന്നു</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Vi → radite</p>
              <p className="text-sm text-slate-600 mt-1">നിങ്ങൾ ചെയ്യുന്നു</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Oni → rade</p>
              <p className="text-sm text-slate-600 mt-1">അവർ ചെയ്യുന്നു</p>
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
            href="/grammar/biti"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            🔤 Biti
          </Link>

          <Link
            href="/grammar/pronouns"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            👤 Pronouns
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-purple-600 text-white px-5 py-3 font-bold hover:bg-purple-700"
          >
            📊 Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
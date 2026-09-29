"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    croatian: "Tko?",
    malayalam: "ആര്?",
    pronunciation: "ത്കോ",
    example: "Tko je on?",
    exampleMalayalam: "അവൻ ആരാണ്?",
  },
  {
    croatian: "Što?",
    malayalam: "എന്ത്?",
    pronunciation: "ഷ്ടോ",
    example: "Što je ovo?",
    exampleMalayalam: "ഇത് എന്താണ്?",
  },
  {
    croatian: "Gdje?",
    malayalam: "എവിടെ?",
    pronunciation: "ഗ്ദ്യേ",
    example: "Gdje radiš?",
    exampleMalayalam: "നീ എവിടെയാണ് ജോലി ചെയ്യുന്നത്?",
  },
  {
    croatian: "Kada?",
    malayalam: "എപ്പോൾ?",
    pronunciation: "കാദാ",
    example: "Kada radiš?",
    exampleMalayalam: "നീ എപ്പോഴാണ് ജോലി ചെയ്യുന്നത്?",
  },
  {
    croatian: "Kako?",
    malayalam: "എങ്ങനെ?",
    pronunciation: "കാക്കോ",
    example: "Kako si?",
    exampleMalayalam: "നിങ്ങൾക്ക് സുഖമാണോ?",
  },
  {
    croatian: "Zašto?",
    malayalam: "എന്തുകൊണ്ട്?",
    pronunciation: "സാഷ്ടോ",
    example: "Zašto radiš?",
    exampleMalayalam: "നീ എന്തുകൊണ്ടാണ് ജോലി ചെയ്യുന്നത്?",
  },
  {
    croatian: "Koliko?",
    malayalam: "എത്ര?",
    pronunciation: "കൊലിക്കോ",
    example: "Koliko košta?",
    exampleMalayalam: "എത്രയാണ് വില?",
  },
];

export default function QuestionsPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = questions[selectedIndex];

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
              Grammar Topic 05
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Questions
            </h1>

            <p className="text-slate-600 mt-2">
              Croatian-ൽ ചോദ്യങ്ങൾ എങ്ങനെ ചോദിക്കാം?
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 text-white p-7 md:p-10 shadow-lg">
          <p className="text-orange-100 font-bold">
            🇭🇷 ആദ്യം ഇത് മനസ്സിലാക്കുക
          </p>

          <h2 className="text-2xl md:text-3xl font-black mt-2">
            Question Words എന്താണ്?
          </h2>

          <p className="text-orange-50 leading-7 mt-4 max-w-3xl">
            ഒരാളോട് എന്തെങ്കിലും ചോദിക്കുമ്പോൾ Croatian-ൽ ചില പ്രത്യേക
            question words ഉപയോഗിക്കുന്നു. ആദ്യം ഈ പ്രധാന വാക്കുകൾ
            മനസ്സിലാക്കുന്നത് വളരെ സഹായകരമാണ്.
          </p>

          <div className="mt-5 rounded-2xl bg-white/10 p-5">
            <p className="font-bold">Example:</p>

            <p className="text-2xl font-black mt-2">
              Kako si?
            </p>

            <p className="text-orange-100 mt-1">
              നിങ്ങൾക്ക് സുഖമാണോ?
            </p>
          </div>

          <button
            onClick={() =>
              speak("Tko? Što? Gdje? Kada? Kako? Zašto? Koliko?")
            }
            className="mt-5 rounded-2xl bg-white text-orange-700 px-5 py-3 font-black hover:bg-orange-50"
          >
            🔊 Question Words കേൾക്കുക
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">
            Croatian Question Words
          </h2>

          <p className="text-slate-600 mt-1">
            ഓരോ വാക്കിലും click ചെയ്ത് pronunciation കേൾക്കാം.
          </p>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {questions.map((item, index) => (
              <button
                key={item.croatian}
                onClick={() => {
                  setSelectedIndex(index);
                  speak(item.croatian);
                }}
                className={
                  selectedIndex === index
                    ? "rounded-2xl bg-orange-500 text-white p-5 shadow-md"
                    : "rounded-2xl bg-white border border-slate-200 text-slate-900 p-5 hover:border-orange-300"
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
          <p className="text-xs font-black text-orange-600">
            SELECTED QUESTION
          </p>

          <div className="mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-20 rounded-3xl bg-orange-50 flex items-center justify-center text-2xl font-black text-orange-700 px-3">
                  {selected.croatian}
                </div>

                <div>
                  <p className="text-2xl font-black text-slate-900">
                    {selected.malayalam}
                  </p>

                  <p className="text-orange-700 font-semibold mt-1">
                    {selected.pronunciation}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => speak(selected.example)}
              className="rounded-2xl bg-orange-500 text-white px-6 py-4 font-black hover:bg-orange-600"
            >
              🔊 Example കേൾക്കുക
            </button>
          </div>

          <div className="mt-7 rounded-2xl bg-slate-50 p-6">
            <p className="text-xs font-bold text-slate-500">
              CROATIAN QUESTION
            </p>

            <p className="text-2xl font-black text-slate-900 mt-2">
              {selected.example}
            </p>

            <p className="text-orange-700 font-bold mt-3">
              {selected.exampleMalayalam}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-900">
            📚 Easy Question Table
          </h2>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid grid-cols-3 bg-slate-100 p-4 font-black text-slate-700">
              <span>Question</span>
              <span>Meaning</span>
              <span>Example</span>
            </div>

            {questions.map((item) => (
              <div
                key={item.croatian}
                className="grid grid-cols-3 p-4 border-t border-slate-200 gap-2"
              >
                <span className="font-black text-slate-900">
                  {item.croatian}
                </span>

                <span className="text-slate-700">
                  {item.malayalam}
                </span>

                <span className="font-semibold text-orange-700">
                  {item.example}
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
            ആദ്യം ഈ 7 question words ഓർമ്മിക്കുക. ദിവസേന സംസാരിക്കുമ്പോൾ
            ഇവ വളരെ അധികം ഉപയോഗിക്കാം.
          </p>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Tko?</p>
              <p className="text-sm text-slate-600 mt-1">ആര്?</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Što?</p>
              <p className="text-sm text-slate-600 mt-1">എന്ത്?</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Gdje?</p>
              <p className="text-sm text-slate-600 mt-1">എവിടെ?</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Kada?</p>
              <p className="text-sm text-slate-600 mt-1">എപ്പോൾ?</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Kako?</p>
              <p className="text-sm text-slate-600 mt-1">എങ്ങനെ?</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Zašto?</p>
              <p className="text-sm text-slate-600 mt-1">എന്തുകൊണ്ട്?</p>
            </div>

            <div className="bg-white rounded-xl p-4">
              <p className="font-black">Koliko?</p>
              <p className="text-sm text-slate-600 mt-1">എത്ര?</p>
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
            href="/grammar/present"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            📚 Present Tense
          </Link>

          <Link
            href="/grammar/biti"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            🔤 Biti
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-orange-500 text-white px-5 py-3 font-bold hover:bg-orange-600"
          >
            📊 Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
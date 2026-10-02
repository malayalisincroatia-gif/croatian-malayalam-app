"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const XP_KEY = "croatian-easy-xp";
const COMPLETE_KEY = "croatian-easy-a1-bank-completed";

const questions = [
  {
    croatian: "Gdje je banka?",
    malayalam: "ബാങ്ക് എവിടെയാണ്?",
    pronunciation: "ഗ്ദ്യേ യെ ബാങ്കാ?",
    answer: "Banka je tamo.",
    words: [
      ["Gdje", "എവിടെ"],
      ["je", "ആണ്"],
      ["banka", "ബാങ്ക്"],
      ["tamo", "അവിടെ"],
    ],
  },
  {
    croatian: "Mogu li otvoriti račun?",
    malayalam: "എനിക്ക് ഒരു അക്കൗണ്ട് തുറക്കാമോ?",
    pronunciation: "മോഗു ലി ഒത്വൊരിതി രാചുൻ?",
    answer: "Da, možete otvoriti račun.",
    words: [
      ["Mogu li", "എനിക്ക് കഴിയുമോ"],
      ["otvoriti", "തുറക്കാൻ"],
      ["račun", "അക്കൗണ്ട്"],
    ],
  },
  {
    croatian: "Trebam novac.",
    malayalam: "എനിക്ക് പണം വേണം.",
    pronunciation: "ത്രെബാം നോവാത്സ്.",
    answer: "Trebam novac.",
    words: [
      ["Trebam", "എനിക്ക് വേണം"],
      ["novac", "പണം"],
    ],
  },
  {
    croatian: "Mogu li podići novac?",
    malayalam: "എനിക്ക് പണം പിൻവലിക്കാമോ?",
    pronunciation: "മോഗു ലി പോദിച്ചി നോവാത്സ്?",
    answer: "Da, možete podići novac.",
    words: [
      ["Mogu li", "എനിക്ക് കഴിയുമോ"],
      ["podići", "പിൻവലിക്കാൻ"],
      ["novac", "പണം"],
    ],
  },
  {
    croatian: "Mogu li platiti karticom?",
    malayalam: "എനിക്ക് കാർഡ് ഉപയോഗിച്ച് പണമടയ്ക്കാമോ?",
    pronunciation: "മോഗു ലി പ്ലാതിതി കാർതിത്സോം?",
    answer: "Da, možete platiti karticom.",
    words: [
      ["Mogu li", "എനിക്ക് കഴിയുമോ"],
      ["platiti", "പണമടയ്ക്കാൻ"],
      ["karticom", "കാർഡ് ഉപയോഗിച്ച്"],
    ],
  },
];

export default function BankPage() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState("");
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const savedXP = Number(localStorage.getItem(XP_KEY) || "0");
    setXp(savedXP);

    const savedCompleted = JSON.parse(
      localStorage.getItem(COMPLETE_KEY) || "[]"
    );

    setCompleted(savedCompleted);
  }, []);

  function addXP(amount: number) {
    const currentXP = Number(
      localStorage.getItem(XP_KEY) || "0"
    );

    const newXP = currentXP + amount;

    localStorage.setItem(XP_KEY, String(newXP));
    setXp(newXP);
  }

  function listen(text: string) {
    if (typeof window === "undefined") return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hr-HR";
    utterance.rate = 0.85;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  }

  function showCorrectAnswer() {
    setShowAnswer(true);

    if (!completed.includes(current)) {
      const newCompleted = [...completed, current];

      setCompleted(newCompleted);

      localStorage.setItem(
        COMPLETE_KEY,
        JSON.stringify(newCompleted)
      );

      addXP(10);
    }
  }

  function nextQuestion() {
    setShowAnswer(false);
    setSelected("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  if (current >= questions.length) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 rounded-3xl p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>

            <h1 className="text-3xl font-bold mb-3">
              Bank Lesson Complete!
            </h1>

            <p className="text-slate-300 mb-6">
              അഭിനന്ദനങ്ങൾ! Bank lesson പൂർത്തിയായി.
            </p>

            <div className="text-yellow-400 text-2xl font-bold mb-8">
              ⭐ XP: {xp}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/situations"
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                All Situations
              </Link>

              <Link
                href="/dashboard"
                className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const question = questions[current];

  const choices = [
    question.answer,
    ...questions
      .filter((_, index) => index !== current)
      .slice(0, 2)
      .map((item) => item.answer),
  ].sort();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <Link
            href="/situations"
            className="text-slate-300 hover:text-white"
          >
            ← Situations
          </Link>

          <div className="text-yellow-400 font-bold">
            ⭐ {xp} XP
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>🇭🇷 A1 • Bank</span>

            <span>
              {current + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <section className="bg-white text-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl">

          <div className="mb-8">
            <div className="text-sm font-semibold text-blue-600 mb-3">
              SITUATION • BANK
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              {question.croatian}
            </h1>

            <p className="text-2xl mb-3">
              {question.malayalam}
            </p>

            <p className="text-lg text-slate-500">
              🗣️ {question.pronunciation}
            </p>
          </div>

          <button
            onClick={() => listen(question.croatian)}
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 mb-8"
          >
            {isPlaying ? "🔊 Playing..." : "🔊 Listen Croatian"}
          </button>

          <div className="border-t pt-8">

            <h2 className="text-xl font-bold mb-4">
              Choose the correct answer
            </h2>

            <div className="grid gap-3">
              {choices.map((choice) => (
                <button
                  key={choice}
                  onClick={() => setSelected(choice)}
                  className={`text-left p-4 rounded-xl border-2 transition ${
                    selected === choice
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>

            <button
              onClick={showCorrectAnswer}
              className="mt-5 w-full py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700"
            >
              Show Correct Answer
            </button>

            {showAnswer && (
              <div className="mt-6">

                <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
                  <div className="text-sm text-green-700 font-semibold mb-2">
                    CORRECT ANSWER
                  </div>

                  <div className="text-2xl font-bold text-green-900">
                    {question.answer}
                  </div>

                  <div className="text-green-700 mt-2">
                    +10 XP
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold text-lg mb-3">
                    Word Breakdown
                  </h3>

                  <div className="grid gap-2">
                    {question.words.map(([word, meaning]) => (
                      <div
                        key={word}
                        className="flex justify-between p-3 rounded-xl bg-slate-100"
                      >
                        <span className="font-semibold">
                          {word}
                        </span>

                        <span className="text-slate-600">
                          {meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {current < questions.length - 1 ? (
                  <button
                    onClick={nextQuestion}
                    className="mt-6 w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrent(questions.length)}
                    className="mt-6 w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700"
                  >
                    Complete Lesson 🎉
                  </button>
                )}

              </div>
            )}

          </div>
        </section>
      </div>
    </main>
  );
}
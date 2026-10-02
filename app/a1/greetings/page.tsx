"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const questions = [
  {
    croatian: "Dobar dan!",
    malayalam: "നമസ്കാരം!",
    pronunciation: "ദോബർ ദാൻ",
    answer: "Dobar dan!",
    words: [
      ["Dobar", "നല്ല", "ദോബർ"],
      ["dan", "ദിവസം", "ദാൻ"],
    ],
  },
  {
    croatian: "Dobro jutro!",
    malayalam: "സുപ്രഭാതം!",
    pronunciation: "ദോബ്രോ യുത്രോ",
    answer: "Dobro jutro!",
    words: [
      ["Dobro", "നല്ല", "ദോബ്രോ"],
      ["jutro", "രാവിലെ", "യുത്രോ"],
    ],
  },
  {
    croatian: "Dobra večer!",
    malayalam: "ശുഭ സായാഹ്നം!",
    pronunciation: "ദോബ്ര വെചെർ",
    answer: "Dobra večer!",
    words: [
      ["Dobra", "നല്ല", "ദോബ്ര"],
      ["večer", "വൈകുന്നേരം", "വെചെർ"],
    ],
  },
  {
    croatian: "Bok!",
    malayalam: "ഹായ്!",
    pronunciation: "ബോക്",
    answer: "Bok!",
    words: [["Bok", "ഹായ്", "ബോക്"]],
  },
  {
    croatian: "Kako si?",
    malayalam: "സുഖമാണോ?",
    pronunciation: "കാക്കോ സി",
    answer: "Kako si?",
    words: [
      ["Kako", "എങ്ങനെ", "കാക്കോ"],
      ["si", "ആണ്", "സി"],
    ],
  },
];

const TOTAL_XP_KEY = "croatian-easy-xp";

export default function GreetingsLesson() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = questions[current];

  useEffect(() => {
    const savedXP = Number(
      localStorage.getItem(TOTAL_XP_KEY) || "0"
    );

    const savedCompleted = Number(
      localStorage.getItem(
        "croatian-easy-greetings-completed"
      ) || "0"
    );

    setXp(savedXP);
    setCompleted(savedCompleted >= questions.length);
  }, []);

  const speak = (text: string) => {
    if (typeof window === "undefined") return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hr-HR";
    utterance.rate = 0.85;

    window.speechSynthesis.speak(utterance);
  };

  const showCorrectAnswer = () => {
    if (showAnswer) return;

    setShowAnswer(true);

    const newXP = xp + 10;

    setXp(newXP);

    localStorage.setItem(
      TOTAL_XP_KEY,
      String(newXP)
    );

    const oldCompleted = Number(
      localStorage.getItem(
        "croatian-easy-greetings-completed"
      ) || "0"
    );

    const newCompleted = Math.max(
      oldCompleted,
      current + 1
    );

    localStorage.setItem(
      "croatian-easy-greetings-completed",
      String(newCompleted)
    );

    if (newCompleted >= questions.length) {
      setCompleted(true);
    }
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setShowAnswer(false);
    }
  };

  const progress =
    ((current + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-4xl px-4 py-8">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">

          <Link
            href="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            ← Home
          </Link>

          <div className="font-bold text-orange-600">
            ⭐ XP: {xp}
          </div>

        </div>

        {/* TITLE */}
        <div className="mb-6 rounded-3xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                A1 • Greetings
              </p>

              <h1 className="mt-1 text-3xl font-black text-gray-900">
                Croatian Greetings
              </h1>

              <p className="mt-2 text-gray-600">
                Croatian greetings മലയാളത്തിൽ പഠിക്കാം.
              </p>

            </div>

            <div className="text-right">

              <div className="text-sm text-gray-500">
                Question
              </div>

              <div className="text-2xl font-black text-gray-900">
                {current + 1}/{questions.length}
              </div>

            </div>

          </div>

          {/* PROGRESS */}
          <div className="mt-5">

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* QUESTION CARD */}
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">

          <div className="text-center">

            <div className="mb-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">
              CROATIAN GREETING
            </div>

            <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
              {question.croatian}
            </h2>

            <p className="mt-3 text-xl text-gray-600">
              {question.malayalam}
            </p>

            <p className="mt-2 text-lg font-semibold text-purple-600">
              {question.pronunciation}
            </p>

            {/* LISTEN ONLY */}
            <button
              onClick={() =>
                speak(question.croatian)
              }
              className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-bold text-white transition hover:bg-purple-700"
            >
              🔊 Listen
            </button>

          </div>

          {/* WORD BREAKDOWN */}
          <div className="mt-8">

            <h3 className="mb-3 text-lg font-black text-gray-900">
              Word Breakdown
            </h3>

            <div className="grid gap-3">

              {question.words.map(
                ([
                  croatian,
                  malayalam,
                  pronunciation,
                ]) => (

                  <div
                    key={croatian}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <div className="text-lg font-black text-gray-900">
                          {croatian}
                        </div>

                        <div className="text-gray-600">
                          {malayalam}
                        </div>

                      </div>

                      <div className="font-semibold text-purple-600">
                        {pronunciation}
                      </div>

                    </div>

                    {/* WORD AUDIO */}
                    <button
                      onClick={() =>
                        speak(croatian)
                      }
                      className="mt-3 rounded-lg bg-purple-100 px-3 py-2 text-sm font-bold text-purple-700 hover:bg-purple-200"
                    >
                      🔊 Listen
                    </button>

                  </div>

                )
              )}

            </div>

          </div>

          {/* ANSWER */}
          {!showAnswer ? (

            <button
              onClick={showCorrectAnswer}
              className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-lg font-black text-white transition hover:bg-green-700"
            >
              👀 Show Correct Answer
            </button>

          ) : (

            <div className="mt-8 rounded-2xl border-2 border-green-200 bg-green-50 p-5">

              <div className="text-sm font-bold uppercase tracking-wide text-green-700">
                Correct Answer
              </div>

              <div className="mt-1 text-2xl font-black text-green-900">
                {question.answer}
              </div>

              {/* ANSWER AUDIO */}
              <button
                onClick={() =>
                  speak(question.answer)
                }
                className="mt-4 rounded-xl bg-green-600 px-5 py-3 font-bold text-white hover:bg-green-700"
              >
                🔊 Listen Again
              </button>

            </div>

          )}

          {/* NEXT */}
          {showAnswer &&
            current < questions.length - 1 && (

              <button
                onClick={nextQuestion}
                className="mt-8 w-full rounded-2xl bg-blue-600 py-4 text-lg font-black text-white transition hover:bg-blue-700"
              >
                Next Question →
              </button>

            )}

          {/* COMPLETED */}
          {completed &&
            current === questions.length - 1 && (

              <div className="mt-8 rounded-3xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50 p-6 text-center">

                <div className="text-5xl">
                  🎉
                </div>

                <h3 className="mt-3 text-2xl font-black text-gray-900">
                  Lesson Completed!
                </h3>

                <p className="mt-2 text-gray-600">
                  Greetings lesson complete ആയി.
                </p>

                <div className="mt-5 flex flex-wrap justify-center gap-3">

                  <Link
                    href="/grammar"
                    className="rounded-xl bg-purple-600 px-5 py-3 font-bold text-white"
                  >
                    Grammar
                  </Link>

                  <Link
                    href="/vocabulary"
                    className="rounded-xl bg-green-600 px-5 py-3 font-bold text-white"
                  >
                    Vocabulary
                  </Link>

                  <Link
                    href="/dashboard"
                    className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white"
                  >
                    Dashboard
                  </Link>

                </div>

              </div>

            )}

        </div>

      </div>
    </main>
  );
}
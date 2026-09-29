"use client";

import { useState } from "react";
import Link from "next/link";

const listeningQuestions = [
  {
    croatian: "Dobar dan.",
    malayalam: "നമസ്കാരം / ശുഭദിനം.",
    pronunciation: "ദോബർ ദാൻ",
    options: [
      "നമസ്കാരം / ശുഭദിനം",
      "ഗുഡ് നൈറ്റ്",
      "നന്ദി",
      "വിട",
    ],
    answer: 0,
  },
  {
    croatian: "Kako ste?",
    malayalam: "സുഖമാണോ?",
    pronunciation: "കാക്കോ സ്തെ",
    options: [
      "എവിടെയാണ്?",
      "സുഖമാണോ?",
      "എത്രയാണ്?",
      "നന്ദി",
    ],
    answer: 1,
  },
  {
    croatian: "Hvala.",
    malayalam: "നന്ദി.",
    pronunciation: "ഹ്വാല",
    options: [
      "ദയവായി",
      "നമസ്കാരം",
      "നന്ദി",
      "വിട",
    ],
    answer: 2,
  },
  {
    croatian: "Koliko košta?",
    malayalam: "എത്രയാണ് വില?",
    pronunciation: "കൊളിക്കോ കോഷ്ടാ",
    options: [
      "എവിടെയാണ്?",
      "എത്രയാണ് വില?",
      "സുഖമാണോ?",
      "എനിക്ക് വിശക്കുന്നു",
    ],
    answer: 1,
  },
  {
    croatian: "Gdje je autobus?",
    malayalam: "ബസ് എവിടെയാണ്?",
    pronunciation: "ഗ്ദ്യേ യെ ഔതോബുസ്",
    options: [
      "ബസ് എവിടെയാണ്?",
      "ട്രെയിൻ എപ്പോഴാണ്?",
      "വില എത്രയാണ്?",
      "നന്ദി",
    ],
    answer: 0,
  },
  {
    croatian: "Trebam pomoć.",
    malayalam: "എനിക്ക് സഹായം വേണം.",
    pronunciation: "ത്രേബം പൊമോച്ച്",
    options: [
      "എനിക്ക് വെള്ളം വേണം.",
      "എനിക്ക് സഹായം വേണം.",
      "എനിക്ക് ജോലി വേണം.",
      "എനിക്ക് ഭക്ഷണം വേണം.",
    ],
    answer: 1,
  },
  {
    croatian: "Gdje je banka?",
    malayalam: "ബാങ്ക് എവിടെയാണ്?",
    pronunciation: "ഗ്ദ്യേ യെ ബാങ്കാ",
    options: [
      "ബാങ്ക് എവിടെയാണ്?",
      "ഡോക്ടർ എവിടെയാണ്?",
      "വീട് എവിടെയാണ്?",
      "ജോലി എവിടെയാണ്?",
    ],
    answer: 0,
  },
  {
    croatian: "Trebam liječnika.",
    malayalam: "എനിക്ക് ഒരു ഡോക്ടറെ വേണം.",
    pronunciation: "ത്രേബം ല്യേച്നികാ",
    options: [
      "എനിക്ക് ഒരു പോലീസ് ഓഫീസറെ വേണം.",
      "എനിക്ക് ഒരു ഡോക്ടറെ വേണം.",
      "എനിക്ക് ഒരു ടാക്സി വേണം.",
      "എനിക്ക് ഒരു ബാങ്ക് വേണം.",
    ],
    answer: 1,
  },
];

const XP_KEY = "croatian-easy-xp";
const LISTENING_XP_KEY = "croatian-easy-listening-xp";
const LISTENING_COMPLETED_KEY =
  "croatian-easy-listening-completed";

export default function ListeningPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = listeningQuestions[current];

  function speak(text: string, rate: number) {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hr-HR";
    utterance.rate = rate;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  function selectAnswer(index: number) {
    if (showAnswer) return;

    setSelected(index);
  }

  function checkAnswer() {
    if (selected === null) return;

    if (!showAnswer) {
      setShowAnswer(true);

      if (selected === question.answer) {
        const oldXP = Number(
          localStorage.getItem(XP_KEY) || "0"
        );

        const oldListeningXP = Number(
          localStorage.getItem(LISTENING_XP_KEY) || "0"
        );

        const oldCompleted = Number(
          localStorage.getItem(LISTENING_COMPLETED_KEY) || "0"
        );

        localStorage.setItem(
          XP_KEY,
          String(oldXP + 10)
        );

        localStorage.setItem(
          LISTENING_XP_KEY,
          String(oldListeningXP + 10)
        );

        localStorage.setItem(
          LISTENING_COMPLETED_KEY,
          String(oldCompleted + 1)
        );

        setCompleted((value) => value + 1);

        window.dispatchEvent(
          new Event("croatian-listening-progress")
        );
      }

      return;
    }

    if (current < listeningQuestions.length - 1) {
      setCurrent((value) => value + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setShowAnswer(false);
    setCompleted(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
            <div>
              <h1 className="text-2xl font-bold">
                Croatian Easy 🇭🇷
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Listening Practice
              </p>
            </div>

            <Link
              href="/dashboard"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center px-6 py-12">
          <div className="w-full rounded-3xl border border-blue-400/20 bg-blue-500/10 p-8 text-center shadow-2xl">
            <div className="text-6xl">🎧</div>

            <h2 className="mt-6 text-4xl font-black">
              Listening Complete!
            </h2>

            <p className="mt-4 text-slate-300">
              Listening practice പൂർത്തിയായി.
            </p>

            <div className="mt-8 rounded-2xl bg-black/20 p-6">
              <div className="text-sm text-slate-400">
                Correct Answers
              </div>

              <div className="mt-2 text-4xl font-black text-blue-300">
                {completed}/{listeningQuestions.length}
              </div>

              <div className="mt-2 text-sm text-yellow-300">
                +{completed * 10} XP
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={restart}
                className="rounded-2xl bg-blue-500 px-5 py-4 font-bold transition hover:bg-blue-400"
              >
                Practice Again
              </button>

              <Link
                href="/dashboard"
                className="rounded-2xl bg-white px-5 py-4 font-bold text-slate-900 transition hover:bg-blue-50"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const progress = Math.round(
    (current / listeningQuestions.length) * 100
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              Croatian Easy 🇭🇷
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Croatian Listening Practice
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-10">
        <section className="mb-8">
          <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Listening Practice
          </div>

          <h2 className="mt-2 text-4xl font-black sm:text-5xl">
            കേൾക്കാം → മനസ്സിലാക്കാം 🎧
          </h2>

          <p className="mt-4 max-w-2xl text-slate-400">
            Croatian sentence ആദ്യം കേൾക്കുക.
            പിന്നെ ശരിയായ Malayalam meaning തിരഞ്ഞെടുക്കുക.
          </p>
        </section>

        <section className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-400">
              Question {current + 1} / {listeningQuestions.length}
            </span>

            <span className="font-bold text-blue-300">
              {progress}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{
                width:
                  String(progress) + "%",
              }}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-7 shadow-2xl sm:p-10">
          <div className="text-center">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              Listen Carefully
            </div>

            <h3 className="mt-5 text-4xl font-black sm:text-5xl">
              {question.croatian}
            </h3>

            <p className="mt-4 text-lg text-slate-300">
              {question.pronunciation}
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() =>
                  speak(question.croatian, 0.85)
                }
                className="rounded-2xl bg-blue-500 px-6 py-4 font-bold transition hover:bg-blue-400"
              >
                🔊 Play Audio
              </button>

              <button
                onClick={() =>
                  speak(question.croatian, 0.55)
                }
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 font-bold transition hover:bg-white/20"
              >
                🐢 Slow Audio
              </button>
            </div>
          </div>

          <div className="mt-10">
            <div className="mb-4 text-sm font-semibold text-slate-300">
              ഇത് എന്താണ് അർത്ഥം?
            </div>

            <div className="grid gap-3">
              {question.options.map((option, index) => {
                const isSelected = selected === index;
                const isCorrect =
                  showAnswer && index === question.answer;
                const isWrong =
                  showAnswer &&
                  isSelected &&
                  index !== question.answer;

                let optionClass =
                  "border-white/10 bg-white/5 hover:bg-white/10";

                if (isSelected && !showAnswer) {
                  optionClass =
                    "border-blue-400 bg-blue-500/20";
                }

                if (isCorrect) {
                  optionClass =
                    "border-green-400 bg-green-500/20";
                }

                if (isWrong) {
                  optionClass =
                    "border-red-400 bg-red-500/20";
                }

                return (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={
                      "rounded-2xl border p-5 text-left font-semibold transition " +
                      optionClass
                    }
                  >
                    <span className="mr-3 text-blue-300">
                      {index + 1}.
                    </span>

                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          {showAnswer && (
            <div className="mt-7 rounded-2xl border border-green-400/20 bg-green-500/10 p-5">
              <div className="font-bold text-green-300">
                Correct Answer
              </div>

              <div className="mt-2 text-lg font-bold">
                {question.malayalam}
              </div>

              <div className="mt-2 text-sm text-slate-400">
                Croatian: {question.croatian}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Link
              href="/vocabulary"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center text-sm font-bold hover:bg-white/10"
            >
              📖 Vocabulary
            </Link>

            <button
              onClick={checkAnswer}
              disabled={selected === null}
              className="rounded-2xl bg-white px-6 py-4 font-bold text-slate-900 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {!showAnswer
                ? "Check Answer"
                : current < listeningQuestions.length - 1
                ? "Next Question →"
                : "Finish Practice"}
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <div className="text-2xl">🎧</div>
            <div className="mt-2 text-sm text-slate-400">
              Listen
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <div className="text-2xl">🧠</div>
            <div className="mt-2 text-sm text-slate-400">
              Understand
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
            <div className="text-2xl">⭐</div>
            <div className="mt-2 text-sm text-slate-400">
              Earn XP
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
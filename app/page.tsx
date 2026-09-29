"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const lessons = [
  {
    title: "Greetings",
    malayalam: "അഭിവാദ്യങ്ങൾ",
    href: "/a1/greetings",
    icon: "👋",
    key: "croatian-easy-a1-greetings-completed",
  },
  {
    title: "Supermarket",
    malayalam: "സൂപ്പർമാർക്കറ്റ്",
    href: "/a1/supermarket",
    icon: "🛒",
    key: "croatian-easy-a1-supermarket-completed",
  },
  {
    title: "Restaurant",
    malayalam: "റെസ്റ്റോറന്റ്",
    href: "/a1/restaurant",
    icon: "🍽️",
    key: "croatian-easy-a1-restaurant-completed",
  },
  {
    title: "Transport",
    malayalam: "യാത്ര / ഗതാഗതം",
    href: "/a1/transport",
    icon: "🚌",
    key: "croatian-easy-a1-transport-completed",
  },
  {
    title: "Workplace",
    malayalam: "ജോലിസ്ഥലം",
    href: "/a1/workplace",
    icon: "💼",
    key: "croatian-easy-a1-workplace-completed",
  },
  {
    title: "Home",
    malayalam: "വീട്",
    href: "/a1/home",
    icon: "🏠",
    key: "croatian-easy-a1-home-completed",
  },
  {
    title: "Doctor",
    malayalam: "ഡോക്ടർ",
    href: "/a1/doctor",
    icon: "🏥",
    key: "croatian-easy-a1-doctor-completed",
  },
  {
    title: "Bank",
    malayalam: "ബാങ്ക്",
    href: "/a1/bank",
    icon: "🏦",
    key: "croatian-easy-a1-bank-completed",
  },
  {
    title: "MUP",
    malayalam: "MUP / പോലീസ്",
    href: "/a1/mup",
    icon: "🏛️",
    key: "croatian-easy-a1-mup-completed",
  },
];

const SPEAKING_XP_KEY = "croatian-easy-speaking-xp";
const SPEAKING_COMPLETED_KEY = "croatian-easy-speaking-completed";

export default function HomePage() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [speakingXP, setSpeakingXP] = useState(0);
  const [speakingCompleted, setSpeakingCompleted] = useState(0);

  useEffect(() => {
    function loadProgress() {
      const newProgress: Record<string, number> = {};

      lessons.forEach((lesson) => {
        const saved = localStorage.getItem(lesson.key);

        if (!saved) {
          newProgress[lesson.key] = 0;
          return;
        }

        try {
          const data = JSON.parse(saved);

          if (Array.isArray(data)) {
            newProgress[lesson.key] = Math.min(data.length, 5);
          } else {
            newProgress[lesson.key] = 0;
          }
        } catch {
          newProgress[lesson.key] = 0;
        }
      });

      setProgress(newProgress);

      const savedSpeakingXP = Number(
        localStorage.getItem(SPEAKING_XP_KEY) || "0"
      );

      const savedSpeakingCompleted = Number(
        localStorage.getItem(SPEAKING_COMPLETED_KEY) || "0"
      );

      setSpeakingXP(Math.min(savedSpeakingXP, 50));
      setSpeakingCompleted(Math.min(savedSpeakingCompleted, 5));
    }

    loadProgress();

    const timer = window.setInterval(() => {
      loadProgress();
    }, 1000);

    window.addEventListener("focus", loadProgress);
    window.addEventListener("storage", loadProgress);

    window.addEventListener("croatian-speaking-progress", loadProgress);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", loadProgress);
      window.removeEventListener("storage", loadProgress);
      window.removeEventListener(
        "croatian-speaking-progress",
        loadProgress
      );
    };
  }, []);

  const completedQuestions = Object.values(progress).reduce(
    (total, value) => total + value,
    0
  );

  const totalQuestions = 45;

  const percentage =
    totalQuestions > 0
      ? Math.round((completedQuestions / totalQuestions) * 100)
      : 0;

  const speakingPercentage = Math.round(
    (speakingCompleted / 5) * 100
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-blue-600">
                Mallu2Croatian
              </p>

              <h1 className="text-4xl font-bold sm:text-5xl">
                A1 Croatian 🇭🇷
              </h1>

              <p className="mt-2 text-lg text-slate-600">
                മലയാളത്തിൽ എളുപ്പത്തിൽ Croatian പഠിക്കാം
              </p>
            </div>

            <nav className="flex flex-wrap gap-2">

              <Link
                href="/vocabulary"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white"
              >
                📚 Vocabulary
              </Link>

              <Link
                href="/situations"
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white"
              >
                Situations
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold"
              >
                Dashboard
              </Link>

            </nav>
          </div>
        </header>

        {/* A1 Progress */}
        <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                A1 Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                നിങ്ങളുടെ Croatian learning journey
              </p>
            </div>

            <div className="text-right">

              <p className="text-3xl font-bold text-blue-600">
                {percentage}%
              </p>

              <p className="text-xs text-slate-500">
                {completedQuestions}/{totalQuestions}
              </p>

            </div>

          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: percentage + "%",
              }}
            />

          </div>

        </section>

        {/* Vocabulary */}
        <section className="mb-8">

          <Link
            href="/vocabulary"
            className="block rounded-3xl bg-white p-6 shadow-sm transition hover:shadow-md"
          >

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-3xl">
                  📚
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Vocabulary
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Croatian വാക്കുകൾ മലയാളത്തിൽ പഠിക്കാം
                  </p>

                </div>

              </div>

              <div className="rounded-xl bg-blue-600 px-5 py-3 text-center font-bold text-white">
                Open Vocabulary →
              </div>

            </div>

          </Link>

        </section>

        {/* A1 Lessons */}
        <section>

          <h2 className="mb-2 text-2xl font-bold">
            A1 Lessons
          </h2>

          <p className="mb-5 text-sm text-slate-500">
            Daily life situations ഉപയോഗിച്ച് Croatian പഠിക്കാം.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {lessons.map((lesson) => {

              const completed = progress[lesson.key] || 0;

              const lessonPercentage = Math.round(
                (completed / 5) * 100
              );

              return (
                <Link
                  key={lesson.href}
                  href={lesson.href}
                  className="rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl">
                      {lesson.icon}
                    </div>

                    {completed === 5 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                        ✓ Completed
                      </span>
                    ) : null}

                  </div>

                  <h3 className="mt-5 text-lg font-bold">
                    {lesson.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {lesson.malayalam}
                  </p>

                  <div className="mt-5 flex justify-between text-xs">

                    <span className="text-slate-500">
                      Progress
                    </span>

                    <span className="font-bold text-blue-600">
                      {completed}/5
                    </span>

                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">

                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-300"
                      style={{
                        width: lessonPercentage + "%",
                      }}
                    />

                  </div>

                  <p className="mt-4 font-semibold text-blue-600">
                    {completed === 5
                      ? "Practice Again →"
                      : completed > 0
                      ? "Continue Learning →"
                      : "Start Lesson →"}
                  </p>

                </Link>
              );
            })}

          </div>

        </section>

        {/* Real-Life Situations */}
        <section className="mt-8">

          <Link
            href="/situations"
            className="block rounded-3xl bg-slate-900 p-6 text-white transition hover:bg-slate-800"
          >

            <h2 className="text-xl font-bold">
              🌍 Real-Life Situations
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Everyday Croatian situations practice ചെയ്യാം.
            </p>

            <p className="mt-4 font-bold">
              Open Situations →
            </p>

          </Link>

        </section>

        {/* Speaking Practice */}
        <section className="mt-8 rounded-3xl bg-blue-600 p-6 text-white">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-bold">
                🗣️ Speaking Practice
              </h2>

              <p className="mt-2 text-sm text-blue-100">
                Croatian sentences സംസാരിച്ച് practice ചെയ്യാം.
              </p>

              <p className="mt-2 text-xs text-blue-200">
                {speakingCompleted}/5 speaking exercises completed
              </p>

            </div>

            <div className="text-left sm:text-right">

              <p className="text-3xl font-bold">
                {speakingXP} XP
              </p>

              <p className="text-xs text-blue-100">
                {speakingPercentage}% completed
              </p>

            </div>

          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-blue-400/40">

            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{
                width: speakingPercentage + "%",
              }}
            />

          </div>

          <Link
            href="/a1/greetings"
            className="mt-5 inline-block rounded-xl bg-white px-5 py-3 font-bold text-blue-600 transition hover:bg-blue-50"
          >
            🎤 Practice Speaking →
          </Link>

        </section>

        {/* Footer */}
        <footer className="mt-10 pb-4 text-center">

          <p className="text-sm font-bold text-slate-500">
            Mallu2Croatian 🇮🇳 → 🇭🇷
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Learn Croatian in Malayalam
          </p>

        </footer>

      </div>
    </main>
  );
}
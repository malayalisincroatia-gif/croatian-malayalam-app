"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

export default function HomePage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    async function checkLogin() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setCheckingAuth(false);
    }

    checkLogin();
  }, []);

  useEffect(() => {
    if (checkingAuth) return;

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
    }

    loadProgress();

    const timer = window.setInterval(loadProgress, 1000);

    window.addEventListener("focus", loadProgress);
    window.addEventListener("storage", loadProgress);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", loadProgress);
      window.removeEventListener("storage", loadProgress);
    };
  }, [checkingAuth]);

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl">🇭🇷</div>

          <p className="mt-3 font-semibold text-slate-600">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  const completedQuestions = Object.values(progress).reduce(
    (total, value) => total + value,
    0
  );

  const totalQuestions = 45;

  const percentage =
    totalQuestions > 0
      ? Math.round((completedQuestions / totalQuestions) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">

        {/* Header */}
        <header className="mb-8">
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <div className="mb-3 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600">
                  Mallu2Croatian
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  A1 Croatian 🇭🇷
                </h1>

                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  മലയാളത്തിൽ എളുപ്പത്തിൽ Croatian പഠിക്കാം.
                  <br />
                  Real-life situations, vocabulary, pronunciation, quizzes & practice.
                </p>
              </div>

              <nav className="flex flex-wrap gap-2">

                <Link
                  href="/vocabulary"
                  className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  📚 Vocabulary
                </Link>

                {/* NEW: Croatian Alphabet */}
                <Link
                  href="/alphabet"
                  className="rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
                >
                  🇭🇷 Alphabet
                </Link>

                <Link
                  href="/numbers"
                  className="rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
                >
                  🔢 Numbers
                </Link>

                <Link
                  href="/situations"
                  className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  🌍 Situations
                </Link>

                <Link
                  href="/dashboard"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold transition hover:bg-slate-50"
                >
                  📊 Dashboard
                </Link>

              </nav>

            </div>
          </div>
        </header>

        {/* Progress */}
        <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
                Your Progress
              </p>

              <h2 className="mt-1 text-2xl font-extrabold">
                A1 Learning Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                നിങ്ങളുടെ Croatian learning journey
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-4xl font-extrabold text-blue-600">
                {percentage}%
              </p>

              <p className="text-xs font-medium text-slate-500">
                {completedQuestions} / {totalQuestions} questions
              </p>
            </div>

          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </section>

        {/* Quick Access */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* Vocabulary */}
          <Link
            href="/vocabulary"
            className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                📚
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-extrabold">
                  Vocabulary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Croatian വാക്കുകൾ മലയാളത്തിൽ പഠിക്കാം
                </p>
              </div>

              <span className="text-xl text-blue-600 transition group-hover:translate-x-1">
                →
              </span>

            </div>
          </Link>

          {/* Numbers */}
          <Link
            href="/numbers"
            className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                🔢
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-extrabold">
                  Numbers 1–100
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Croatian numbers audio സഹിതം പഠിക്കാം
                </p>
              </div>

              <span className="text-xl text-emerald-600 transition group-hover:translate-x-1">
                →
              </span>

            </div>
          </Link>

          {/* Vocabulary Practice */}
          <Link
            href="/vocabulary/practice"
            className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-3xl">
                🧠
              </div>

              <div className="flex-1">
                <h2 className="text-xl font-extrabold">
                  Vocabulary Practice
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  പഠിച്ച വാക്കുകൾ quiz വഴി practice ചെയ്യാം
                </p>
              </div>

              <span className="text-xl text-purple-600 transition group-hover:translate-x-1">
                →
              </span>

            </div>
          </Link>

        </section>

        {/* A1 Lessons */}
        <section>
          <div className="mb-5">

            <p className="text-sm font-bold uppercase tracking-wide text-blue-600">
              Learn by Situation
            </p>

            <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
              A1 Lessons
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Daily life situations ഉപയോഗിച്ച് Croatian പഠിക്കാം.
            </p>

          </div>

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
                  className="group rounded-3xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-2xl">
                      {lesson.icon}
                    </div>

                    {completed === 5 && (
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        ✓ Completed
                      </span>
                    )}

                  </div>

                  <h3 className="mt-5 text-lg font-extrabold">
                    {lesson.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {lesson.malayalam}
                  </p>

                  <div className="mt-5 flex items-center justify-between text-xs">

                    <span className="font-medium text-slate-500">
                      Progress
                    </span>

                    <span className="font-extrabold text-blue-600">
                      {completed}/5
                    </span>

                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all duration-500"
                      style={{
                        width: `${lessonPercentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-4 font-bold text-blue-600 transition group-hover:translate-x-1">
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
            className="group block rounded-3xl bg-slate-900 p-6 text-white transition hover:bg-slate-800 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-blue-300">
                  Practice
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">
                  🌍 Real-Life Situations
                </h2>

                <p className="mt-2 text-sm text-slate-300">
                  Everyday Croatian situations practice ചെയ്യാം.
                </p>
              </div>

              <span className="font-extrabold text-white transition group-hover:translate-x-1">
                Open Situations →
              </span>

            </div>
          </Link>

        </section>

        {/* Footer */}
        <footer className="mt-10 pb-4 text-center">

          <p className="text-sm font-extrabold text-slate-500">
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
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const situations = [
  {
    name: "Greetings",
    malayalam: "അഭിവാദ്യങ്ങൾ",
    description: "ദൈനംദിന greeting, introduction, polite expressions.",
    icon: "👋",
    path: "/a1/greetings",
    key: "croatian-easy-a1-greetings-completed",
  },
  {
    name: "Supermarket",
    malayalam: "സൂപ്പർമാർക്കറ്റ്",
    description: "വാങ്ങൽ, വില ചോദിക്കൽ, payment തുടങ്ങിയവ.",
    icon: "🛒",
    path: "/a1/supermarket",
    key: "croatian-easy-a1-supermarket-completed",
  },
  {
    name: "Restaurant",
    malayalam: "റെസ്റ്റോറന്റ്",
    description: "Food order, menu, bill, payment എന്നിവ practice ചെയ്യാം.",
    icon: "🍽️",
    path: "/a1/restaurant",
    key: "croatian-easy-a1-restaurant-completed",
  },
  {
    name: "Transport",
    malayalam: "യാത്ര / ഗതാഗതം",
    description: "Bus, ticket, station, യാത്ര സംബന്ധമായ Croatian.",
    icon: "🚌",
    path: "/a1/transport",
    key: "croatian-easy-a1-transport-completed",
  },
  {
    name: "Workplace",
    malayalam: "ജോലിസ്ഥലം",
    description: "Job, working hours, break, workplace conversation.",
    icon: "🏭",
    path: "/a1/workplace",
    key: "croatian-easy-a1-workplace-completed",
  },
  {
    name: "Home",
    malayalam: "വീട്",
    description: "Home, rooms, objects, cleaning, daily activities.",
    icon: "🏠",
    path: "/a1/home",
    key: "croatian-easy-a1-home-completed",
  },
  {
    name: "Doctor",
    malayalam: "ഡോക്ടർ",
    description: "Symptoms, temperature, medicine, doctor conversation.",
    icon: "🩺",
    path: "/a1/doctor",
    key: "croatian-easy-a1-doctor-completed",
  },
  {
    name: "Bank",
    malayalam: "ബാങ്ക്",
    description: "Account, money, withdrawal, card payment.",
    icon: "🏦",
    path: "/a1/bank",
    key: "croatian-easy-a1-bank-completed",
  },
  {
    name: "MUP",
    malayalam: "MUP / Police",
    description: "Residence, documents, appointments, applications.",
    icon: "🏛️",
    path: "/a1/mup",
    key: "croatian-easy-a1-mup-completed",
  },
];

export default function SituationsPage() {
  const [progress, setProgress] = useState<Record<string, number>>({});

  function loadProgress() {
    if (typeof window === "undefined") return;

    const data: Record<string, number> = {};

    situations.forEach((situation) => {
      try {
        const saved = localStorage.getItem(situation.key);

        const completedIndexes = saved
          ? JSON.parse(saved)
          : [];

        const count = Array.isArray(completedIndexes)
          ? Math.min(completedIndexes.length, 5)
          : 0;

        data[situation.key] = count;
      } catch {
        data[situation.key] = 0;
      }
    });

    setProgress(data);
  }

  useEffect(() => {
    loadProgress();

    const interval = setInterval(() => {
      loadProgress();
    }, 1000);

    window.addEventListener("focus", loadProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  const completedLessons = situations.filter(
    (situation) => progress[situation.key] === 5
  ).length;

  const completedQuestions = situations.reduce(
    (total, situation) =>
      total + (progress[situation.key] || 0),
    0
  );

  const totalQuestions = situations.length * 5;

  const overallProgress = Math.round(
    (completedQuestions / totalQuestions) * 100
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      {/* HEADER */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              Croatian Easy 🇭🇷
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Real-life Croatian through Malayalam
            </p>
          </div>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Dashboard
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* HERO */}
        <section className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-8 shadow-2xl">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-300">
              A1 Croatian
            </div>

            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Learn Croatian Through Real Situations
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-300">
              ജീവിതത്തിൽ ശരിക്കും ഉപയോഗിക്കുന്ന Croatian sentences
              പഠിക്കാം. കേൾക്കുക, സംസാരിക്കുക, answer ചെയ്യുക,
              practice ചെയ്യുക.
            </p>
          </div>

          {/* OVERALL PROGRESS */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-400">
                  A1 Overall Progress
                </p>

                <p className="mt-1 text-xl font-bold">
                  {completedLessons}/9 lessons completed
                </p>
              </div>

              <div className="text-3xl font-black text-blue-300">
                {overallProgress}%
              </div>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/40">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-500"
                style={{
                  width: `${overallProgress}%`,
                }}
              />
            </div>

            <p className="mt-2 text-right text-xs text-slate-500">
              {completedQuestions}/{totalQuestions} questions
            </p>
          </div>
        </section>

        {/* SITUATIONS */}
        <section className="mt-12">
          <div className="mb-7">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Choose a Situation
            </div>

            <h3 className="mt-2 text-3xl font-bold">
              Everyday Croatian
            </h3>

            <p className="mt-2 text-slate-400">
              നിങ്ങളുടെ daily life-ൽ ഉപയോഗിക്കാവുന്ന Croatian
              ആദ്യം practice ചെയ്യാം.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((situation, index) => {
              const completed =
                progress[situation.key] || 0;

              const percentage = Math.round(
                (completed / 5) * 100
              );

              const isComplete = completed === 5;

              return (
                <div
                  key={situation.key}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/10"
                >
                  {/* NUMBER */}
                  <div className="absolute right-5 top-5 text-xs font-bold text-slate-600">
                    A1 · {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* ICON */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                    {situation.icon}
                  </div>

                  {/* TITLE */}
                  <h4 className="mt-6 text-2xl font-bold">
                    {situation.name}
                  </h4>

                  <p className="mt-1 font-medium text-blue-300">
                    {situation.malayalam}
                  </p>

                  <p className="mt-4 min-h-[48px] text-sm leading-6 text-slate-400">
                    {situation.description}
                  </p>

                  {/* PROGRESS */}
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Lesson Progress
                      </span>

                      <span className="font-bold text-blue-300">
                        {completed}/5
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-black/40">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isComplete
                            ? "bg-green-500"
                            : "bg-blue-500"
                        }`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="mt-5">
                    {isComplete ? (
                      <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15">
                          ✓
                        </span>

                        Lesson Completed
                      </div>
                    ) : completed > 0 ? (
                      <div className="flex items-center gap-2 text-sm font-semibold text-yellow-300">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500/15">
                          →
                        </span>

                        Continue Learning
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                          ▶
                        </span>

                        Not Started
                      </div>
                    )}
                  </div>

                  {/* BUTTON */}
                  <Link
                    href={situation.path}
                    className={`mt-6 block rounded-2xl px-5 py-3 text-center text-sm font-bold transition ${
                      isComplete
                        ? "bg-green-500 text-white hover:bg-green-400"
                        : "bg-white text-slate-900 hover:bg-blue-50"
                    }`}
                  >
                    {isComplete
                      ? "Practice Again"
                      : completed > 0
                      ? "Continue Learning"
                      : "Start Lesson"}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="mt-14">
          <div className="mb-7">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Learning Method
            </div>

            <h3 className="mt-2 text-3xl font-bold">
              How Each Lesson Works
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl">👀</div>

              <h4 className="mt-4 font-bold">
                1. Read
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Croatian sentence വായിച്ച് Malayalam meaning
                മനസ്സിലാക്കുക.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl">🔊</div>

              <h4 className="mt-4 font-bold">
                2. Listen
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Croatian pronunciation കേട്ട് practice ചെയ്യുക.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl">🎤</div>

              <h4 className="mt-4 font-bold">
                3. Speak
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Answer Croatian-ൽ സംസാരിച്ച് practice ചെയ്യുക.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-3xl">🏆</div>

              <h4 className="mt-4 font-bold">
                4. Complete
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Questions complete ചെയ്ത് XP നേടുക.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-8 text-center">
          <div className="text-4xl">🇭🇷</div>

          <h3 className="mt-4 text-3xl font-black">
            Start With Your First Situation
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Croatian പഠിക്കാൻ വലിയ grammar lesson-ൽ നിന്ന്
            തുടങ്ങേണ്ടതില്ല. Daily life situation-ൽ നിന്ന്
            പഠിച്ചാൽ കൂടുതൽ എളുപ്പമാണ്.
          </p>

          <Link
            href="/a1/greetings"
            className="mt-6 inline-block rounded-2xl bg-white px-7 py-3 font-bold text-slate-900 transition hover:bg-blue-50"
          >
            Start Greetings 👋
          </Link>
        </section>
      </div>
    </main>
  );
}
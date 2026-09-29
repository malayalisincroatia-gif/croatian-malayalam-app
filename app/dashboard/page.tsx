"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const lessons = [
  {
    name: "Greetings",
    malayalam: "അഭിവാദ്യങ്ങൾ",
    path: "/a1/greetings",
    key: "croatian-easy-a1-greetings-completed",
    icon: "👋",
  },
  {
    name: "Supermarket",
    malayalam: "സൂപ്പർമാർക്കറ്റ്",
    path: "/a1/supermarket",
    key: "croatian-easy-a1-supermarket-completed",
    icon: "🛒",
  },
  {
    name: "Restaurant",
    malayalam: "റെസ്റ്റോറന്റ്",
    path: "/a1/restaurant",
    key: "croatian-easy-a1-restaurant-completed",
    icon: "🍽️",
  },
  {
    name: "Transport",
    malayalam: "യാത്ര / ഗതാഗതം",
    path: "/a1/transport",
    key: "croatian-easy-a1-transport-completed",
    icon: "🚌",
  },
  {
    name: "Workplace",
    malayalam: "ജോലിസ്ഥലം",
    path: "/a1/workplace",
    key: "croatian-easy-a1-workplace-completed",
    icon: "🏭",
  },
  {
    name: "Home",
    malayalam: "വീട്",
    path: "/a1/home",
    key: "croatian-easy-a1-home-completed",
    icon: "🏠",
  },
  {
    name: "Doctor",
    malayalam: "ഡോക്ടർ",
    path: "/a1/doctor",
    key: "croatian-easy-a1-doctor-completed",
    icon: "🩺",
  },
  {
    name: "Bank",
    malayalam: "ബാങ്ക്",
    path: "/a1/bank",
    key: "croatian-easy-a1-bank-completed",
    icon: "🏦",
  },
  {
    name: "MUP",
    malayalam: "MUP / Police",
    path: "/a1/mup",
    key: "croatian-easy-a1-mup-completed",
    icon: "🏛️",
  },
];

const totalQuestions = lessons.length * 5;

const vocabularyTotal = 100;
const vocabularyPracticeTotal = 27;

const listeningPracticeTotal = 8;

const speakingPracticeTotal = 5;

export default function DashboardPage() {
  const [xp, setXp] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lessonProgress, setLessonProgress] = useState<
    Record<string, number>
  >({});

  const [vocabularyXP, setVocabularyXP] = useState(0);
  const [vocabularyCompleted, setVocabularyCompleted] = useState(0);
  const [vocabularyProgress, setVocabularyProgress] = useState(0);

  const [listeningXP, setListeningXP] = useState(0);
  const [listeningCompleted, setListeningCompleted] = useState(0);
  const [listeningProgress, setListeningProgress] = useState(0);

  const [speakingXP, setSpeakingXP] = useState(0);
  const [speakingCompleted, setSpeakingCompleted] = useState(0);
  const [speakingProgress, setSpeakingProgress] = useState(0);

  function loadProgress() {
    if (typeof window === "undefined") return;

    const savedXP = Number(
      localStorage.getItem("croatian-easy-xp") || "0"
    );

    setXp(savedXP);

    let totalCompleted = 0;
    let totalLessonsCompleted = 0;

    const progressData: Record<string, number> = {};

    lessons.forEach((lesson) => {
      try {
        const saved = localStorage.getItem(lesson.key);

        const completedIndexes = saved
          ? JSON.parse(saved)
          : [];

        const count = Array.isArray(completedIndexes)
          ? completedIndexes.length
          : 0;

        const safeCount = Math.min(count, 5);

        progressData[lesson.key] = safeCount;

        totalCompleted += safeCount;

        if (safeCount === 5) {
          totalLessonsCompleted++;
        }
      } catch {
        progressData[lesson.key] = 0;
      }
    });

    setLessonProgress(progressData);
    setCompletedQuestions(totalCompleted);
    setCompletedLessons(totalLessonsCompleted);

    const percentage =
      totalQuestions > 0
        ? Math.round((totalCompleted / totalQuestions) * 100)
        : 0;

    setProgress(percentage);

    const savedVocabularyXP = Number(
      localStorage.getItem("croatian-easy-vocabulary-xp") || "0"
    );

    const savedVocabularyCompleted = Number(
      localStorage.getItem(
        "croatian-easy-vocabulary-completed"
      ) || "0"
    );

    const safeVocabularyCompleted = Math.min(
      savedVocabularyCompleted,
      vocabularyPracticeTotal
    );

    const vocabularyPercentage =
      vocabularyPracticeTotal > 0
        ? Math.round(
            (safeVocabularyCompleted /
              vocabularyPracticeTotal) *
              100
          )
        : 0;

    setVocabularyXP(savedVocabularyXP);
    setVocabularyCompleted(safeVocabularyCompleted);
    setVocabularyProgress(vocabularyPercentage);

    const savedListeningXP = Number(
      localStorage.getItem("croatian-easy-listening-xp") || "0"
    );

    const savedListeningCompleted = Number(
      localStorage.getItem(
        "croatian-easy-listening-completed"
      ) || "0"
    );

    const safeListeningCompleted = Math.min(
      savedListeningCompleted,
      listeningPracticeTotal
    );

    const listeningPercentage =
      listeningPracticeTotal > 0
        ? Math.round(
            (safeListeningCompleted /
              listeningPracticeTotal) *
              100
          )
        : 0;

    setListeningXP(savedListeningXP);
    setListeningCompleted(safeListeningCompleted);
    setListeningProgress(listeningPercentage);

    const savedSpeakingXP = Number(
      localStorage.getItem("croatian-easy-speaking-xp") || "0"
    );

    const savedSpeakingCompleted = Number(
      localStorage.getItem(
        "croatian-easy-speaking-completed"
      ) || "0"
    );

    const safeSpeakingCompleted = Math.min(
      savedSpeakingCompleted,
      speakingPracticeTotal
    );

    const speakingPercentage =
      speakingPracticeTotal > 0
        ? Math.round(
            (safeSpeakingCompleted /
              speakingPracticeTotal) *
              100
          )
        : 0;

    setSpeakingXP(savedSpeakingXP);
    setSpeakingCompleted(safeSpeakingCompleted);
    setSpeakingProgress(speakingPercentage);
  }

  useEffect(() => {
    loadProgress();

    const interval = setInterval(() => {
      loadProgress();
    }, 1000);

    window.addEventListener("focus", loadProgress);

    window.addEventListener(
      "croatian-vocabulary-progress",
      loadProgress
    );

    window.addEventListener(
      "croatian-listening-progress",
      loadProgress
    );

    window.addEventListener(
      "croatian-speaking-progress",
      loadProgress
    );

    return () => {
      clearInterval(interval);

      window.removeEventListener(
        "focus",
        loadProgress
      );

      window.removeEventListener(
        "croatian-vocabulary-progress",
        loadProgress
      );

      window.removeEventListener(
        "croatian-listening-progress",
        loadProgress
      );

      window.removeEventListener(
        "croatian-speaking-progress",
        loadProgress
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">
              Croatian Easy 🇭🇷
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Croatian പഠിക്കാം Malayalam വഴി
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition hover:bg-white/10"
          >
            Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-10">
          <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Learning Dashboard
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your Croatian Journey
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Croatian പഠിച്ച് daily practice ചെയ്യൂ.
            Lessons, Vocabulary, Listening, Speaking, Quiz എന്നിവ
            ഉപയോഗിച്ച് step by step മുന്നോട്ട് പോകാം.
          </p>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div className="text-3xl">⭐</div>

            <div className="mt-4 text-sm text-slate-400">
              Total XP
            </div>

            <div className="mt-1 text-3xl font-bold">
              {xp}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div className="text-3xl">📚</div>

            <div className="mt-4 text-sm text-slate-400">
              Lessons Completed
            </div>

            <div className="mt-1 text-3xl font-bold">
              {completedLessons}/9
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div className="text-3xl">🎯</div>

            <div className="mt-4 text-sm text-slate-400">
              Questions Completed
            </div>

            <div className="mt-1 text-3xl font-bold">
              {completedQuestions}/{totalQuestions}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div className="text-3xl">📈</div>

            <div className="mt-4 text-sm text-slate-400">
              A1 Progress
            </div>

            <div className="mt-1 text-3xl font-bold">
              {progress}%
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-blue-400/20 bg-blue-500/10 p-7 shadow-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                A1 Level
              </div>

              <h3 className="mt-1 text-2xl font-bold">
                Beginner Croatian
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {completedLessons} of 9 situations completed
              </p>
            </div>

            <div className="text-4xl font-black text-blue-300">
              {progress}%
            </div>
          </div>

          <div className="mt-6 h-4 overflow-hidden rounded-full bg-black/30">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{
                width: String(progress) + "%",
              }}
            />
          </div>

          <div className="mt-3 text-right text-xs text-slate-400">
            {completedQuestions} / {totalQuestions} questions
          </div>
        </section>

        {/* VOCABULARY */}

        <section className="mt-12">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Vocabulary
            </div>

            <h3 className="mt-1 text-3xl font-bold">
              Build Your Croatian Vocabulary
            </h3>

            <p className="mt-2 text-slate-400">
              100+ Croatian words Malayalam meaning,
              pronunciation, examples എന്നിവയോടെ പഠിക്കാം.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">📖</div>

              <div className="mt-5 text-sm text-slate-400">
                Vocabulary Words
              </div>

              <div className="mt-1 text-3xl font-bold">
                {vocabularyTotal}+
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Daily life Croatian vocabulary
              </p>

              <Link
                href="/vocabulary"
                className="mt-6 block rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-blue-50"
              >
                Open Vocabulary
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">🧠</div>

              <div className="mt-5 text-sm text-slate-400">
                Practice Completed
              </div>

              <div className="mt-1 text-3xl font-bold">
                {vocabularyCompleted}/
                {vocabularyPracticeTotal}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Correct vocabulary questions
              </p>

              <Link
                href="/vocabulary/practice"
                className="mt-6 block rounded-2xl bg-blue-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-400"
              >
                Practice Vocabulary
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">⭐</div>

              <div className="mt-5 text-sm text-slate-400">
                Vocabulary XP
              </div>

              <div className="mt-1 text-3xl font-bold">
                {vocabularyXP}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    Practice Progress
                  </span>

                  <span className="font-semibold text-blue-300">
                    {vocabularyProgress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-black/30">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{
                      width:
                        String(vocabularyProgress) + "%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LISTENING */}

        <section className="mt-12">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
              Listening
            </div>

            <h3 className="mt-1 text-3xl font-bold">
              Train Your Croatian Listening
            </h3>

            <p className="mt-2 text-slate-400">
              Croatian കേൾക്കുക → meaning മനസ്സിലാക്കുക →
              answer ചെയ്യുക.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6 shadow-xl">
              <div className="text-4xl">🎧</div>

              <div className="mt-5 text-sm text-slate-400">
                Listening Practice
              </div>

              <div className="mt-1 text-3xl font-bold">
                {listeningCompleted}/
                {listeningPracticeTotal}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Listening questions completed
              </p>

              <Link
                href="/listening"
                className="mt-6 block rounded-2xl bg-cyan-500 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-400"
              >
                Start Listening
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">⭐</div>

              <div className="mt-5 text-sm text-slate-400">
                Listening XP
              </div>

              <div className="mt-1 text-3xl font-bold">
                {listeningXP}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                XP earned from listening practice
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">📈</div>

              <div className="mt-5 text-sm text-slate-400">
                Listening Progress
              </div>

              <div className="mt-1 text-3xl font-bold">
                {listeningProgress}%
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-cyan-500 transition-all duration-500"
                  style={{
                    width:
                      String(listeningProgress) + "%",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SPEAKING */}

        <section className="mt-12">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-orange-400">
              Speaking
            </div>

            <h3 className="mt-1 text-3xl font-bold">
              Practice Croatian Speaking
            </h3>

            <p className="mt-2 text-slate-400">
              Croatian sentence കേൾക്കുക → microphone ഉപയോഗിച്ച്
              പറയുക → pronunciation check ചെയ്യുക.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-3xl border border-orange-400/20 bg-orange-500/10 p-6 shadow-xl">
              <div className="text-4xl">🎤</div>

              <div className="mt-5 text-sm text-slate-400">
                Speaking Practice
              </div>

              <div className="mt-1 text-3xl font-bold">
                {speakingCompleted}/
                {speakingPracticeTotal}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Speaking questions completed
              </p>

              <Link
                href="/a1/greetings"
                className="mt-6 block rounded-2xl bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-400"
              >
                Start Speaking
              </Link>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">⭐</div>

              <div className="mt-5 text-sm text-slate-400">
                Speaking XP
              </div>

              <div className="mt-1 text-3xl font-bold">
                {speakingXP}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                XP earned from correct speaking
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
              <div className="text-4xl">📈</div>

              <div className="mt-5 text-sm text-slate-400">
                Speaking Progress
              </div>

              <div className="mt-1 text-3xl font-bold">
                {speakingProgress}%
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-black/30">
                <div
                  className="h-full rounded-full bg-orange-500 transition-all duration-500"
                  style={{
                    width:
                      String(speakingProgress) + "%",
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* A1 SITUATIONS */}

        <section className="mt-12">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              A1 Situations
            </div>

            <h3 className="mt-1 text-3xl font-bold">
              Real Life Croatian
            </h3>

            <p className="mt-2 text-slate-400">
              Everyday life situations ഉപയോഗിച്ച് Croatian practice ചെയ്യാം.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => {
              const completed =
                lessonProgress[lesson.key] || 0;

              const lessonPercentage =
                Math.round((completed / 5) * 100);

              const isComplete = completed === 5;

              return (
                <div
                  key={lesson.key}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/10"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                      {lesson.icon}
                    </div>

                    {isComplete && (
                      <div className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-bold text-green-400">
                        ✓ Completed
                      </div>
                    )}
                  </div>

                  <h4 className="mt-5 text-xl font-bold">
                    {lesson.name}
                  </h4>

                  <p className="mt-1 text-sm text-slate-400">
                    {lesson.malayalam}
                  </p>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400">
                        Progress
                      </span>

                      <span className="font-semibold text-blue-300">
                        {completed}/5
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-black/30">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{
                          width:
                            String(lessonPercentage) + "%",
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    href={lesson.path}
                    className="mt-6 block rounded-2xl bg-white px-4 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-blue-50"
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

        {/* CEFR */}

        <section className="mt-12">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              CEFR Levels
            </div>

            <h3 className="mt-1 text-3xl font-bold">
              Your Learning Path
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                level: "A1",
                title: "Beginner",
                status: "Available",
                active: true,
              },
              {
                level: "A2",
                title: "Elementary",
                status: "Coming Soon",
                active: false,
              },
              {
                level: "B1",
                title: "Intermediate",
                status: "Coming Soon",
                active: false,
              },
              {
                level: "B2",
                title: "Upper Intermediate",
                status: "Coming Soon",
                active: false,
              },
              {
                level: "C1",
                title: "Advanced",
                status: "Coming Soon",
                active: false,
              },
              {
                level: "C2",
                title: "Mastery",
                status: "Coming Soon",
                active: false,
              },
            ].map((item) => (
              <div
                key={item.level}
                className={
                  "rounded-3xl border p-6 " +
                  (item.active
                    ? "border-blue-400/30 bg-blue-500/10"
                    : "border-white/10 bg-white/5 opacity-70")
                }
              >
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-black">
                    {item.level}
                  </div>

                  <div
                    className={
                      "rounded-full px-3 py-1 text-xs font-bold " +
                      (item.active
                        ? "bg-green-500/15 text-green-400"
                        : "bg-white/10 text-slate-400")
                    }
                  >
                    {item.status}
                  </div>
                </div>

                <div className="mt-4 text-lg font-bold">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* QUICK ACTIONS */}

        <section className="mt-12">
          <div className="mb-6">
            <div className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Quick Actions
            </div>

            <h3 className="mt-1 text-3xl font-bold">
              Keep Learning
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Link
              href="/vocabulary"
              className="rounded-3xl border border-blue-400/20 bg-blue-500/10 p-6 transition hover:bg-blue-500/20"
            >
              <div className="text-3xl">📖</div>

              <h4 className="mt-4 text-xl font-bold">
                Vocabulary
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                100+ Croatian words പഠിക്കാം.
              </p>
            </Link>

            <Link
              href="/vocabulary/practice"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <div className="text-3xl">🧠</div>

              <h4 className="mt-4 text-xl font-bold">
                Vocabulary Practice
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Vocabulary quiz practice ചെയ്യൂ.
              </p>
            </Link>

            <Link
              href="/listening"
              className="rounded-3xl border border-cyan-400/20 bg-cyan-500/10 p-6 transition hover:bg-cyan-500/20"
            >
              <div className="text-3xl">🎧</div>

              <h4 className="mt-4 text-xl font-bold">
                Listening Practice
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Croatian കേട്ട് meaning മനസ്സിലാക്കാം.
              </p>
            </Link>

            <Link
              href="/a1/greetings"
              className="rounded-3xl border border-orange-400/20 bg-orange-500/10 p-6 transition hover:bg-orange-500/20"
            >
              <div className="text-3xl">🎤</div>

              <h4 className="mt-4 text-xl font-bold">
                Speaking Practice
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Croatian സംസാരിച്ച് practice ചെയ്യൂ.
              </p>
            </Link>

            <Link
              href="/situations"
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <div className="text-3xl">🌍</div>

              <h4 className="mt-4 text-xl font-bold">
                Real Situations
              </h4>

              <p className="mt-2 text-sm text-slate-400">
                Daily life situations പഠിക്കാം.
              </p>
            </Link>
          </div>
        </section>

        {/* TIP */}

        <section className="mt-12 rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-6">
          <div className="flex gap-4">
            <div className="text-3xl">💡</div>

            <div>
              <h4 className="font-bold text-yellow-300">
                Learning Tip
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                ദിവസവും കുറച്ച് സമയം Croatian practice ചെയ്യുക.
                ആദ്യം vocabulary പഠിക്കുക → sentence കേൾക്കുക →
                Malayalam meaning നോക്കുക → Croatian answer പറയുക →
                പിന്നെ speaking practice ചെയ്യുക.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
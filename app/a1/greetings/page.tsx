"use client";

import { useEffect, useRef, useState } from "react";
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

const SPEAKING_XP_PER_QUESTION = 10;
const SPEAKING_COMPLETED_KEY = "croatian-easy-speaking-completed";
const SPEAKING_XP_KEY = "croatian-easy-speaking-xp";
const SPEAKING_ANSWERED_KEY = "croatian-easy-speaking-answered";
const TOTAL_XP_KEY = "croatian-easy-xp";

export default function GreetingsLesson() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [speechResult, setSpeechResult] = useState("");

  const [speakingXP, setSpeakingXP] = useState(0);
  const [speakingCompleted, setSpeakingCompleted] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const question = questions[current];

  useEffect(() => {
    const savedXP = Number(
      localStorage.getItem(TOTAL_XP_KEY) || "0"
    );

    const savedCompleted = Number(
      localStorage.getItem("croatian-easy-greetings-completed") || "0"
    );

    const savedSpeakingXP = Number(
      localStorage.getItem(SPEAKING_XP_KEY) || "0"
    );

    const savedSpeakingCompleted = Number(
      localStorage.getItem(SPEAKING_COMPLETED_KEY) || "0"
    );

    setXp(savedXP);
    setCompleted(savedCompleted >= questions.length);

    setSpeakingXP(
      Math.min(savedSpeakingXP, questions.length * SPEAKING_XP_PER_QUESTION)
    );

    setSpeakingCompleted(
      Math.min(savedSpeakingCompleted, questions.length)
    );
  }, []);

  const speak = (text: string) => {
    if (typeof window === "undefined") return;

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
      localStorage.getItem("croatian-easy-greetings-completed") || "0"
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

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[.!?,]/g, "")
      .replace(/\s+/g, " ");
  };

  const startRecording = async () => {
    try {
      setSpeechResult("");
      setSpeechText("");

      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setSpeechResult(
          "🔴 Microphone is not supported in this browser."
        );
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      let mimeType = "audio/webm";

      if (
        MediaRecorder.isTypeSupported(
          "audio/webm;codecs=opus"
        )
      ) {
        mimeType = "audio/webm;codecs=opus";
      }

      const recorder = new MediaRecorder(stream, {
        mimeType,
      });

      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream
          .getTracks()
          .forEach((track) => track.stop());

        const audioBlob = new Blob(
          audioChunksRef.current,
          {
            type: mimeType,
          }
        );

        await sendAudioToOpenAI(audioBlob);
      };

      mediaRecorderRef.current = recorder;

      recorder.start();

      setIsRecording(true);
    } catch (error) {
      console.error(error);

      setSpeechResult(
        "🔴 Microphone permission denied or microphone unavailable."
      );
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) return;

    if (recorder.state !== "inactive") {
      recorder.stop();
    }

    setIsRecording(false);
  };

  const sendAudioToOpenAI = async (
    audioBlob: Blob
  ) => {
    try {
      setSpeechResult(
        "⏳ Checking your pronunciation..."
      );

      const file = new File(
        [audioBlob],
        "croatian-speaking.webm",
        {
          type:
            audioBlob.type || "audio/webm",
        }
      );

      const formData = new FormData();

      formData.append("audio", file);

      const response = await fetch(
        "/api/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(data);

        setSpeechResult(
          "🔴 Transcription failed. Please try again."
        );

        return;
      }

      const transcript = String(
        data.text || ""
      ).trim();

      setSpeechText(transcript);

      const expected = normalizeText(
        question.answer
      );

      const actual = normalizeText(
        transcript
      );

      if (actual === expected) {
        setSpeechResult(
          "✅ Correct! Great pronunciation."
        );

        addSpeakingXP(current);
      } else {
        setSpeechResult(
          `🟡 Not quite. You said: "${transcript}"`
        );
      }
    } catch (error) {
      console.error(error);

      setSpeechResult(
        "🔴 Speaking check failed. Please try again."
      );
    }
  };

  const addSpeakingXP = (questionIndex: number) => {
    const savedAnsweredRaw =
      localStorage.getItem(
        SPEAKING_ANSWERED_KEY
      );

    let answeredQuestions: number[] = [];

    try {
      answeredQuestions = savedAnsweredRaw
        ? JSON.parse(savedAnsweredRaw)
        : [];
    } catch {
      answeredQuestions = [];
    }

    if (!Array.isArray(answeredQuestions)) {
      answeredQuestions = [];
    }

    /*
     * Already completed this speaking question.
     * Do not award XP again.
     */
    if (answeredQuestions.includes(questionIndex)) {
      setSpeakingXP(
        Number(
          localStorage.getItem(
            SPEAKING_XP_KEY
          ) || "0"
        )
      );

      setSpeakingCompleted(
        Number(
          localStorage.getItem(
            SPEAKING_COMPLETED_KEY
          ) || "0"
        )
      );

      return;
    }

    const updatedAnsweredQuestions = [
      ...answeredQuestions,
      questionIndex,
    ].sort((a, b) => a - b);

    const newSpeakingCompleted = Math.min(
      updatedAnsweredQuestions.length,
      questions.length
    );

    const newSpeakingXP =
      newSpeakingCompleted *
      SPEAKING_XP_PER_QUESTION;

    localStorage.setItem(
      SPEAKING_ANSWERED_KEY,
      JSON.stringify(
        updatedAnsweredQuestions
      )
    );

    localStorage.setItem(
      SPEAKING_XP_KEY,
      String(newSpeakingXP)
    );

    localStorage.setItem(
      SPEAKING_COMPLETED_KEY,
      String(newSpeakingCompleted)
    );

    setSpeakingXP(newSpeakingXP);
    setSpeakingCompleted(
      newSpeakingCompleted
    );

    /*
     * Add +10 to total app XP only once.
     */
    const currentTotalXP = Number(
      localStorage.getItem(
        TOTAL_XP_KEY
      ) || "0"
    );

    const newTotalXP =
      currentTotalXP +
      SPEAKING_XP_PER_QUESTION;

    localStorage.setItem(
      TOTAL_XP_KEY,
      String(newTotalXP)
    );

    setXp(newTotalXP);

    /*
     * Tell Dashboard to refresh speaking progress.
     */
    window.dispatchEvent(
      new Event(
        "croatian-speaking-progress"
      )
    );
  };

  const nextQuestion = () => {
    if (
      current <
      questions.length - 1
    ) {
      setCurrent(current + 1);
      setShowAnswer(false);
      setSpeechText("");
      setSpeechResult("");
    }
  };

  const progress =
    ((current + 1) /
      questions.length) *
    100;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            ← Home
          </Link>

          <div className="font-bold text-orange-600">
            ⭐ XP: {xp}
          </div>
        </div>

        {/* TITLE */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                A1 • Greetings
              </p>

              <h1 className="text-3xl font-black text-gray-900 mt-1">
                Croatian Greetings
              </h1>

              <p className="text-gray-600 mt-2">
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
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
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
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">

          <div className="text-center">

            <div className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-5">
              SAY THIS IN CROATIAN
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              {question.croatian}
            </h2>

            <p className="text-xl text-gray-600 mt-3">
              {question.malayalam}
            </p>

            <p className="text-lg text-purple-600 font-semibold mt-2">
              {question.pronunciation}
            </p>

            {/* LISTEN */}
            <button
              onClick={() =>
                speak(question.croatian)
              }
              className="mt-6 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition"
            >
              🔊 Listen
            </button>
          </div>

          {/* WORD BREAKDOWN */}
          <div className="mt-8">
            <h3 className="text-lg font-black text-gray-900 mb-3">
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
                    className="border border-gray-200 rounded-2xl p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="font-black text-lg text-gray-900">
                          {croatian}
                        </div>

                        <div className="text-gray-600">
                          {malayalam}
                        </div>
                      </div>

                      <div className="text-purple-600 font-semibold">
                        {pronunciation}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ANSWER */}
          {!showAnswer ? (
            <button
              onClick={showCorrectAnswer}
              className="w-full mt-8 py-4 rounded-2xl bg-green-600 text-white font-black text-lg hover:bg-green-700 transition"
            >
              👀 Show Correct Answer
            </button>
          ) : (
            <div className="mt-8 p-5 rounded-2xl bg-green-50 border-2 border-green-200">
              <div className="text-sm font-bold text-green-700 uppercase tracking-wide">
                Correct Answer
              </div>

              <div className="text-2xl font-black text-green-900 mt-1">
                {question.answer}
              </div>
            </div>
          )}

          {/* SPEAKING */}
          <div className="mt-8 border-t pt-8">

            <div className="text-center">

              <div className="inline-flex px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
                🎤 SPEAKING PRACTICE
              </div>

              <h3 className="text-2xl font-black text-gray-900 mt-3">
                Say the Croatian sentence
              </h3>

              <p className="text-gray-600 mt-2">
                മൈക്രോഫോൺ അമർത്തി sentence പറയുക.
              </p>

              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="mt-5 px-8 py-4 rounded-2xl bg-orange-500 text-white font-black text-lg hover:bg-orange-600 transition"
                >
                  🎤 Start Speaking
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="mt-5 px-8 py-4 rounded-2xl bg-red-600 text-white font-black text-lg hover:bg-red-700 transition"
                >
                  ⏹ Stop & Check
                </button>
              )}

              {isRecording && (
                <div className="mt-4 text-red-600 font-bold animate-pulse">
                  🔴 Recording... Speak now
                </div>
              )}

              {speechText && (
                <div className="mt-5 p-4 rounded-2xl bg-gray-50 border">
                  <div className="text-sm font-bold text-gray-500 uppercase">
                    YOU SAID
                  </div>

                  <div className="text-lg font-semibold text-gray-900 mt-1">
                    {speechText}
                  </div>
                </div>
              )}

              {speechResult && (
                <div
                  className={`mt-4 p-5 rounded-2xl border-2 ${
                    speechResult.startsWith("✅")
                      ? "bg-green-50 border-green-300 text-green-800"
                      : speechResult.startsWith("🟡")
                      ? "bg-yellow-50 border-yellow-300 text-yellow-800"
                      : speechResult.startsWith("⏳")
                      ? "bg-blue-50 border-blue-300 text-blue-800"
                      : "bg-red-50 border-red-300 text-red-800"
                  }`}
                >
                  <div className="text-sm font-bold uppercase tracking-wide mb-2">
                    SPEAKING RESULT
                  </div>

                  <div className="text-lg font-semibold">
                    {speechResult}
                  </div>

                  {speechResult.startsWith("✅") && (
                    <div className="mt-2 text-sm font-medium text-green-700">
                      🎉 Great pronunciation! +10 Speaking XP
                    </div>
                  )}

                  {speechResult.startsWith("🟡") && (
                    <div className="mt-2 text-sm font-medium text-yellow-700">
                      💡 Listen once more and try again.
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* SPEAKING XP */}
            <div className="mt-6 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-center">
                <div className="text-sm text-orange-700 font-bold">
                  Speaking XP
                </div>

                <div className="text-2xl font-black text-orange-900 mt-1">
                  {speakingXP}
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-center">
                <div className="text-sm text-blue-700 font-bold">
                  Speaking Completed
                </div>

                <div className="text-2xl font-black text-blue-900 mt-1">
                  {speakingCompleted}/5
                </div>
              </div>

            </div>

          </div>

          {/* NEXT */}
          {showAnswer &&
            current < questions.length - 1 && (
              <button
                onClick={nextQuestion}
                className="w-full mt-8 py-4 rounded-2xl bg-blue-600 text-white font-black text-lg hover:bg-blue-700 transition"
              >
                Next Question →
              </button>
            )}

          {/* COMPLETED */}
          {completed &&
            current === questions.length - 1 && (
              <div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 text-center">

                <div className="text-5xl">
                  🎉
                </div>

                <h3 className="text-2xl font-black text-gray-900 mt-3">
                  Lesson Completed!
                </h3>

                <p className="text-gray-600 mt-2">
                  Greetings lesson complete ആയി.
                </p>

                <div className="flex flex-wrap justify-center gap-3 mt-5">

                  <Link
                    href="/grammar"
                    className="px-5 py-3 rounded-xl bg-purple-600 text-white font-bold"
                  >
                    Grammar
                  </Link>

                  <Link
                    href="/vocabulary"
                    className="px-5 py-3 rounded-xl bg-green-600 text-white font-bold"
                  >
                    Vocabulary
                  </Link>

                  <Link
                    href="/dashboard"
                    className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold"
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
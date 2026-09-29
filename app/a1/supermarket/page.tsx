"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const XP_KEY = "croatian-easy-xp";
const COMPLETE_KEY = "croatian-easy-a1-supermarket-completed";

const questions = [
  {
    croatian: "Gdje je kruh?",
    malayalam: "ബ്രെഡ് എവിടെയാണ്?",
    pronunciation: "ഗ്ദ്യേ യെ ക്രൂഹ്?",
    answer: "Kruh je tamo.",
    words: [
      ["Gdje", "എവിടെ"],
      ["kruh", "ബ്രെഡ്"],
      ["tamo", "അവിടെ"],
    ],
  },
  {
    croatian: "Koliko košta?",
    malayalam: "ഇതിന് എത്രയാണ് വില?",
    pronunciation: "കൊലികോ കോഷ്ടാ?",
    answer: "Košta pet eura.",
    words: [
      ["Koliko", "എത്ര"],
      ["košta", "വില വരുന്നു"],
      ["pet", "അഞ്ച്"],
      ["eura", "യൂറോ"],
    ],
  },
  {
    croatian: "Imate li mlijeko?",
    malayalam: "നിങ്ങളുടെ കൈയിൽ പാൽ ഉണ്ടോ?",
    pronunciation: "ഇമാതെ ലി മ്ലിയേക്കോ?",
    answer: "Da, imamo mlijeko.",
    words: [
      ["Imate li", "ഉണ്ടോ"],
      ["mlijeko", "പാൽ"],
      ["Da", "അതെ"],
      ["imamo", "ഞങ്ങളുടെ കൈയിൽ ഉണ്ട്"],
    ],
  },
  {
    croatian: "Gdje je voda?",
    malayalam: "വെള്ളം എവിടെയാണ്?",
    pronunciation: "ഗ്ദ്യേ യെ വോദാ?",
    answer: "Voda je tamo.",
    words: [
      ["Gdje", "എവിടെ"],
      ["voda", "വെള്ളം"],
      ["tamo", "അവിടെ"],
    ],
  },
  {
    croatian: "Mogu li platiti karticom?",
    malayalam: "കാർഡ് ഉപയോഗിച്ച് പണമടയ്ക്കാമോ?",
    pronunciation: "മോഗു ലി പ്ലാതിതി കാർതിത്സോം?",
    answer: "Da, možete.",
    words: [
      ["Mogu li", "എനിക്ക് കഴിയുമോ"],
      ["platiti", "പണമടയ്ക്കാൻ"],
      ["karticom", "കാർഡ് ഉപയോഗിച്ച്"],
      ["Da", "അതെ"],
    ],
  },
];

export default function SupermarketPage() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState("");
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [speaking, setSpeaking] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [speechResult, setSpeechResult] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    const savedXP = Number(
      localStorage.getItem(XP_KEY) || "0"
    );

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

    localStorage.setItem(
      XP_KEY,
      String(newXP)
    );

    setXp(newXP);
  }

  function listen(text: string) {
    window.speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(text);

    utterance.lang = "hr-HR";
    utterance.rate = 0.85;

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }

  function showCorrectAnswer() {
    setShowAnswer(true);

    if (!completed.includes(current)) {
      const newCompleted = [
        ...completed,
        current,
      ];

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
    setSpokenText("");
    setSpeechResult("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  async function startRecording() {
    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        setSpeechResult(
          "❌ ഈ browser microphone recording support ചെയ്യുന്നില്ല."
        );
        return;
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      audioChunksRef.current = [];

      let mimeType = "";

      if (
        MediaRecorder.isTypeSupported(
          "audio/webm;codecs=opus"
        )
      ) {
        mimeType =
          "audio/webm;codecs=opus";
      } else if (
        MediaRecorder.isTypeSupported(
          "audio/webm"
        )
      ) {
        mimeType = "audio/webm";
      }

      const recorder = mimeType
        ? new MediaRecorder(stream, {
            mimeType,
          })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (
        event: BlobEvent
      ) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(
            event.data
          );
        }
      };

      recorder.onerror = (event) => {
        console.error(
          "MediaRecorder error:",
          event
        );

        setSpeechResult(
          "❌ Audio recording error."
        );
      };

      recorder.onstop = async () => {
        stream
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

        const audioType =
          recorder.mimeType ||
          "audio/webm";

        const audioBlob = new Blob(
          audioChunksRef.current,
          {
            type: audioType,
          }
        );

        console.log(
          "Recorded audio:",
          {
            size: audioBlob.size,
            type: audioBlob.type,
          }
        );

        await sendAudioToOpenAI(
          audioBlob
        );
      };

      recorder.start();

      setIsRecording(true);
      setSpokenText("");
      setSpeechResult(
        "🎤 കേൾക്കുന്നു... Croatian sentence പറയൂ."
      );
    } catch (error) {
      console.error(
        "Microphone error:",
        error
      );

      setSpeechResult(
        "❌ Microphone permission denied അല്ലെങ്കിൽ microphone unavailable."
      );
    }
  }

  function stopRecording() {
    const recorder =
      mediaRecorderRef.current;

    if (
      recorder &&
      recorder.state !== "inactive"
    ) {
      recorder.stop();
    }

    setIsRecording(false);
  }

  async function sendAudioToOpenAI(
    audioBlob: Blob
  ) {
    try {
      setIsTranscribing(true);

      setSpeechResult(
        "⏳ Croatian speech പരിശോധിക്കുന്നു..."
      );

      if (
        !audioBlob ||
        audioBlob.size === 0
      ) {
        setSpeechResult(
          "❌ Audio record ആയിട്ടില്ല. വീണ്ടും try ചെയ്യൂ."
        );
        return;
      }

      console.log(
        "Sending audio:",
        {
          size: audioBlob.size,
          type: audioBlob.type,
        }
      );

      const formData = new FormData();

      const audioFile = new File(
        [audioBlob],
        "audio.webm",
        {
          type: "audio/webm",
        }
      );

      formData.append(
        "audio",
        audioFile
      );

      const response = await fetch(
        "/api/transcribe",
        {
          method: "POST",
          body: formData,
        }
      );

      const rawResponse =
        await response.text();

      console.log(
        "API status:",
        response.status
      );

      console.log(
        "API response:",
        rawResponse
      );

      let data: {
        text?: string;
        error?: string;
      } = {};

      try {
        data =
          JSON.parse(rawResponse);
      } catch {
        data = {
          error:
            rawResponse ||
            "Invalid API response.",
        };
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Transcription failed (${response.status})`
        );
      }

      const text = (
        data.text || ""
      ).trim();

      setSpokenText(text);

      if (!text) {
        setSpeechResult(
          "❌ Speech detect ചെയ്യാൻ കഴിഞ്ഞില്ല. വീണ്ടും വ്യക്തമായി പറയൂ."
        );
        return;
      }

      const spoken = text
        .toLowerCase()
        .trim()
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, " ");

      const expected =
        questions[current].answer
          .toLowerCase()
          .trim()
          .replace(/[.,!?]/g, "")
          .replace(/\s+/g, " ");

      console.log(
        "Spoken:",
        spoken
      );

      console.log(
        "Expected:",
        expected
      );

      if (spoken === expected) {
        setSpeechResult(
          "✅ വളരെ നല്ലത്! Croatian answer ശരിയാണ്."
        );
      } else {
        setSpeechResult(
          "🟡 Speech ലഭിച്ചു. ശരിയായ sentence വീണ്ടും പറയാൻ ശ്രമിക്കൂ."
        );
      }
    } catch (
      error: unknown
    ) {
      console.error(
        "SPEAKING PRACTICE ERROR:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unknown transcription error.";

      setSpeechResult(
        `❌ Transcription error: ${message}`
      );
    } finally {
      setIsTranscribing(false);
    }
  }

  if (
    current >= questions.length
  ) {
    return (
      <main className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/10 rounded-3xl p-8 text-center">
            <div className="text-6xl mb-4">
              🎉
            </div>

            <h1 className="text-3xl font-bold mb-3">
              Supermarket Lesson Complete!
            </h1>

            <p className="text-slate-300 mb-6">
              അഭിനന്ദനങ്ങൾ! Supermarket lesson പൂർത്തിയായി.
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

  const question =
    questions[current];

  const choices = [
    question.answer,
    ...questions
      .filter(
        (_, index) =>
          index !== current
      )
      .slice(0, 2)
      .map(
        (item) => item.answer
      ),
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
            <span>
              🇭🇷 A1 • Supermarket
            </span>

            <span>
              {current + 1} /{" "}
              {questions.length}
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${
                  ((current + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <section className="bg-white text-slate-900 rounded-3xl p-6 md:p-10 shadow-2xl">

          <div className="mb-8">
            <div className="text-sm font-semibold text-blue-600 mb-3">
              SITUATION • SUPERMARKET
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-5">
              {question.croatian}
            </h1>

            <p className="text-2xl mb-3">
              {question.malayalam}
            </p>

            <p className="text-lg text-slate-500">
              🗣️{" "}
              {question.pronunciation}
            </p>
          </div>

          <button
            onClick={() =>
              listen(
                question.croatian
              )
            }
            className="w-full md:w-auto px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 mb-8"
          >
            {speaking
              ? "🔊 Playing..."
              : "🔊 Listen Croatian"}
          </button>

          <div className="border-2 border-purple-200 bg-purple-50 rounded-2xl p-5 mb-8">

            <div className="text-sm font-bold text-purple-700 mb-2">
              🎤 SPEAKING PRACTICE
            </div>

            <h2 className="text-xl font-bold mb-2">
              Say the Croatian answer
            </h2>

            <p className="text-slate-600 mb-4">
              താഴെയുള്ള button അമർത്തി Croatian answer പറയുക.
            </p>

            {!isRecording ? (
              <button
                onClick={
                  startRecording
                }
                disabled={
                  isTranscribing
                }
                className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 disabled:opacity-50"
              >
                🎤 Start Speaking
              </button>
            ) : (
              <button
                onClick={
                  stopRecording
                }
                className="w-full py-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 animate-pulse"
              >
                ⏹ Stop & Check
              </button>
            )}

            {isTranscribing && (
              <div className="mt-4 p-4 rounded-xl bg-white text-purple-700 font-semibold">
                ⏳ Listening & checking Croatian speech...
              </div>
            )}

            {spokenText && (
              <div className="mt-4 p-4 rounded-xl bg-white border">
                <div className="text-sm text-slate-500 mb-1">
                  YOUR SPEECH
                </div>

                <div className="text-lg font-bold">
                  {spokenText}
                </div>
              </div>
            )}

            {speechResult && (
              <div className="mt-4 p-4 rounded-xl bg-white border font-semibold break-words">
                {speechResult}
              </div>
            )}
          </div>

          <div className="border-t pt-8">

            <h2 className="text-xl font-bold mb-4">
              Choose the correct answer
            </h2>

            <div className="grid gap-3">
              {choices.map(
                (choice) => (
                  <button
                    key={choice}
                    onClick={() =>
                      setSelected(
                        choice
                      )
                    }
                    className={`text-left p-4 rounded-xl border-2 transition ${
                      selected ===
                      choice
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    {choice}
                  </button>
                )
              )}
            </div>

            <button
              onClick={
                showCorrectAnswer
              }
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
                    {question.words.map(
                      ([
                        word,
                        meaning,
                      ]) => (
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
                      )
                    )}
                  </div>
                </div>

                {current <
                questions.length -
                  1 ? (
                  <button
                    onClick={
                      nextQuestion
                    }
                    className="mt-6 w-full py-4 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setCurrent(
                        questions.length
                      )
                    }
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
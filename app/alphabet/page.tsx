"use client";

import { useState } from "react";

const alphabet = [
  {
    letter: "A a",
    letterName: "A",
    sound: "ആ",
    word: "auto",
    meaning: "കാർ 🚗",
  },
  {
    letter: "B b",
    letterName: "Be",
    sound: "ബെ",
    word: "banka",
    meaning: "ബാങ്ക് 🏦",
  },
  {
    letter: "C c",
    letterName: "Ce",
    sound: "ത്സെ",
    word: "cesta",
    meaning: "റോഡ് 🛣️",
  },
  {
    letter: "Č č",
    letterName: "Če",
    sound: "ചെ",
    word: "čaj",
    meaning: "ചായ ☕",
  },
  {
    letter: "Ć ć",
    letterName: "Će",
    sound: "ച്യേ",
    word: "ćevapi",
    meaning: "ചെവാപി 🍽️",
  },
  {
    letter: "D d",
    letterName: "De",
    sound: "ഡെ",
    word: "dan",
    meaning: "ദിവസം ☀️",
  },
  {
    letter: "Dž dž",
    letterName: "Dže",
    sound: "ജെ",
    word: "džem",
    meaning: "ജാം 🍓",
  },
  {
    letter: "Đ đ",
    letterName: "Đe",
    sound: "ദ്യെ",
    word: "đak",
    meaning: "വിദ്യാർത്ഥി 🎓",
  },
  {
    letter: "E e",
    letterName: "E",
    sound: "എ",
    word: "energija",
    meaning: "ഊർജം ⚡",
  },
  {
    letter: "F f",
    letterName: "Ef",
    sound: "എഫ്",
    word: "flaša",
    meaning: "കുപ്പി 🍾",
  },
  {
    letter: "G g",
    letterName: "Ge",
    sound: "ഗെ",
    word: "grad",
    meaning: "നഗരം 🏙️",
  },
  {
    letter: "H h",
    letterName: "Ha",
    sound: "ഹ",
    word: "hotel",
    meaning: "ഹോട്ടൽ 🏨",
  },
  {
    letter: "I i",
    letterName: "I",
    sound: "ഈ",
    word: "igra",
    meaning: "കളി 🎮",
  },
  {
    letter: "J j",
    letterName: "Je",
    sound: "യെ",
    word: "jabuka",
    meaning: "ആപ്പിൾ 🍎",
  },
  {
    letter: "K k",
    letterName: "Ka",
    sound: "ക",
    word: "kuća",
    meaning: "വീട് 🏠",
  },
  {
    letter: "L l",
    letterName: "El",
    sound: "എൽ",
    word: "ljeto",
    meaning: "വേനൽക്കാലം ☀️",
  },
  {
    letter: "Lj lj",
    letterName: "Elj",
    sound: "ലിയ",
    word: "ljubav",
    meaning: "സ്നേഹം ❤️",
  },
  {
    letter: "M m",
    letterName: "Em",
    sound: "എം",
    word: "more",
    meaning: "കടൽ 🌊",
  },
  {
    letter: "N n",
    letterName: "En",
    sound: "എൻ",
    word: "noć",
    meaning: "രാത്രി 🌙",
  },
  {
    letter: "Nj nj",
    letterName: "Enj",
    sound: "ന്യ",
    word: "njemački",
    meaning: "ജർമ്മൻ 🇩🇪",
  },
  {
    letter: "O o",
    letterName: "O",
    sound: "ഓ",
    word: "oko",
    meaning: "കണ്ണ് 👁️",
  },
  {
    letter: "P p",
    letterName: "Pe",
    sound: "പെ",
    word: "pas",
    meaning: "നായ 🐕",
  },
  {
    letter: "R r",
    letterName: "Er",
    sound: "എർ",
    word: "riba",
    meaning: "മീൻ 🐟",
  },
  {
    letter: "S s",
    letterName: "Es",
    sound: "എസ്",
    word: "sunce",
    meaning: "സൂര്യൻ ☀️",
  },
  {
    letter: "Š š",
    letterName: "Eš",
    sound: "എഷ്",
    word: "škola",
    meaning: "സ്കൂൾ 🏫",
  },
  {
    letter: "T t",
    letterName: "Te",
    sound: "ടെ",
    word: "telefon",
    meaning: "ഫോൺ 📱",
  },
  {
    letter: "U u",
    letterName: "U",
    sound: "ഉ",
    word: "ulica",
    meaning: "തെരുവ് 🛣️",
  },
  {
    letter: "V v",
    letterName: "Ve",
    sound: "വെ",
    word: "voda",
    meaning: "വെള്ളം 💧",
  },
  {
    letter: "Z z",
    letterName: "Ze",
    sound: "സെ",
    word: "zima",
    meaning: "ശീതകാലം ❄️",
  },
  {
    letter: "Ž ž",
    letterName: "Že",
    sound: "ഷെ",
    word: "žena",
    meaning: "സ്ത്രീ 👩",
  },
];

export default function AlphabetPage() {
  const [speaking, setSpeaking] = useState<string | null>(null);

  const speak = (text: string, id: string) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hr-HR";
    utterance.rate = 0.75;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setSpeaking(id);
    };

    utterance.onend = () => {
      setSpeaking(null);
    };

    utterance.onerror = () => {
      setSpeaking(null);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 text-5xl">🇭🇷</div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Croatian Alphabet
          </h1>

          <p className="mt-3 text-lg font-medium text-blue-700">
            Croatian Letters & Pronunciation
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            മലയാളത്തിൽ എളുപ്പമായി Croatian അക്ഷരങ്ങളും അവയുടെ ഉച്ചാരണവും
            പഠിക്കാം. ഓരോ അക്ഷരത്തിനും example word ഉണ്ട്.
          </p>
        </div>

        {/* Important Note */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center shadow-sm">
          <p className="font-semibold text-blue-900">
            🔊 Letter ഉം Word ഉം വേർതിരിച്ച് കേൾക്കാം
          </p>

          <p className="mt-2 text-sm leading-6 text-blue-800">
            ഉദാഹരണം: A → A മാത്രം | Word → auto മാത്രം | Both → A + auto
          </p>
        </div>

        {/* Alphabet Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {alphabet.map((item, index) => (
            <div
              key={item.letter}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Letter */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-blue-700">
                    {item.letter}
                  </div>

                  <div className="mt-2 text-sm text-slate-500">
                    ഉച്ചാരണം:
                    <span className="ml-2 font-bold text-slate-800">
                      {item.sound}
                    </span>
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                  {index + 1}
                </div>
              </div>

              {/* Letter Listen */}
              <button
                onClick={() =>
                  speak(item.letterName, `letter-${index}`)
                }
                className="mt-5 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                {speaking === `letter-${index}`
                  ? "🔊 കേൾക്കുന്നു..."
                  : `🔊 Letter — ${item.letterName}`}
              </button>

              {/* Example Word */}
              <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Example word
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {item.word}
                </p>

                <p className="mt-2 text-base font-medium text-slate-700">
                  {item.meaning}
                </p>
              </div>

              {/* Word Listen */}
              <button
                onClick={() =>
                  speak(item.word, `word-${index}`)
                }
                className="mt-3 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-100 active:scale-[0.98]"
              >
                {speaking === `word-${index}`
                  ? "🔊 കേൾക്കുന്നു..."
                  : `🔊 Word — ${item.word}`}
              </button>

              {/* Letter + Word */}
              <button
                onClick={() =>
                  speak(
                    `${item.letterName}. ${item.word}`,
                    `both-${index}`
                  )
                }
                className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
              >
                {speaking === `both-${index}`
                  ? "🔊 കേൾക്കുന്നു..."
                  : "🔊 Letter + Word"}
              </button>

            </div>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-10 rounded-2xl bg-white p-6 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-900">
            🇭🇷 Croatian Alphabet Practice
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            ഓരോ അക്ഷരവും കേൾക്കുക → example word കേൾക്കുക →
            Letter + Word ഒരുമിച്ച് practice ചെയ്യുക.
          </p>
        </div>

      </div>
    </main>
  );
}
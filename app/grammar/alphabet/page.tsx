"use client";

import Link from "next/link";
import { useState } from "react";

const letters = [
  {
    letter: "A",
    sound: "ആ",
    example: "Auto",
    meaning: "കാർ",
    pronunciation: "ആ-തോ",
  },
  {
    letter: "B",
    sound: "ബ",
    example: "Banka",
    meaning: "ബാങ്ക്",
    pronunciation: "ബാങ്കാ",
  },
  {
    letter: "C",
    sound: "ത്സ",
    example: "Cesta",
    meaning: "റോഡ്",
    pronunciation: "ത്സെസ്താ",
  },
  {
    letter: "Č",
    sound: "ച",
    example: "Čaj",
    meaning: "ചായ",
    pronunciation: "ചായ്",
  },
  {
    letter: "Ć",
    sound: "ച്",
    example: "Ćao",
    meaning: "ഹലോ / ബൈ",
    pronunciation: "ചാവോ",
  },
  {
    letter: "D",
    sound: "ദ്",
    example: "Dan",
    meaning: "ദിവസം",
    pronunciation: "ദാൻ",
  },
  {
    letter: "Đ",
    sound: "ദ്യ",
    example: "Đak",
    meaning: "വിദ്യാർത്ഥി",
    pronunciation: "ദ്യാക്",
  },
  {
    letter: "E",
    sound: "എ",
    example: "Evo",
    meaning: "ഇവിടെ / ഇതാ",
    pronunciation: "എവോ",
  },
  {
    letter: "F",
    sound: "ഫ്",
    example: "Film",
    meaning: "സിനിമ",
    pronunciation: "ഫിൽം",
  },
  {
    letter: "G",
    sound: "ഗ്",
    example: "Grad",
    meaning: "നഗരം",
    pronunciation: "ഗ്രാദ്",
  },
  {
    letter: "H",
    sound: "ഹ്",
    example: "Hotel",
    meaning: "ഹോട്ടൽ",
    pronunciation: "ഹോതെൽ",
  },
  {
    letter: "I",
    sound: "ഇ",
    example: "Ime",
    meaning: "പേര്",
    pronunciation: "ഇമേ",
  },
  {
    letter: "J",
    sound: "യ്",
    example: "Ja",
    meaning: "ഞാൻ",
    pronunciation: "യാ",
  },
  {
    letter: "K",
    sound: "ക്",
    example: "Kava",
    meaning: "കാപ്പി",
    pronunciation: "കാവാ",
  },
  {
    letter: "L",
    sound: "ല്",
    example: "Lijek",
    meaning: "മരുന്ന്",
    pronunciation: "ലിയെക്",
  },
  {
    letter: "M",
    sound: "മ്",
    example: "Mama",
    meaning: "അമ്മ",
    pronunciation: "മാമാ",
  },
  {
    letter: "N",
    sound: "ന്",
    example: "Novac",
    meaning: "പണം",
    pronunciation: "നോവാത്സ്",
  },
  {
    letter: "O",
    sound: "ഒ",
    example: "Ovo",
    meaning: "ഇത്",
    pronunciation: "ഒവോ",
  },
  {
    letter: "P",
    sound: "പ്",
    example: "Posao",
    meaning: "ജോലി",
    pronunciation: "പോസാവോ",
  },
  {
    letter: "R",
    sound: "ര്",
    example: "Rad",
    meaning: "ജോലി",
    pronunciation: "റാദ്",
  },
  {
    letter: "S",
    sound: "സ്",
    example: "Soba",
    meaning: "മുറി",
    pronunciation: "സോബാ",
  },
  {
    letter: "Š",
    sound: "ഷ്",
    example: "Škola",
    meaning: "സ്കൂൾ",
    pronunciation: "ഷ്കോലാ",
  },
  {
    letter: "T",
    sound: "ത്",
    example: "Tramvaj",
    meaning: "ട്രാം",
    pronunciation: "ത്രാംവായ്",
  },
  {
    letter: "U",
    sound: "ഉ",
    example: "Ulica",
    meaning: "തെരുവ്",
    pronunciation: "ഉലിത്സാ",
  },
  {
    letter: "V",
    sound: "വ്",
    example: "Voda",
    meaning: "വെള്ളം",
    pronunciation: "വോദാ",
  },
  {
    letter: "Z",
    sound: "സ്",
    example: "Zagreb",
    meaning: "സാഗ്രെബ്",
    pronunciation: "സാഗ്രെബ്",
  },
  {
    letter: "Ž",
    sound: "ഴ്",
    example: "Žena",
    meaning: "സ്ത്രീ",
    pronunciation: "ഴേനാ",
  },
];

const specialGroups = [
  {
    title: "Č vs Ć",
    croatian: "Čaj / Ćao",
    malayalam: "രണ്ടും 'ച' ശബ്ദത്തിന് അടുത്തതാണ്. Č കുറച്ച് ശക്തമായ 'ച' ശബ്ദം.",
  },
  {
    title: "C",
    croatian: "Cesta",
    malayalam: "C സാധാരണയായി 'ത്സ' എന്ന ശബ്ദം നൽകുന്നു.",
  },
  {
    title: "J",
    croatian: "Ja",
    malayalam: "J = 'യ്'. Ja = യാ.",
  },
  {
    title: "Š",
    croatian: "Škola",
    malayalam: "Š = 'ഷ്'.",
  },
  {
    title: "Ž",
    croatian: "Žena",
    malayalam: "Ž = മലയാളത്തിലെ 'ഴ്' ശബ്ദത്തിന് അടുത്തത്.",
  },
  {
    title: "Đ",
    croatian: "Đak",
    malayalam: "Đ ഒരു പ്രത്യേക soft 'ദ്യ' ശബ്ദമാണ്.",
  },
  {
    title: "Lj",
    croatian: "Ljubav",
    malayalam: "Lj ഒരു കൂട്ടക്ഷരം പോലെ ഉച്ചരിക്കും.",
  },
  {
    title: "Nj",
    croatian: "Njemačka",
    malayalam: "Nj = 'ഞ' ശബ്ദത്തിന് അടുത്തത്.",
  },
  {
    title: "Dž",
    croatian: "Džem",
    malayalam: "Dž = 'ജ' / 'ജ്ജ്' ശബ്ദത്തിന് അടുത്തത്.",
  },
];

export default function AlphabetPage() {
  const [selectedLetter, setSelectedLetter] = useState("A");

  const currentLetter =
    letters.find((item) => item.letter === selectedLetter) || letters[0];

  function speak(text: string) {
    if (typeof window === "undefined") {
      return;
    }

    if (!("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hr-HR";
    utterance.rate = 0.7;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-5 py-5">
          <Link
            href="/grammar"
            className="text-sm font-bold text-blue-600 hover:text-blue-700"
          >
            ← Grammar
          </Link>

          <div className="mt-3">
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              Grammar Topic 01
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mt-1">
              Croatian Alphabet
            </h1>

            <p className="text-slate-600 mt-2">
              മലയാളത്തിൽ Croatian അക്ഷരങ്ങളും pronunciation-ഉം പഠിക്കാം
            </p>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-7 md:p-10 shadow-lg">
          <p className="text-blue-100 font-bold">
            🇭🇷 ആദ്യം ഇത് മനസ്സിലാക്കുക
          </p>

          <h2 className="text-2xl md:text-3xl font-black mt-2">
            Croatian Alphabet എങ്ങനെ വായിക്കാം?
          </h2>

          <p className="text-blue-50 leading-7 mt-4 max-w-3xl">
            Croatian alphabet Latin letters ഉപയോഗിക്കുന്നു. പക്ഷേ ചില letters
            മലയാളത്തിൽ ഇല്ലാത്ത പ്രത്യേക pronunciation നൽകുന്നു. പ്രത്യേകിച്ച്
            Č, Ć, Š, Ž, Đ എന്നിവ ശ്രദ്ധിച്ച് പഠിക്കണം.
          </p>

          <button
            onClick={() =>
              speak("Č, Ć, Š, Ž, Đ")
            }
            className="mt-5 rounded-2xl bg-white text-blue-700 px-5 py-3 font-black hover:bg-blue-50"
          >
            🔊 Special Letters കേൾക്കുക
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">
            Croatian Letters
          </h2>

          <p className="text-slate-600 mt-1">
            ഒരു letter click ചെയ്ത് pronunciation നോക്കാം.
          </p>

          <div className="mt-5 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-3">
            {letters.map((item) => (
              <button
                key={item.letter}
                onClick={() => {
                  setSelectedLetter(item.letter);
                  speak(item.example);
                }}
                className={
                  selectedLetter === item.letter
                    ? "rounded-2xl bg-blue-600 text-white p-4 shadow-md"
                    : "rounded-2xl bg-white border border-slate-200 text-slate-900 p-4 hover:border-blue-300"
                }
              >
                <div className="text-2xl font-black">
                  {item.letter}
                </div>

                <div className="text-xs font-semibold mt-1 opacity-80">
                  {item.sound}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <p className="text-sm font-bold text-blue-600">
                SELECTED LETTER
              </p>

              <div className="flex items-center gap-5 mt-2">
                <div className="w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-4xl font-black text-blue-700">
                  {currentLetter.letter}
                </div>

                <div>
                  <p className="text-slate-500 text-sm">
                    Sound
                  </p>

                  <p className="text-2xl font-black text-slate-900">
                    {currentLetter.sound}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => speak(currentLetter.example)}
              className="rounded-2xl bg-blue-600 text-white px-6 py-4 font-black hover:bg-blue-700"
            >
              🔊 കേൾക്കുക
            </button>
          </div>

          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-bold text-slate-500">
                CROATIAN
              </p>

              <p className="text-2xl font-black text-slate-900 mt-1">
                {currentLetter.example}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-bold text-slate-500">
                MALAYALAM
              </p>

              <p className="text-xl font-black text-slate-900 mt-1">
                {currentLetter.meaning}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-bold text-slate-500">
                PRONUNCIATION
              </p>

              <p className="text-xl font-black text-blue-700 mt-1">
                {currentLetter.pronunciation}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">
            ⭐ Special Pronunciation
          </h2>

          <p className="text-slate-600 mt-1">
            ഈ letters പ്രത്യേകം ശ്രദ്ധിച്ച് പഠിക്കുക.
          </p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {specialGroups.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-200 p-5"
              >
                <h3 className="text-lg font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="text-blue-700 font-bold mt-2">
                  {item.croatian}
                </p>

                <p className="text-slate-600 text-sm leading-6 mt-2">
                  {item.malayalam}
                </p>

                <button
                  onClick={() => speak(item.croatian)}
                  className="mt-4 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200"
                >
                  🔊 കേൾക്കുക
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-amber-50 border border-amber-200 p-6">
          <h2 className="text-xl font-black text-slate-900">
            💡 Easy Tip
          </h2>

          <p className="text-slate-700 leading-7 mt-2">
            Croatian words വായിക്കുമ്പോൾ English pronunciation പോലെ വായിക്കാതെ
            Croatian pronunciation ശ്രദ്ധിക്കുക. പ്രത്യേകിച്ച് C, Č, Ć, Š, Ž,
            J എന്നീ letters ആദ്യം practice ചെയ്യുന്നത് വളരെ സഹായിക്കും.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/grammar"
            className="rounded-2xl bg-slate-900 text-white px-5 py-3 font-bold hover:bg-slate-800"
          >
            ← All Grammar
          </Link>

          <Link
            href="/vocabulary"
            className="rounded-2xl bg-blue-600 text-white px-5 py-3 font-bold hover:bg-blue-700"
          >
            📚 Vocabulary
          </Link>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-white border border-slate-300 text-slate-800 px-5 py-3 font-bold hover:bg-slate-50"
          >
            📊 Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
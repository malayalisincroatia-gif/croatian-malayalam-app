"use client";

import { useEffect, useMemo, useState } from "react";

const XP_KEY = "croatian-easy-xp";
const VOCAB_XP_KEY = "croatian-easy-vocabulary-xp";
const VOCAB_COMPLETED_KEY = "croatian-easy-vocabulary-completed";

const questions = [
  {
    category: "Greetings",
    word: "Pozdrav",
    meaning: "നമസ്കാരം",
    pronunciation: "പോസ്ദ്രാവ്",
    options: ["നന്ദി", "നമസ്കാരം", "വെള്ളം"],
    answer: "നമസ്കാരം",
  },
  {
    category: "Greetings",
    word: "Hvala",
    meaning: "നന്ദി",
    pronunciation: "ഹ്വാല",
    options: ["നന്ദി", "ദയവായി", "അതെ"],
    answer: "നന്ദി",
  },
  {
    category: "Greetings",
    word: "Molim",
    meaning: "ദയവായി / സ്വാഗതം",
    pronunciation: "മൊലിം",
    options: ["ഇല്ല", "ദയവായി / സ്വാഗതം", "വീട്"],
    answer: "ദയവായി / സ്വാഗതം",
  },

  {
    category: "Home",
    word: "Kuća",
    meaning: "വീട്",
    pronunciation: "കൂച്ചാ",
    options: ["മുറി", "വീട്", "വാതിൽ"],
    answer: "വീട്",
  },
  {
    category: "Home",
    word: "Soba",
    meaning: "മുറി",
    pronunciation: "സോബാ",
    options: ["മുറി", "വീട്", "ജോലി"],
    answer: "മുറി",
  },
  {
    category: "Home",
    word: "Vrata",
    meaning: "വാതിൽ",
    pronunciation: "വ്രാതാ",
    options: ["വാതിൽ", "വെള്ളം", "ഭക്ഷണം"],
    answer: "വാതിൽ",
  },

  {
    category: "Work",
    word: "Posao",
    meaning: "ജോലി",
    pronunciation: "പോസാവോ",
    options: ["ജോലി", "വീട്", "പണം"],
    answer: "ജോലി",
  },
  {
    category: "Work",
    word: "Raditi",
    meaning: "ജോലി ചെയ്യുക",
    pronunciation: "റാദിതി",
    options: ["ജോലി ചെയ്യുക", "കഴിക്കുക", "പോകുക"],
    answer: "ജോലി ചെയ്യുക",
  },
  {
    category: "Work",
    word: "Radnik",
    meaning: "തൊഴിലാളി",
    pronunciation: "റാദ്നിക്",
    options: ["ഡോക്ടർ", "തൊഴിലാളി", "പോലീസ്"],
    answer: "തൊഴിലാളി",
  },

  {
    category: "Shopping",
    word: "Koliko košta?",
    meaning: "എത്ര വിലയാണ്?",
    pronunciation: "കൊലികോ കോഷ്ടാ",
    options: ["എവിടെയാണ്?", "എത്ര വിലയാണ്?", "എനിക്ക് വേണം"],
    answer: "എത്ര വിലയാണ്?",
  },
  {
    category: "Shopping",
    word: "Novac",
    meaning: "പണം",
    pronunciation: "നോവാത്സ്",
    options: ["പണം", "കാർഡ്", "ബിൽ"],
    answer: "പണം",
  },
  {
    category: "Shopping",
    word: "Račun",
    meaning: "ബിൽ / രസീത്",
    pronunciation: "റാച്ചൂൻ",
    options: ["ബിൽ / രസീത്", "വെള്ളം", "ബസ്"],
    answer: "ബിൽ / രസീത്",
  },

  {
    category: "Restaurant",
    word: "Hrana",
    meaning: "ഭക്ഷണം",
    pronunciation: "ഹ്രാനാ",
    options: ["ഭക്ഷണം", "കാപ്പി", "പണം"],
    answer: "ഭക്ഷണം",
  },
  {
    category: "Restaurant",
    word: "Kava",
    meaning: "കാപ്പി",
    pronunciation: "കാവാ",
    options: ["ചായ", "കാപ്പി", "വെള്ളം"],
    answer: "കാപ്പി",
  },
  {
    category: "Restaurant",
    word: "Račun, molim.",
    meaning: "ബിൽ തരൂ, ദയവായി.",
    pronunciation: "റാച്ചൂൻ മൊലിം",
    options: [
      "വെള്ളം തരൂ",
      "ബിൽ തരൂ, ദയവായി.",
      "കാപ്പി തരൂ",
    ],
    answer: "ബിൽ തരൂ, ദയവായി.",
  },

  {
    category: "Transport",
    word: "Autobus",
    meaning: "ബസ്",
    pronunciation: "ഔതോബൂസ്",
    options: ["ട്രെയിൻ", "ബസ്", "കാർ"],
    answer: "ബസ്",
  },
  {
    category: "Transport",
    word: "Kolodvor",
    meaning: "സ്റ്റേഷൻ",
    pronunciation: "കൊലോദ്വോർ",
    options: ["സ്റ്റേഷൻ", "ആശുപത്രി", "ബാങ്ക്"],
    answer: "സ്റ്റേഷൻ",
  },
  {
    category: "Transport",
    word: "Karta",
    meaning: "ടിക്കറ്റ്",
    pronunciation: "കാർതാ",
    options: ["ടിക്കറ്റ്", "പണം", "രേഖ"],
    answer: "ടിക്കറ്റ്",
  },

  {
    category: "Doctor",
    word: "Liječnik",
    meaning: "ഡോക്ടർ",
    pronunciation: "ലീയെച്ച്നിക്",
    options: ["ഡോക്ടർ", "പോലീസ്", "തൊഴിലാളി"],
    answer: "ഡോക്ടർ",
  },
  {
    category: "Doctor",
    word: "Bolnica",
    meaning: "ആശുപത്രി",
    pronunciation: "ബോൽനിത്സാ",
    options: ["ബാങ്ക്", "ആശുപത്രി", "സ്റ്റേഷൻ"],
    answer: "ആശുപത്രി",
  },
  {
    category: "Doctor",
    word: "Boli me.",
    meaning: "എനിക്ക് വേദനിക്കുന്നു.",
    pronunciation: "ബോലി മെ",
    options: [
      "എനിക്ക് വിശക്കുന്നു.",
      "എനിക്ക് വേദനിക്കുന്നു.",
      "എനിക്ക് പോകണം.",
    ],
    answer: "എനിക്ക് വേദനിക്കുന്നു.",
  },

  {
    category: "Bank",
    word: "Banka",
    meaning: "ബാങ്ക്",
    pronunciation: "ബാങ്കാ",
    options: ["ബാങ്ക്", "വീട്", "ജോലി"],
    answer: "ബാങ്ക്",
  },
  {
    category: "Bank",
    word: "Kartica",
    meaning: "കാർഡ്",
    pronunciation: "കാർതിത്സാ",
    options: ["കാർഡ്", "പണം", "ടിക്കറ്റ്"],
    answer: "കാർഡ്",
  },
  {
    category: "Bank",
    word: "Račun",
    meaning: "അക്കൗണ്ട്",
    pronunciation: "റാച്ചൂൻ",
    options: ["അക്കൗണ്ട്", "വീട്", "ബസ്"],
    answer: "അക്കൗണ്ട്",
  },

  {
    category: "MUP",
    word: "Policija",
    meaning: "പോലീസ്",
    pronunciation: "പൊലിത്സിയ",
    options: ["പോലീസ്", "ഡോക്ടർ", "ബാങ്ക്"],
    answer: "പോലീസ്",
  },
  {
    category: "MUP",
    word: "Dokument",
    meaning: "രേഖ / ഡോക്യുമെന്റ്",
    pronunciation: "ദൊകുമെന്ത്",
    options: ["പണം", "രേഖ / ഡോക്യുമെന്റ്", "ഭക്ഷണം"],
    answer: "രേഖ / ഡോക്യുമെന്റ്",
  },
  {
    category: "MUP",
    word: "Putovnica",
    meaning: "പാസ്പോർട്ട്",
    pronunciation: "പുതോവ്നിത്സാ",
    options: ["പാസ്പോർട്ട്", "കാർഡ്", "ടിക്കറ്റ്"],
    answer: "പാസ്പോർട്ട്",
  },
];

const categories = [
  "All",
  "Greetings",
  "Home",
  "Work",
  "Shopping",
  "Restaurant",
  "Transport",
  "Doctor",
  "Bank",
  "MUP",
];

export default function VocabularyPracticePage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const practiceQuestions = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") {
      return questions;
    }

    return questions.filter(function (item) {
      return item.category === selectedCategory;
    });
  }, [selectedCategory]);

  useEffect(
    function () {
      setCurrent(0);
      setSelectedAnswer("");
      setAnswered(false);
      setScore(0);
      setFinished(false);
    },
    [selectedCategory]
  );

  function chooseCategory(category: string) {
    setSelectedCategory(category);
  }

  function chooseAnswer(answer: string) {
    if (answered) {
      return;
    }

    setSelectedAnswer(answer);
    setAnswered(true);

    if (
      practiceQuestions[current] &&
      answer === practiceQuestions[current].answer
    ) {
      setScore(function (oldScore) {
        return oldScore + 1;
      });

      const oldXP = Number(localStorage.getItem(XP_KEY) || "0");
      localStorage.setItem(XP_KEY, String(oldXP + 10));

      const oldVocabularyXP = Number(
        localStorage.getItem(VOCAB_XP_KEY) || "0"
      );

      localStorage.setItem(
        VOCAB_XP_KEY,
        String(oldVocabularyXP + 10)
      );

      const oldCompleted = Number(
        localStorage.getItem(VOCAB_COMPLETED_KEY) || "0"
      );

      localStorage.setItem(
        VOCAB_COMPLETED_KEY,
        String(oldCompleted + 1)
      );

      window.dispatchEvent(new Event("croatian-vocabulary-progress"));
    }
  }

  function nextQuestion() {
    if (current < practiceQuestions.length - 1) {
      setCurrent(function (oldCurrent) {
        return oldCurrent + 1;
      });

      setSelectedAnswer("");
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  function changeCategory() {
    setSelectedCategory("");
    setCurrent(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  function practiceAgain() {
    setCurrent(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setFinished(false);
  }

  if (!selectedCategory) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "30px 16px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
          }}
        >
          <a
            href="/vocabulary"
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "700",
            }}
          >
            ← Vocabulary
          </a>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "22px",
              padding: "30px 20px",
              marginTop: "20px",
              boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>
              🧠
            </div>

            <h1
              style={{
                fontSize: "30px",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              Vocabulary Practice
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "17px",
                marginBottom: "25px",
              }}
            >
              ആദ്യം ഒരു Category തിരഞ്ഞെടുക്കൂ
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "12px",
              }}
            >
              {categories.map(function (category) {
                return (
                  <button
                    key={category}
                    onClick={function () {
                      chooseCategory(category);
                    }}
                    style={{
                      border: "none",
                      borderRadius: "14px",
                      padding: "16px 10px",
                      background:
                        category === "All" ? "#2563eb" : "#eff6ff",
                      color:
                        category === "All" ? "#ffffff" : "#1e40af",
                      fontWeight: "700",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (finished) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          padding: "30px 16px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "40px 24px",
              boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div style={{ fontSize: "60px" }}>🎉</div>

            <h1
              style={{
                fontSize: "32px",
                color: "#0f172a",
                marginBottom: "10px",
              }}
            >
              Practice Complete!
            </h1>

            <p
              style={{
                fontSize: "20px",
                color: "#475569",
              }}
            >
              {selectedCategory} Category
            </p>

            <div
              style={{
                margin: "25px 0",
                padding: "20px",
                borderRadius: "18px",
                background: "#eff6ff",
              }}
            >
              <div
                style={{
                  fontSize: "34px",
                  fontWeight: "800",
                  color: "#2563eb",
                }}
              >
                {score} / {practiceQuestions.length}
              </div>

              <div
                style={{
                  marginTop: "8px",
                  color: "#475569",
                }}
              >
                Correct Answers
              </div>
            </div>

            <p
              style={{
                color: "#16a34a",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              +{score * 10} XP earned ⭐
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={practiceAgain}
                style={{
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px",
                  background: "#2563eb",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Practice Again
              </button>

              <button
                onClick={changeCategory}
                style={{
                  border: "2px solid #2563eb",
                  borderRadius: "12px",
                  padding: "12px",
                  background: "#ffffff",
                  color: "#2563eb",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                Change Category
              </button>

              <a
                href="/vocabulary"
                style={{
                  textDecoration: "none",
                  borderRadius: "12px",
                  padding: "14px",
                  background: "#f1f5f9",
                  color: "#334155",
                  fontWeight: "700",
                }}
              >
                ← Vocabulary
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const question = practiceQuestions[current];

  if (!question) {
    return null;
  }

  const progress =
    ((current + 1) / practiceQuestions.length) * 100;

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "25px 16px 40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "750px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <a
            href="/vocabulary"
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: "700",
            }}
          >
            ← Vocabulary
          </a>

          <button
            onClick={changeCategory}
            style={{
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#334155",
              borderRadius: "10px",
              padding: "9px 12px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Change Category
          </button>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            padding: "25px 20px",
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                background: "#eff6ff",
                color: "#1d4ed8",
                padding: "7px 12px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "700",
              }}
            >
              {selectedCategory}
            </span>

            <span
              style={{
                color: "#64748b",
                fontWeight: "700",
              }}
            >
              {current + 1} / {practiceQuestions.length}
            </span>
          </div>

          <div
            style={{
              width: "100%",
              height: "8px",
              background: "#e2e8f0",
              borderRadius: "999px",
              overflow: "hidden",
              marginBottom: "28px",
            }}
          >
            <div
              style={{
                width: String(progress) + "%",
                height: "100%",
                background: "#2563eb",
                borderRadius: "999px",
              }}
            />
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              style={{
                color: "#64748b",
                fontSize: "15px",
                marginBottom: "8px",
              }}
            >
              Croatian word
            </div>

            <h1
              style={{
                fontSize: "34px",
                color: "#0f172a",
                margin: "0 0 8px",
              }}
            >
              {question.word}
            </h1>

            <div
              style={{
                color: "#64748b",
                fontSize: "16px",
                marginBottom: "5px",
              }}
            >
              🔊 {question.pronunciation}
            </div>

            <div
              style={{
                color: "#475569",
                fontSize: "15px",
                marginBottom: "28px",
              }}
            >
              ശരിയായ Malayalam meaning തിരഞ്ഞെടുക്കൂ
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            {question.options.map(function (option) {
              const isCorrect = option === question.answer;
              const isSelected = option === selectedAnswer;

              let background = "#ffffff";
              let border = "#cbd5e1";
              let color = "#1e293b";

              if (answered && isCorrect) {
                background = "#dcfce7";
                border = "#16a34a";
                color = "#166534";
              } else if (answered && isSelected) {
                background = "#fee2e2";
                border = "#dc2626";
                color = "#991b1b";
              }

              return (
                <button
                  key={option}
                  onClick={function () {
                    chooseAnswer(option);
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    border: "2px solid " + border,
                    borderRadius: "14px",
                    padding: "16px",
                    background: background,
                    color: color,
                    fontSize: "16px",
                    fontWeight: "700",
                    cursor: answered ? "default" : "pointer",
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              style={{
                marginTop: "18px",
                padding: "16px",
                borderRadius: "14px",
                background:
                  selectedAnswer === question.answer
                    ? "#f0fdf4"
                    : "#fef2f2",
                color:
                  selectedAnswer === question.answer
                    ? "#166534"
                    : "#991b1b",
                fontWeight: "700",
                lineHeight: "1.6",
              }}
            >
              {selectedAnswer === question.answer
                ? "✅ Correct! +10 XP"
                : "❌ Wrong. Correct answer: " +
                  question.answer}
            </div>
          )}

          {answered && (
            <button
              onClick={nextQuestion}
              style={{
                width: "100%",
                marginTop: "18px",
                border: "none",
                borderRadius: "14px",
                padding: "15px",
                background: "#2563eb",
                color: "#ffffff",
                fontWeight: "800",
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              {current === practiceQuestions.length - 1
                ? "Finish Practice"
                : "Next Question →"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
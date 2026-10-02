"use client";

const numbers = [
  ["1", "jedan", "ഒന്ന്", "യെദാൻ"],
  ["2", "dva", "രണ്ട്", "ദ്വാ"],
  ["3", "tri", "മൂന്ന്", "ത്രി"],
  ["4", "četiri", "നാല്", "ചെതിരി"],
  ["5", "pet", "അഞ്ച്", "പെത്"],
  ["6", "šest", "ആറ്", "ഷെസ്ത്"],
  ["7", "sedam", "ഏഴ്", "സെദം"],
  ["8", "osam", "എട്ട്", "ഒസം"],
  ["9", "devet", "ഒമ്പത്", "ദെവെത്"],
  ["10", "deset", "പത്ത്", "ദെസെത്"],
  ["11", "jedanaest", "പതിനൊന്ന്", "യെദനയെസ്ത്"],
  ["12", "dvanaest", "പന്ത്രണ്ട്", "ദ്വനയെസ്ത്"],
  ["13", "trinaest", "പതിമൂന്ന്", "ത്രിനയെസ്ത്"],
  ["14", "četrnaest", "പതിനാല്", "ചെത്ര്നയെസ്ത്"],
  ["15", "petnaest", "പതിനഞ്ച്", "പെത്നയെസ്ത്"],
  ["16", "šesnaest", "പതിനാറ്", "ഷെസ്നയെസ്ത്"],
  ["17", "sedamnaest", "പതിനേഴ്", "സെദംനയെസ്ത്"],
  ["18", "osamnaest", "പതിനെട്ട്", "ഒസംനയെസ്ത്"],
  ["19", "devetnaest", "പത്തൊമ്പത്", "ദെവെത്നയെസ്ത്"],
  ["20", "dvadeset", "ഇരുപത്", "ദ്വദെസെത്"],
  ["21", "dvadeset jedan", "ഇരുപത്തൊന്ന്", "ദ്വദെസെത് യെദാൻ"],
  ["22", "dvadeset dva", "ഇരുപത്തിരണ്ട്", "ദ്വദെസെത് ദ്വാ"],
  ["23", "dvadeset tri", "ഇരുപത്തിമൂന്ന്", "ദ്വദെസെത് ത്രി"],
  ["24", "dvadeset četiri", "ഇരുപത്തിനാല്", "ദ്വദെസെത് ചെതിരി"],
  ["25", "dvadeset pet", "ഇരുപത്തിയഞ്ച്", "ദ്വദെസെത് പെത്"],
  ["26", "dvadeset šest", "ഇരുപത്തിയാറ്", "ദ്വദെസെത് ഷെസ്ത്"],
  ["27", "dvadeset sedam", "ഇരുപത്തിയേഴ്", "ദ്വദെസെത് സെദം"],
  ["28", "dvadeset osam", "ഇരുപത്തിയെട്ട്", "ദ്വദെസെത് ഒസം"],
  ["29", "dvadeset devet", "ഇരുപത്തിയൊമ്പത്", "ദ്വദെസെത് ദെവെത്"],
  ["30", "trideset", "മുപ്പത്", "ത്രിദെസെത്"],
  ["31", "trideset jedan", "മുപ്പത്തിയൊന്ന്", "ത്രിദെസെത് യെദാൻ"],
  ["32", "trideset dva", "മുപ്പത്തിരണ്ട്", "ത്രിദെസെത് ദ്വാ"],
  ["33", "trideset tri", "മുപ്പത്തിമൂന്ന്", "ത്രിദെസെത് ത്രി"],
  ["34", "trideset četiri", "മുപ്പത്തിനാല്", "ത്രിദെസെത് ചെതിരി"],
  ["35", "trideset pet", "മുപ്പത്തിയഞ്ച്", "ത്രിദെസെത് പെത്"],
  ["36", "trideset šest", "മുപ്പത്തിയാറ്", "ത്രിദെസെത് ഷെസ്ത്"],
  ["37", "trideset sedam", "മുപ്പത്തിയേഴ്", "ത്രിദെസെത് സെദം"],
  ["38", "trideset osam", "മുപ്പത്തിയെട്ട്", "ത്രിദെസെത് ഒസം"],
  ["39", "trideset devet", "മുപ്പത്തിയൊമ്പത്", "ത്രിദെസെത് ദെവെത്"],
  ["40", "četrdeset", "നാൽപ്പത്", "ചെത്ര്ദെസെത്"],
  ["41", "četrdeset jedan", "നാൽപ്പത്തിയൊന്ന്", "ചെത്ര്ദെസെത് യെദാൻ"],
  ["42", "četrdeset dva", "നാൽപ്പത്തിരണ്ട്", "ചെത്ര്ദെസെത് ദ്വാ"],
  ["43", "četrdeset tri", "നാൽപ്പത്തിമൂന്ന്", "ചെത്ര്ദെസെത് ത്രി"],
  ["44", "četrdeset četiri", "നാൽപ്പത്തിനാല്", "ചെത്ര്ദെസെത് ചെതിരി"],
  ["45", "četrdeset pet", "നാൽപ്പത്തിയഞ്ച്", "ചെത്ര്ദെസെത് പെത്"],
  ["46", "četrdeset šest", "നാൽപ്പത്തിയാറ്", "ചെത്ര്ദെസെത് ഷെസ്ത്"],
  ["47", "četrdeset sedam", "നാൽപ്പത്തിയേഴ്", "ചെത്ര്ദെസെത് സെദം"],
  ["48", "četrdeset osam", "നാൽപ്പത്തിയെട്ട്", "ചെത്ര്ദെസെത് ഒസം"],
  ["49", "četrdeset devet", "നാൽപ്പത്തിയൊമ്പത്", "ചെത്ര്ദെസെത് ദെവെത്"],
  ["50", "pedeset", "അമ്പത്", "പെദെസെത്"],
  ["51", "pedeset jedan", "അമ്പത്തിയൊന്ന്", "പെദെസെത് യെദാൻ"],
  ["52", "pedeset dva", "അമ്പത്തിരണ്ട്", "പെദെസെത് ദ്വാ"],
  ["53", "pedeset tri", "അമ്പത്തിമൂന്ന്", "പെദെസെത് ത്രി"],
  ["54", "pedeset četiri", "അമ്പത്തിനാല്", "പെദെസെത് ചെതിരി"],
  ["55", "pedeset pet", "അമ്പത്തിയഞ്ച്", "പെദെസെത് പെത്"],
  ["56", "pedeset šest", "അമ്പത്തിയാറ്", "പെദെസെത് ഷെസ്ത്"],
  ["57", "pedeset sedam", "അമ്പത്തിയേഴ്", "പെദെസെത് സെദം"],
  ["58", "pedeset osam", "അമ്പത്തിയെട്ട്", "പെദെസെത് ഒസം"],
  ["59", "pedeset devet", "അമ്പത്തിയൊമ്പത്", "പെദെസെത് ദെവെത്"],
  ["60", "šezdeset", "അറുപത്", "ഷെസ്ദെസെത്"],
  ["61", "šezdeset jedan", "അറുപത്തിയൊന്ന്", "ഷെസ്ദെസെത് യെദാൻ"],
  ["62", "šezdeset dva", "അറുപത്തിരണ്ട്", "ഷെസ്ദെസെത് ദ്വാ"],
  ["63", "šezdeset tri", "അറുപത്തിമൂന്ന്", "ഷെസ്ദെസെത് ത്രി"],
  ["64", "šezdeset četiri", "അറുപത്തിനാല്", "ഷെസ്ദെസെത് ചെതിരി"],
  ["65", "šezdeset pet", "അറുപത്തിയഞ്ച്", "ഷെസ്ദെസെത് പെത്"],
  ["66", "šezdeset šest", "അറുപത്തിയാറ്", "ഷെസ്ദെസെത് ഷെസ്ത്"],
  ["67", "šezdeset sedam", "അറുപത്തിയേഴ്", "ഷെസ്ദെസെത് സെദം"],
  ["68", "šezdeset osam", "അറുപത്തിയെട്ട്", "ഷെസ്ദെസെത് ഒസം"],
  ["69", "šezdeset devet", "അറുപത്തിയൊമ്പത്", "ഷെസ്ദെസെത് ദെവെത്"],
  ["70", "sedamdeset", "എഴുപത്", "സെദംദെസെത്"],
  ["71", "sedamdeset jedan", "എഴുപത്തിയൊന്ന്", "സെദംദെസെത് യെദാൻ"],
  ["72", "sedamdeset dva", "എഴുപത്തിരണ്ട്", "സെദംദെസെത് ദ്വാ"],
  ["73", "sedamdeset tri", "എഴുപത്തിമൂന്ന്", "സെദംദെസെത് ത്രി"],
  ["74", "sedamdeset četiri", "എഴുപത്തിനാല്", "സെദംദെസെത് ചെതിരി"],
  ["75", "sedamdeset pet", "എഴുപത്തിയഞ്ച്", "സെദംദെസെത് പെത്"],
  ["76", "sedamdeset šest", "എഴുപത്തിയാറ്", "സെദംദെസെത് ഷെസ്ത്"],
  ["77", "sedamdeset sedam", "എഴുപത്തിയേഴ്", "സെദംദെസെത് സെദം"],
  ["78", "sedamdeset osam", "എഴുപത്തിയെട്ട്", "സെദംദെസെത് ഒസം"],
  ["79", "sedamdeset devet", "എഴുപത്തിയൊമ്പത്", "സെദംദെസെത് ദെവെത്"],
  ["80", "osamdeset", "എൺപത്", "ഒസംദെസെത്"],
  ["81", "osamdeset jedan", "എൺപത്തിയൊന്ന്", "ഒസംദെസെത് യെദാൻ"],
  ["82", "osamdeset dva", "എൺപത്തിരണ്ട്", "ഒസംദെസെത് ദ്വാ"],
  ["83", "osamdeset tri", "എൺപത്തിമൂന്ന്", "ഒസംദെസെത് ത്രി"],
  ["84", "osamdeset četiri", "എൺപത്തിനാല്", "ഒസംദെസെത് ചെതിരി"],
  ["85", "osamdeset pet", "എൺപത്തിയഞ്ച്", "ഒസംദെസെത് പെത്"],
  ["86", "osamdeset šest", "എൺപത്തിയാറ്", "ഒസംദെസെത് ഷെസ്ത്"],
  ["87", "osamdeset sedam", "എൺപത്തിയേഴ്", "ഒസംദെസെത് സെദം"],
  ["88", "osamdeset osam", "എൺപത്തിയെട്ട്", "ഒസംദെസെത് ഒസം"],
  ["89", "osamdeset devet", "എൺപത്തിയൊമ്പത്", "ഒസംദെസെത് ദെവെത്"],
  ["90", "devedeset", "തൊണ്ണൂറ്", "ദെവെദെസെത്"],
  ["91", "devedeset jedan", "തൊണ്ണൂറ്റിയൊന്ന്", "ദെവെദെസെത് യെദാൻ"],
  ["92", "devedeset dva", "തൊണ്ണൂറ്റിരണ്ട്", "ദെവെദെസെത് ദ്വാ"],
  ["93", "devedeset tri", "തൊണ്ണൂറ്റിമൂന്ന്", "ദെവെദെസെത് ത്രി"],
  ["94", "devedeset četiri", "തൊണ്ണൂറ്റിനാല്", "ദെവെദെസെത് ചെതിരി"],
  ["95", "devedeset pet", "തൊണ്ണൂറ്റിയഞ്ച്", "ദെവെദെസെത് പെത്"],
  ["96", "devedeset šest", "തൊണ്ണൂറ്റിയാറ്", "ദെവെദെസെത് ഷെസ്ത്"],
  ["97", "devedeset sedam", "തൊണ്ണൂറ്റിയേഴ്", "ദെവെദെസെത് സെദം"],
  ["98", "devedeset osam", "തൊണ്ണൂറ്റിയെട്ട്", "ദെവെദെസെത് ഒസം"],
  ["99", "devedeset devet", "തൊണ്ണൂറ്റിയൊമ്പത്", "ദെവെദെസെത് ദെവെത്"],
  ["100", "sto", "നൂറ്", "സ്തോ"],
];

export default function NumbersPage() {
  function speak(text: string) {
    if (typeof window === "undefined") return;

    if (!("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "hr-HR";
    utterance.rate = 0.85;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "25px 16px 50px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <a
          href="/"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          ← Home
        </a>

        <div
          style={{
            textAlign: "center",
            marginTop: "18px",
            marginBottom: "30px",
          }}
        >
          <div style={{ fontSize: "45px" }}>🔢</div>

          <h1
            style={{
              margin: "8px 0",
              fontSize: "36px",
              color: "#0f172a",
            }}
          >
            Croatian Numbers
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            Learn Croatian numbers from 1 to 100
          </p>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            മലയാളം അർത്ഥവും pronunciation-ഉം audio-യും സഹിതം
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "15px",
          }}
        >
          {numbers.map(function (item) {
            const number = item[0];
            const croatian = item[1];
            const malayalam = item[2];
            const pronunciation = item[3];

            return (
              <div
                key={number}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  padding: "18px",
                  boxShadow:
                    "0 5px 18px rgba(15,23,42,0.06)",
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    background: "#2563eb",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "21px",
                    fontWeight: "800",
                    flexShrink: 0,
                  }}
                >
                  {number}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "800",
                      color: "#0f172a",
                    }}
                  >
                    {croatian}
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      color: "#2563eb",
                      fontWeight: "700",
                    }}
                  >
                    {malayalam}
                  </div>

                  <div
                    style={{
                      marginTop: "3px",
                      color: "#64748b",
                      fontSize: "13px",
                    }}
                  >
                    {pronunciation}
                  </div>
                </div>

                <button
                  onClick={function () {
                    speak(croatian);
                  }}
                  aria-label={
                    "Listen to " + croatian
                  }
                  style={{
                    border: "none",
                    background: "#dbeafe",
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    fontSize: "21px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  🔊
                </button>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#eff6ff",
            borderRadius: "18px",
            textAlign: "center",
            color: "#1e3a8a",
          }}
        >
          <strong>💡 Practice Tip</strong>

          <p style={{ marginBottom: 0 }}>
            ഓരോ number-ന്റെയും 🔊 അമർത്തി Croatian pronunciation
            കേട്ട് repeat ചെയ്യുക.
          </p>
        </div>
      </div>
    </main>
  );
}
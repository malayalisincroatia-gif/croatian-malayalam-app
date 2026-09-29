"use client";

import { useState } from "react";

type Word = {
  category: string;
  croatian: string;
  malayalam: string;
  pronunciation: string;
  example: string;
  exampleMalayalam: string;
};

const vocabulary: Word[] = [
  {
    category: "Greetings",
    croatian: "Pozdrav",
    malayalam: "നമസ്കാരം",
    pronunciation: "പോസ്ദ്രാവ്",
    example: "Pozdrav!",
    exampleMalayalam: "നമസ്കാരം!",
  },
  {
    category: "Greetings",
    croatian: "Dobar dan",
    malayalam: "ശുഭദിനം",
    pronunciation: "ദോബാർ ദാൻ",
    example: "Dobar dan!",
    exampleMalayalam: "ശുഭദിനം!",
  },
  {
    category: "Greetings",
    croatian: "Dobro jutro",
    malayalam: "സുപ്രഭാതം",
    pronunciation: "ദോബ്രോ യുത്രോ",
    example: "Dobro jutro!",
    exampleMalayalam: "സുപ്രഭാതം!",
  },
  {
    category: "Greetings",
    croatian: "Dobra večer",
    malayalam: "ശുഭസായാഹ്നം",
    pronunciation: "ദോബ്രാ വെച്ചർ",
    example: "Dobra večer!",
    exampleMalayalam: "ശുഭസായാഹ്നം!",
  },
  {
    category: "Greetings",
    croatian: "Laku noć",
    malayalam: "ശുഭ രാത്രി",
    pronunciation: "ലാകു നോച്ച്",
    example: "Laku noć!",
    exampleMalayalam: "ശുഭ രാത്രി!",
  },
  {
    category: "Greetings",
    croatian: "Hvala",
    malayalam: "നന്ദി",
    pronunciation: "ഹ്വാല",
    example: "Hvala puno.",
    exampleMalayalam: "വളരെ നന്ദി.",
  },
  {
    category: "Greetings",
    croatian: "Molim",
    malayalam: "ദയവായി / സ്വാഗതം",
    pronunciation: "മൊലിം",
    example: "Molim vas.",
    exampleMalayalam: "ദയവായി.",
  },
  {
    category: "Greetings",
    croatian: "Da",
    malayalam: "അതെ",
    pronunciation: "ദാ",
    example: "Da, naravno.",
    exampleMalayalam: "അതെ, തീർച്ചയായും.",
  },
  {
    category: "Greetings",
    croatian: "Ne",
    malayalam: "ഇല്ല",
    pronunciation: "നെ",
    example: "Ne, hvala.",
    exampleMalayalam: "ഇല്ല, നന്ദി.",
  },
  {
    category: "Greetings",
    croatian: "Doviđenja",
    malayalam: "വിട / വീണ്ടും കാണാം",
    pronunciation: "ദോവിദ്ജെഞാ",
    example: "Doviđenja!",
    exampleMalayalam: "വിട!",
  },

  {
    category: "Home",
    croatian: "Kuća",
    malayalam: "വീട്",
    pronunciation: "കൂച്ചാ",
    example: "Ovo je moja kuća.",
    exampleMalayalam: "ഇതാണ് എന്റെ വീട്.",
  },
  {
    category: "Home",
    croatian: "Soba",
    malayalam: "മുറി",
    pronunciation: "സോബാ",
    example: "Ovo je moja soba.",
    exampleMalayalam: "ഇതാണ് എന്റെ മുറി.",
  },
  {
    category: "Home",
    croatian: "Vrata",
    malayalam: "വാതിൽ",
    pronunciation: "വ്രാതാ",
    example: "Otvori vrata.",
    exampleMalayalam: "വാതിൽ തുറക്കൂ.",
  },
  {
    category: "Home",
    croatian: "Prozor",
    malayalam: "ജനൽ",
    pronunciation: "പ്രോസോർ",
    example: "Otvori prozor.",
    exampleMalayalam: "ജനൽ തുറക്കൂ.",
  },
  {
    category: "Home",
    croatian: "Krevet",
    malayalam: "കിടക്ക",
    pronunciation: "ക്രെവെത്",
    example: "Krevet je u sobi.",
    exampleMalayalam: "കിടക്ക മുറിയിലാണ്.",
  },
  {
    category: "Home",
    croatian: "Stol",
    malayalam: "മേശ",
    pronunciation: "സ്റ്റോൾ",
    example: "Stol je ovdje.",
    exampleMalayalam: "മേശ ഇവിടെ ആണ്.",
  },
  {
    category: "Home",
    croatian: "Stolica",
    malayalam: "കസേര",
    pronunciation: "സ്റ്റോലിത്സാ",
    example: "Sjedni na stolicu.",
    exampleMalayalam: "കസേരയിൽ ഇരിക്കൂ.",
  },
  {
    category: "Home",
    croatian: "Kuhinja",
    malayalam: "അടുക്കള",
    pronunciation: "കൂഹിന്യാ",
    example: "Kuhinja je čista.",
    exampleMalayalam: "അടുക്കള വൃത്തിയാണ്.",
  },
  {
    category: "Home",
    croatian: "Kupaonica",
    malayalam: "ബാത്ത്റൂം",
    pronunciation: "കൂപാവോനിത്സാ",
    example: "Kupaonica je tamo.",
    exampleMalayalam: "ബാത്ത്റൂം അവിടെയാണ്.",
  },
  {
    category: "Home",
    croatian: "Ključ",
    malayalam: "താക്കോൽ",
    pronunciation: "ക്ല്യൂച്ച്",
    example: "Gdje je ključ?",
    exampleMalayalam: "താക്കോൽ എവിടെയാണ്?",
  },

  {
    category: "Work",
    croatian: "Posao",
    malayalam: "ജോലി",
    pronunciation: "പോസാവോ",
    example: "Idem na posao.",
    exampleMalayalam: "ഞാൻ ജോലിക്ക് പോകുന്നു.",
  },
  {
    category: "Work",
    croatian: "Raditi",
    malayalam: "ജോലി ചെയ്യുക",
    pronunciation: "റാദിതി",
    example: "Moram raditi.",
    exampleMalayalam: "എനിക്ക് ജോലി ചെയ്യണം.",
  },
  {
    category: "Work",
    croatian: "Radnik",
    malayalam: "തൊഴിലാളി",
    pronunciation: "റാദ്നിക്",
    example: "On je radnik.",
    exampleMalayalam: "അവൻ ഒരു തൊഴിലാളിയാണ്.",
  },
  {
    category: "Work",
    croatian: "Kolega",
    malayalam: "സഹപ്രവർത്തകൻ",
    pronunciation: "കൊലേഗാ",
    example: "On je moj kolega.",
    exampleMalayalam: "അവൻ എന്റെ സഹപ്രവർത്തകനാണ്.",
  },
  {
    category: "Work",
    croatian: "Šef",
    malayalam: "ബോസ് / മേലുദ്യോഗസ്ഥൻ",
    pronunciation: "ഷെഫ്",
    example: "Šef je ovdje.",
    exampleMalayalam: "ബോസ് ഇവിടെ ആണ്.",
  },
  {
    category: "Work",
    croatian: "Tvornica",
    malayalam: "ഫാക്ടറി",
    pronunciation: "ത്വോർനിത്സാ",
    example: "Radim u tvornici.",
    exampleMalayalam: "ഞാൻ ഫാക്ടറിയിൽ ജോലി ചെയ്യുന്നു.",
  },
  {
    category: "Work",
    croatian: "Smjena",
    malayalam: "ഷിഫ്റ്റ്",
    pronunciation: "സ്മ്യേനാ",
    example: "Moja smjena počinje u osam.",
    exampleMalayalam: "എന്റെ ഷിഫ്റ്റ് എട്ടിന് തുടങ്ങുന്നു.",
  },
  {
    category: "Work",
    croatian: "Plaća",
    malayalam: "ശമ്പളം",
    pronunciation: "പ്ലാച്ചാ",
    example: "Kada je plaća?",
    exampleMalayalam: "ശമ്പളം എപ്പോഴാണ്?",
  },
  {
    category: "Work",
    croatian: "Odmor",
    malayalam: "അവധി / വിശ്രമം",
    pronunciation: "ഒദ്മോർ",
    example: "Danas sam na odmoru.",
    exampleMalayalam: "ഇന്ന് ഞാൻ അവധിയിലാണ്.",
  },
  {
    category: "Work",
    croatian: "Dokument",
    malayalam: "രേഖ",
    pronunciation: "ദൊകുമെന്ത്",
    example: "Trebam dokument.",
    exampleMalayalam: "എനിക്ക് ഒരു രേഖ വേണം.",
  },

  {
    category: "Shopping",
    croatian: "Koliko košta?",
    malayalam: "എത്ര വിലയാണ്?",
    pronunciation: "കൊലികോ കോഷ്ടാ",
    example: "Koliko košta ovo?",
    exampleMalayalam: "ഇതിന് എത്ര വിലയാണ്?",
  },
  {
    category: "Shopping",
    croatian: "Novac",
    malayalam: "പണം",
    pronunciation: "നോവാത്സ്",
    example: "Nemam novca.",
    exampleMalayalam: "എന്റെ കൈയിൽ പണമില്ല.",
  },
  {
    category: "Shopping",
    croatian: "Račun",
    malayalam: "ബിൽ / രസീത്",
    pronunciation: "റാച്ചൂൻ",
    example: "Molim račun.",
    exampleMalayalam: "ബിൽ തരൂ, ദയവായി.",
  },
  {
    category: "Shopping",
    croatian: "Trgovina",
    malayalam: "കട",
    pronunciation: "ത്ര്‌ഗോവിനാ",
    example: "Trgovina je blizu.",
    exampleMalayalam: "കട അടുത്താണ്.",
  },
  {
    category: "Shopping",
    croatian: "Hrana",
    malayalam: "ഭക്ഷണം",
    pronunciation: "ഹ്രാനാ",
    example: "Trebam hranu.",
    exampleMalayalam: "എനിക്ക് ഭക്ഷണം വേണം.",
  },
  {
    category: "Shopping",
    croatian: "Voda",
    malayalam: "വെള്ളം",
    pronunciation: "വോദാ",
    example: "Trebam vodu.",
    exampleMalayalam: "എനിക്ക് വെള്ളം വേണം.",
  },
  {
    category: "Shopping",
    croatian: "Kruh",
    malayalam: "ബ്രെഡ്",
    pronunciation: "ക്രൂ",
    example: "Kupujem kruh.",
    exampleMalayalam: "ഞാൻ ബ്രെഡ് വാങ്ങുന്നു.",
  },
  {
    category: "Shopping",
    croatian: "Mlijeko",
    malayalam: "പാൽ",
    pronunciation: "മ്ലിയേക്കോ",
    example: "Kupujem mlijeko.",
    exampleMalayalam: "ഞാൻ പാൽ വാങ്ങുന്നു.",
  },
  {
    category: "Shopping",
    croatian: "Novčanik",
    malayalam: "പേഴ്സ് / വാലറ്റ്",
    pronunciation: "നോവ്ചാനിക്",
    example: "Gdje je moj novčanik?",
    exampleMalayalam: "എന്റെ പേഴ്സ് എവിടെയാണ്?",
  },
  {
    category: "Shopping",
    croatian: "Skupo",
    malayalam: "വില കൂടിയത്",
    pronunciation: "സ്കൂപോ",
    example: "To je skupo.",
    exampleMalayalam: "അത് വില കൂടുതലാണ്.",
  },

  {
    category: "Restaurant",
    croatian: "Kava",
    malayalam: "കാപ്പി",
    pronunciation: "കാവാ",
    example: "Jednu kavu, molim.",
    exampleMalayalam: "ഒരു കാപ്പി തരൂ, ദയവായി.",
  },
  {
    category: "Restaurant",
    croatian: "Čaj",
    malayalam: "ചായ",
    pronunciation: "ചായ്",
    example: "Želim čaj.",
    exampleMalayalam: "എനിക്ക് ചായ വേണം.",
  },
  {
    category: "Restaurant",
    croatian: "Voda",
    malayalam: "വെള്ളം",
    pronunciation: "വോദാ",
    example: "Molim vodu.",
    exampleMalayalam: "വെള്ളം തരൂ, ദയവായി.",
  },
  {
    category: "Restaurant",
    croatian: "Hrana",
    malayalam: "ഭക്ഷണം",
    pronunciation: "ഹ്രാനാ",
    example: "Hrana je dobra.",
    exampleMalayalam: "ഭക്ഷണം നല്ലതാണ്.",
  },
  {
    category: "Restaurant",
    croatian: "Jelovnik",
    malayalam: "മെനു",
    pronunciation: "യെലോവ്നിക്",
    example: "Molim jelovnik.",
    exampleMalayalam: "മെനു തരൂ.",
  },
  {
    category: "Restaurant",
    croatian: "Račun, molim.",
    malayalam: "ബിൽ തരൂ, ദയവായി.",
    pronunciation: "റാച്ചൂൻ മൊലിം",
    example: "Račun, molim.",
    exampleMalayalam: "ബിൽ തരൂ, ദയവായി.",
  },
  {
    category: "Restaurant",
    croatian: "Dobar tek!",
    malayalam: "ഭക്ഷണം ആസ്വദിക്കൂ!",
    pronunciation: "ദോബാർ തെക്",
    example: "Dobar tek!",
    exampleMalayalam: "ഭക്ഷണം ആസ്വദിക്കൂ!",
  },
  {
    category: "Restaurant",
    croatian: "Ukusno",
    malayalam: "രുചികരം",
    pronunciation: "ഊകൂസ്നോ",
    example: "Vrlo je ukusno.",
    exampleMalayalam: "വളരെ രുചികരമാണ്.",
  },
  {
    category: "Restaurant",
    croatian: "Glad",
    malayalam: "വിശപ്പ്",
    pronunciation: "ഗ്ലാദ്",
    example: "Gladan sam.",
    exampleMalayalam: "എനിക്ക് വിശക്കുന്നു.",
  },
  {
    category: "Restaurant",
    croatian: "Žedan",
    malayalam: "ദാഹം",
    pronunciation: "ഷെദാൻ",
    example: "Žedan sam.",
    exampleMalayalam: "എനിക്ക് ദാഹിക്കുന്നു.",
  },

  {
    category: "Transport",
    croatian: "Autobus",
    malayalam: "ബസ്",
    pronunciation: "ഔതോബൂസ്",
    example: "Gdje je autobus?",
    exampleMalayalam: "ബസ് എവിടെയാണ്?",
  },
  {
    category: "Transport",
    croatian: "Kolodvor",
    malayalam: "സ്റ്റേഷൻ",
    pronunciation: "കൊലോദ്വോർ",
    example: "Gdje je kolodvor?",
    exampleMalayalam: "സ്റ്റേഷൻ എവിടെയാണ്?",
  },
  {
    category: "Transport",
    croatian: "Karta",
    malayalam: "ടിക്കറ്റ്",
    pronunciation: "കാർതാ",
    example: "Trebam kartu.",
    exampleMalayalam: "എനിക്ക് ഒരു ടിക്കറ്റ് വേണം.",
  },
  {
    category: "Transport",
    croatian: "Vlak",
    malayalam: "ട്രെയിൻ",
    pronunciation: "വ്ലാക്",
    example: "Vlak dolazi.",
    exampleMalayalam: "ട്രെയിൻ വരുന്നു.",
  },
  {
    category: "Transport",
    croatian: "Tramvaj",
    malayalam: "ട്രാം",
    pronunciation: "ത്രാംവായ്",
    example: "Idem tramvajem.",
    exampleMalayalam: "ഞാൻ ട്രാമിൽ പോകുന്നു.",
  },
  {
    category: "Transport",
    croatian: "Taksi",
    malayalam: "ടാക്സി",
    pronunciation: "താക്സി",
    example: "Trebam taksi.",
    exampleMalayalam: "എനിക്ക് ടാക്സി വേണം.",
  },
  {
    category: "Transport",
    croatian: "Stanica",
    malayalam: "സ്റ്റോപ്പ്",
    pronunciation: "സ്റ്റാനിത്സാ",
    example: "Sljedeća stanica.",
    exampleMalayalam: "അടുത്ത സ്റ്റോപ്പ്.",
  },
  {
    category: "Transport",
    croatian: "Lijevo",
    malayalam: "ഇടത്",
    pronunciation: "ലിയേവോ",
    example: "Skrenite lijevo.",
    exampleMalayalam: "ഇടത്തേക്ക് തിരിയൂ.",
  },
  {
    category: "Transport",
    croatian: "Desno",
    malayalam: "വലത്",
    pronunciation: "ദെസ്നോ",
    example: "Skrenite desno.",
    exampleMalayalam: "വലത്തേക്ക് തിരിയൂ.",
  },
  {
    category: "Transport",
    croatian: "Ravno",
    malayalam: "നേരെ",
    pronunciation: "രാവ്നോ",
    example: "Idite ravno.",
    exampleMalayalam: "നേരെ പോകൂ.",
  },

  {
    category: "Doctor",
    croatian: "Liječnik",
    malayalam: "ഡോക്ടർ",
    pronunciation: "ലീയെച്ച്നിക്",
    example: "Trebam liječnika.",
    exampleMalayalam: "എനിക്ക് ഡോക്ടറെ വേണം.",
  },
  {
    category: "Doctor",
    croatian: "Bolnica",
    malayalam: "ആശുപത്രി",
    pronunciation: "ബോൽനിത്സാ",
    example: "Gdje je bolnica?",
    exampleMalayalam: "ആശുപത്രി എവിടെയാണ്?",
  },
  {
    category: "Doctor",
    croatian: "Boli me",
    malayalam: "എനിക്ക് വേദനിക്കുന്നു",
    pronunciation: "ബോലി മെ",
    example: "Boli me glava.",
    exampleMalayalam: "എന്റെ തല വേദനിക്കുന്നു.",
  },
  {
    category: "Doctor",
    croatian: "Glava",
    malayalam: "തല",
    pronunciation: "ഗ്ലാവാ",
    example: "Boli me glava.",
    exampleMalayalam: "എന്റെ തല വേദനിക്കുന്നു.",
  },
  {
    category: "Doctor",
    croatian: "Ruka",
    malayalam: "കൈ",
    pronunciation: "റൂകാ",
    example: "Boli me ruka.",
    exampleMalayalam: "എന്റെ കൈ വേദനിക്കുന്നു.",
  },
  {
    category: "Doctor",
    croatian: "Noga",
    malayalam: "കാൽ",
    pronunciation: "നോഗാ",
    example: "Boli me noga.",
    exampleMalayalam: "എന്റെ കാൽ വേദനിക്കുന്നു.",
  },
  {
    category: "Doctor",
    croatian: "Lijek",
    malayalam: "മരുന്ന്",
    pronunciation: "ലിയെക്",
    example: "Trebam lijek.",
    exampleMalayalam: "എനിക്ക് മരുന്ന് വേണം.",
  },
  {
    category: "Doctor",
    croatian: "Temperatura",
    malayalam: "പനി / താപനില",
    pronunciation: "തെംപെരാതൂറാ",
    example: "Imam temperaturu.",
    exampleMalayalam: "എനിക്ക് പനിയുണ്ട്.",
  },
  {
    category: "Doctor",
    croatian: "Hitno",
    malayalam: "അടിയന്തിരം",
    pronunciation: "ഹിത്നോ",
    example: "Ovo je hitno.",
    exampleMalayalam: "ഇത് അടിയന്തിരമാണ്.",
  },
  {
    category: "Doctor",
    croatian: "Pomoć",
    malayalam: "സഹായം",
    pronunciation: "പോമോച്ച്",
    example: "Trebam pomoć.",
    exampleMalayalam: "എനിക്ക് സഹായം വേണം.",
  },

  {
    category: "Bank",
    croatian: "Banka",
    malayalam: "ബാങ്ക്",
    pronunciation: "ബാങ്കാ",
    example: "Gdje je banka?",
    exampleMalayalam: "ബാങ്ക് എവിടെയാണ്?",
  },
  {
    category: "Bank",
    croatian: "Kartica",
    malayalam: "കാർഡ്",
    pronunciation: "കാർതിത്സാ",
    example: "Imam karticu.",
    exampleMalayalam: "എന്റെ കൈയിൽ കാർഡ് ഉണ്ട്.",
  },
  {
    category: "Bank",
    croatian: "Račun",
    malayalam: "ബാങ്ക് അക്കൗണ്ട്",
    pronunciation: "റാച്ചൂൻ",
    example: "Imam račun u banci.",
    exampleMalayalam: "എനിക്ക് ബാങ്കിൽ അക്കൗണ്ട് ഉണ്ട്.",
  },
  {
    category: "Bank",
    croatian: "Novac",
    malayalam: "പണം",
    pronunciation: "നോവാത്സ്",
    example: "Trebam novac.",
    exampleMalayalam: "എനിക്ക് പണം വേണം.",
  },
  {
    category: "Bank",
    croatian: "Bankomat",
    malayalam: "ATM",
    pronunciation: "ബാങ്കോമാത്",
    example: "Gdje je bankomat?",
    exampleMalayalam: "ATM എവിടെയാണ്?",
  },
  {
    category: "Bank",
    croatian: "Uplatiti",
    malayalam: "പണം നിക്ഷേപിക്കുക",
    pronunciation: "ഊപ്ലാതിതി",
    example: "Želim uplatiti novac.",
    exampleMalayalam: "എനിക്ക് പണം നിക്ഷേപിക്കണം.",
  },
  {
    category: "Bank",
    croatian: "Podignuti",
    malayalam: "പണം പിൻവലിക്കുക",
    pronunciation: "പോദിഗ്നൂതി",
    example: "Želim podignuti novac.",
    exampleMalayalam: "എനിക്ക് പണം പിൻവലിക്കണം.",
  },
  {
    category: "Bank",
    croatian: "PIN",
    malayalam: "പിൻ നമ്പർ",
    pronunciation: "പിൻ",
    example: "Unesite PIN.",
    exampleMalayalam: "പിൻ നൽകുക.",
  },
  {
    category: "Bank",
    croatian: "Gotovina",
    malayalam: "കാഷ്",
    pronunciation: "ഗോതോവിനാ",
    example: "Plaćam gotovinom.",
    exampleMalayalam: "ഞാൻ കാഷായി പണമടയ്ക്കുന്നു.",
  },
  {
    category: "Bank",
    croatian: "Plaćanje",
    malayalam: "പേയ്മെന്റ്",
    pronunciation: "പ്ലാച്ചാന്യേ",
    example: "Plaćanje karticom.",
    exampleMalayalam: "കാർഡ് ഉപയോഗിച്ചുള്ള പേയ്മെന്റ്.",
  },

  {
    category: "MUP",
    croatian: "Policija",
    malayalam: "പോലീസ്",
    pronunciation: "പൊലിത്സിയ",
    example: "Gdje je policija?",
    exampleMalayalam: "പോലീസ് എവിടെയാണ്?",
  },
  {
    category: "MUP",
    croatian: "Dokument",
    malayalam: "രേഖ",
    pronunciation: "ദൊകുമെന്ത്",
    example: "Trebam dokument.",
    exampleMalayalam: "എനിക്ക് ഒരു രേഖ വേണം.",
  },
  {
    category: "MUP",
    croatian: "Putovnica",
    malayalam: "പാസ്പോർട്ട്",
    pronunciation: "പുതോവ്നിത്സാ",
    example: "Ovo je moja putovnica.",
    exampleMalayalam: "ഇതാണ് എന്റെ പാസ്പോർട്ട്.",
  },
  {
    category: "MUP",
    croatian: "Osobna iskaznica",
    malayalam: "ഐഡി കാർഡ്",
    pronunciation: "ഒസോബ്നാ ഇസ്കാസ്നിത്സാ",
    example: "Trebam osobnu iskaznicu.",
    exampleMalayalam: "എനിക്ക് ഐഡി കാർഡ് വേണം.",
  },
  {
    category: "MUP",
    croatian: "Dozvola",
    malayalam: "പെർമിറ്റ് / അനുമതി",
    pronunciation: "ദോസ്വൊലാ",
    example: "Trebam dozvolu.",
    exampleMalayalam: "എനിക്ക് പെർമിറ്റ് വേണം.",
  },
  {
    category: "MUP",
    croatian: "Boravišna iskaznica",
    malayalam: "താമസ കാർഡ്",
    pronunciation: "ബൊരാവിഷ്നാ ഇസ്കാസ്നിത്സാ",
    example: "Moja boravišna iskaznica.",
    exampleMalayalam: "എന്റെ താമസ കാർഡ്.",
  },
  {
    category: "MUP",
    croatian: "Adresa",
    malayalam: "വിലാസം",
    pronunciation: "അദ്രെസാ",
    example: "Koja je vaša adresa?",
    exampleMalayalam: "നിങ്ങളുടെ വിലാസം എന്താണ്?",
  },
  {
    category: "MUP",
    croatian: "Termin",
    malayalam: "അപ്പോയിന്റ്മെന്റ്",
    pronunciation: "തെർമിൻ",
    example: "Imam termin.",
    exampleMalayalam: "എനിക്ക് അപ്പോയിന്റ്മെന്റ് ഉണ്ട്.",
  },
  {
    category: "MUP",
    croatian: "Policijska postaja",
    malayalam: "പോലീസ് സ്റ്റേഷൻ",
    pronunciation: "പൊലിത്സിസ്കാ പോസ്തായാ",
    example: "Gdje je policijska postaja?",
    exampleMalayalam: "പോലീസ് സ്റ്റേഷൻ എവിടെയാണ്?",
  },
  {
    category: "MUP",
    croatian: "Potvrda",
    malayalam: "സർട്ടിഫിക്കറ്റ് / സ്ഥിരീകരണ രേഖ",
    pronunciation: "പോത്വർദാ",
    example: "Trebam potvrdu.",
    exampleMalayalam: "എനിക്ക് ഒരു സ്ഥിരീകരണ രേഖ വേണം.",
  },

  {
    category: "Daily Life",
    croatian: "Danas",
    malayalam: "ഇന്ന്",
    pronunciation: "ദാനാസ്",
    example: "Danas radim.",
    exampleMalayalam: "ഇന്ന് ഞാൻ ജോലി ചെയ്യുന്നു.",
  },
  {
    category: "Daily Life",
    croatian: "Sutra",
    malayalam: "നാളെ",
    pronunciation: "സൂത്രാ",
    example: "Vidimo se sutra.",
    exampleMalayalam: "നാളെ കാണാം.",
  },
  {
    category: "Daily Life",
    croatian: "Jučer",
    malayalam: "ഇന്നലെ",
    pronunciation: "യൂച്ചർ",
    example: "Jučer sam radio.",
    exampleMalayalam: "ഇന്നലെ ഞാൻ ജോലി ചെയ്തു.",
  },
  {
    category: "Daily Life",
    croatian: "Danas",
    malayalam: "ഇന്ന്",
    pronunciation: "ദാനാസ്",
    example: "Danas je lijepo.",
    exampleMalayalam: "ഇന്ന് നല്ല ദിവസമാണ്.",
  },
  {
    category: "Daily Life",
    croatian: "Sada",
    malayalam: "ഇപ്പോൾ",
    pronunciation: "സാദാ",
    example: "Sada radim.",
    exampleMalayalam: "ഇപ്പോൾ ഞാൻ ജോലി ചെയ്യുന്നു.",
  },
  {
    category: "Daily Life",
    croatian: "Kasnije",
    malayalam: "പിന്നീട്",
    pronunciation: "കാസ്നിയെ",
    example: "Vidimo se kasnije.",
    exampleMalayalam: "പിന്നീട് കാണാം.",
  },
  {
    category: "Daily Life",
    croatian: "Gdje?",
    malayalam: "എവിടെ?",
    pronunciation: "ഗ്ദ്യേ",
    example: "Gdje je banka?",
    exampleMalayalam: "ബാങ്ക് എവിടെയാണ്?",
  },
  {
    category: "Daily Life",
    croatian: "Kada?",
    malayalam: "എപ്പോൾ?",
    pronunciation: "കാദാ",
    example: "Kada počinje posao?",
    exampleMalayalam: "ജോലി എപ്പോൾ തുടങ്ങും?",
  },
  {
    category: "Daily Life",
    croatian: "Što?",
    malayalam: "എന്ത്?",
    pronunciation: "ഷ്തോ",
    example: "Što je ovo?",
    exampleMalayalam: "ഇത് എന്താണ്?",
  },
  {
    category: "Daily Life",
    croatian: "Tko?",
    malayalam: "ആര്?",
    pronunciation: "ത്കോ",
    example: "Tko je to?",
    exampleMalayalam: "അത് ആരാണ്?",
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
  "Daily Life",
];

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredVocabulary = vocabulary.filter(function (item) {
    const matchesCategory =
      category === "All" || item.category === category;

    const searchText = search.toLowerCase();

    const matchesSearch =
      item.croatian.toLowerCase().includes(searchText) ||
      item.malayalam.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

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
    utterance.rate = 0.85;

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
            marginBottom: "25px",
          }}
        >
          <div>
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

            <h1
              style={{
                fontSize: "36px",
                margin: "12px 0 5px",
                color: "#0f172a",
              }}
            >
              Croatian Vocabulary
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "16px",
              }}
            >
              100+ Croatian words with Malayalam meaning
            </p>
          </div>

          <a
            href="/vocabulary/practice"
            style={{
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              padding: "13px 18px",
              borderRadius: "12px",
              fontWeight: "800",
            }}
          >
            🧠 Practice
          </a>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "18px",
            borderRadius: "18px",
            boxShadow: "0 6px 25px rgba(15, 23, 42, 0.06)",
            marginBottom: "22px",
          }}
        >
          <input
            value={search}
            onChange={function (event) {
              setSearch(event.target.value);
            }}
            placeholder="Search Croatian or Malayalam..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              border: "2px solid #e2e8f0",
              borderRadius: "12px",
              padding: "14px",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >
            {categories.map(function (item) {
              const active = category === item;

              return (
                <button
                  key={item}
                  onClick={function () {
                    setCategory(item);
                  }}
                  style={{
                    border: "none",
                    borderRadius: "999px",
                    padding: "9px 14px",
                    background: active ? "#2563eb" : "#eff6ff",
                    color: active ? "#ffffff" : "#1e40af",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            marginBottom: "15px",
            color: "#64748b",
            fontWeight: "700",
          }}
        >
          Showing {filteredVocabulary.length} words
        </div>

        {filteredVocabulary.length === 0 ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "40px 20px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <div style={{ fontSize: "45px" }}>🔍</div>

            <h2 style={{ color: "#0f172a" }}>
              No words found
            </h2>

            <p>Try another Croatian or Malayalam word.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {filteredVocabulary.map(function (item, index) {
              return (
                <div
                  key={item.category + "-" + item.croatian + "-" + index}
                  style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "20px",
                    boxShadow:
                      "0 6px 20px rgba(15, 23, 42, 0.06)",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      background: "#eff6ff",
                      color: "#1d4ed8",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "800",
                      marginBottom: "12px",
                    }}
                  >
                    {item.category}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          margin: 0,
                          color: "#0f172a",
                          fontSize: "25px",
                        }}
                      >
                        {item.croatian}
                      </h2>

                      <div
                        style={{
                          marginTop: "5px",
                          color: "#64748b",
                          fontSize: "14px",
                        }}
                      >
                        🔊 {item.pronunciation}
                      </div>
                    </div>

                    <button
                      onClick={function () {
                        speak(item.croatian);
                      }}
                      aria-label={"Listen to " + item.croatian}
                      style={{
                        border: "none",
                        background: "#eff6ff",
                        borderRadius: "50%",
                        width: "44px",
                        height: "44px",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    >
                      🔊
                    </button>
                  </div>

                  <div
                    style={{
                      fontSize: "21px",
                      fontWeight: "800",
                      color: "#2563eb",
                      marginTop: "14px",
                    }}
                  >
                    {item.malayalam}
                  </div>

                  <div
                    style={{
                      marginTop: "18px",
                      padding: "13px",
                      background: "#f8fafc",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "800",
                        color: "#475569",
                        marginBottom: "5px",
                      }}
                    >
                      Example
                    </div>

                    <div
                      style={{
                        color: "#0f172a",
                        fontWeight: "700",
                      }}
                    >
                      {item.example}
                    </div>

                    <div
                      style={{
                        marginTop: "5px",
                        color: "#64748b",
                        fontSize: "14px",
                      }}
                    >
                      {item.exampleMalayalam}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
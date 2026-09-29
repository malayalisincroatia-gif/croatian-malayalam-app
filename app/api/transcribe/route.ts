import { NextResponse } from "next/server";

export async function GET() {
const apiKey = (process.env.OPENAI_API_KEY || "").trim();

return NextResponse.json({
status: "Transcription API is working",
keyLoaded: apiKey.length > 0,
keyFormat:
apiKey.length > 0 &&
/^[\x20-\x7E]+$/.test(apiKey),
});
}

export async function POST(request: Request) {
try {
const apiKey = (process.env.OPENAI_API_KEY || "").trim();

if (!apiKey) {
  return NextResponse.json(
    {
      error: "OPENAI_API_KEY is missing.",
    },
    { status: 500 }
  );
}

if (!/^[\x20-\x7E]+$/.test(apiKey)) {
  return NextResponse.json(
    {
      error:
        "OPENAI_API_KEY contains an invalid character.",
    },
    { status: 500 }
  );
}

const formData = await request.formData();

const audio = formData.get("audio");

if (!audio || !(audio instanceof File)) {
  return NextResponse.json(
    {
      error: "Audio file is missing.",
    },
    { status: 400 }
  );
}

const audioBuffer = await audio.arrayBuffer();

if (audioBuffer.byteLength === 0) {
  return NextResponse.json(
    {
      error: "Audio file is empty.",
    },
    { status: 400 }
  );
}

console.log("Audio received:", {
  name: audio.name,
  type: audio.type,
  size: audioBuffer.byteLength,
});

const openAIForm = new FormData();

const fileType =
  audio.type || "audio/webm";

const openAIFile = new File(
  [audioBuffer],
  audio.name || "croatian-speaking.webm",
  {
    type: fileType,
  }
);

openAIForm.append("file", openAIFile);
openAIForm.append(
  "model",
  "gpt-4o-transcribe"
);
openAIForm.append(
  "language",
  "hr"
);

const response = await fetch(
  "https://api.openai.com/v1/audio/transcriptions",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiKey,
    },
    body: openAIForm,
  }
);

const responseText = await response.text();

console.log(
  "OpenAI status:",
  response.status
);

console.log(
  "OpenAI response:",
  responseText
);

if (!response.ok) {
  return NextResponse.json(
    {
      error:
        responseText ||
        "OpenAI transcription request failed.",
    },
    {
      status: response.status,
    }
  );
}

let result: {
  text?: string;
};

try {
  result = JSON.parse(responseText);
} catch {
  return NextResponse.json(
    {
      error:
        "OpenAI returned an invalid JSON response.",
    },
    { status: 500 }
  );
}

return NextResponse.json({
  text: result.text || "",
});

} catch (error: unknown) {
console.error(
"TRANSCRIPTION ERROR:",
error
);

const message =
  error instanceof Error
    ? error.message
    : "Unknown transcription error.";

return NextResponse.json(
  {
    error: message,
  },
  { status: 500 }
);

}
}
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, from = "auto", to = "ta" } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ translatedText: "" });
    }

    // Google Translate Free API endpoint
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(
      text.trim()
    )}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Translation service returned status ${res.status}`);
    }

    const data = await res.json();

    // Reconstruct full text from sentence chunks returned by Google Translate
    let translatedText = "";
    if (Array.isArray(data) && Array.isArray(data[0])) {
      translatedText = data[0]
        .map((chunk: any) => (Array.isArray(chunk) && chunk[0] ? chunk[0] : ""))
        .join("");
    }

    return NextResponse.json({
      translatedText: translatedText || text,
    });
  } catch (error: any) {
    console.error("Translation API Error:", error);
    return NextResponse.json(
      { error: "Translation failed", message: error.message },
      { status: 500 }
    );
  }
}

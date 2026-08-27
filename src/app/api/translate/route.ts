import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, from = "auto", to = "ta" } = await req.json();

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ translatedText: "" });
    }

    const trimmed = text.trim();

    // 1. Try Google Translate GTX endpoint with Browser User-Agent
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(
        trimmed
      )}`;

      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (res.ok) {
        const data = await res.json();
        let translatedText = "";
        if (Array.isArray(data) && Array.isArray(data[0])) {
          translatedText = data[0]
            .map((chunk: any) => (Array.isArray(chunk) && chunk[0] ? chunk[0] : ""))
            .join("");
        }

        if (translatedText && translatedText.trim()) {
          return NextResponse.json({ translatedText: translatedText.trim() });
        }
      }
    } catch (e) {
      console.warn("Google GTX translation failed, trying MyMemory fallback...", e);
    }

    // 2. Fallback to MyMemory API
    try {
      const langPair = `${from === "auto" ? "en" : from}|${to}`;
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        trimmed
      )}&langpair=${encodeURIComponent(langPair)}`;

      const res2 = await fetch(myMemoryUrl);
      if (res2.ok) {
        const data2 = await res2.json();
        if (data2?.responseData?.translatedText) {
          return NextResponse.json({
            translatedText: data2.responseData.translatedText,
          });
        }
      }
    } catch (e) {
      console.warn("MyMemory translation failed:", e);
    }

    return NextResponse.json({ translatedText: trimmed });
  } catch (error: any) {
    console.error("Translation API Error:", error);
    return NextResponse.json(
      { error: "Translation failed", message: error.message },
      { status: 500 }
    );
  }
}

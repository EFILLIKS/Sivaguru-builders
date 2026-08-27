"use client";

import React, { useState } from "react";
import { Sparkles, Loader2, Languages } from "lucide-react";
import { Input, TextArea } from "@/components/ui/Input";

interface BilingualFieldProps {
  label: string;
  sourceValue: string;
  targetValue: string;
  onSourceChange: (val: string) => void;
  onTargetChange: (val: string) => void;
  isTextArea?: boolean;
  rows?: number;
  placeholderSource?: string;
  placeholderTarget?: string;
  sourceError?: string;
  targetError?: string;
  sourceLangLabel?: string;
  targetLangLabel?: string;
  sourceLangCode?: string;
  targetLangCode?: string;
  layout?: "stacked" | "compact";
}

export function BilingualField({
  label,
  sourceValue,
  targetValue,
  onSourceChange,
  onTargetChange,
  isTextArea = false,
  rows = 3,
  placeholderSource = "Enter text in English...",
  placeholderTarget = "தமிழ் உரை எழுதவும்...",
  sourceError,
  targetError,
  sourceLangLabel = "English",
  targetLangLabel = "தமிழ் (Tamil)",
  sourceLangCode = "en",
  targetLangCode = "ta",
  layout = "stacked",
}: BilingualFieldProps) {
  const [translating, setTranslating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTranslate = async (direction: "forward" | "reverse" = "forward") => {
    const textToTranslate = direction === "forward" ? sourceValue : targetValue;
    if (!textToTranslate || !textToTranslate.trim()) return;

    setTranslating(true);
    setErrorMsg("");

    const fromCode = direction === "forward" ? sourceLangCode : targetLangCode;
    const toCode = direction === "forward" ? targetLangCode : sourceLangCode;

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          from: fromCode,
          to: toCode,
        }),
      });

      const data = await res.json();
      if (data.translatedText) {
        if (direction === "forward") {
          onTargetChange(data.translatedText);
        } else {
          onSourceChange(data.translatedText);
        }
      } else {
        setErrorMsg("Failed to translate.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Translation failed.");
    } finally {
      setTranslating(false);
    }
  };

  return (
    <div className="w-full bg-[#FAFAFA] border border-[#E2E8F0] rounded-xl p-3.5 sm:p-4 space-y-3 shadow-2xs hover:border-gray-300 transition-colors">
      {/* Field Group Header */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
        <label className="text-xs sm:text-sm font-semibold text-[#0B1117] flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#F47920] shrink-0" />
          <span>{label}</span>
        </label>
        
        {/* Auto Translate Action Button */}
        <button
          type="button"
          onClick={() => handleTranslate("forward")}
          disabled={translating || !sourceValue?.trim()}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F47920]/10 text-[#F47920] hover:bg-[#F47920]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-xs font-semibold shrink-0"
          title="Click to translate English text into Tamil automatically"
        >
          {translating ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Translating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auto Translate</span>
            </>
          )}
        </button>
      </div>

      {/* Inputs (Stacked for full space & high readability) */}
      <div className={layout === "compact" ? "space-y-2.5" : "grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start"}>
        {/* Source Language Input (English) */}
        <div className="space-y-1 w-full">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">{sourceLangLabel}</span>
          {isTextArea ? (
            <TextArea
              rows={rows}
              value={sourceValue}
              onChange={(e) => onSourceChange(e.target.value)}
              onBlur={() => {
                if (sourceValue?.trim() && !targetValue?.trim() && !translating) {
                  handleTranslate("forward");
                }
              }}
              placeholder={placeholderSource}
              error={sourceError}
            />
          ) : (
            <Input
              value={sourceValue}
              onChange={(e) => onSourceChange(e.target.value)}
              onBlur={() => {
                if (sourceValue?.trim() && !targetValue?.trim() && !translating) {
                  handleTranslate("forward");
                }
              }}
              placeholder={placeholderSource}
              error={sourceError}
            />
          )}
        </div>

        {/* Target Language Input (Tamil) */}
        <div className="space-y-1 w-full">
          <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">{targetLangLabel}</span>
          {isTextArea ? (
            <TextArea
              rows={rows}
              value={targetValue}
              onChange={(e) => onTargetChange(e.target.value)}
              placeholder={placeholderTarget}
              error={targetError}
            />
          ) : (
            <Input
              value={targetValue}
              onChange={(e) => onTargetChange(e.target.value)}
              placeholder={placeholderTarget}
              error={targetError}
            />
          )}
        </div>
      </div>

      {errorMsg && <p className="text-xs text-red-500 font-medium">{errorMsg}</p>}
    </div>
  );
}

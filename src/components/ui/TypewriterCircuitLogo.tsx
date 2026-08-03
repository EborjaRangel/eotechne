"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const WORD = "EOTECHNE";
const TYPE_MS = 130;
const DELETE_MS = 90;
const PAUSE_TYPED_MS = 2200;
const PAUSE_DELETED_MS = 600;

function useTypewriterLoop(word: string) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text.length < word.length) {
      timeout = setTimeout(() => {
        setText(word.slice(0, text.length + 1));
      }, TYPE_MS);
    } else if (!isDeleting && text.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_TYPED_MS);
    } else if (isDeleting && text.length > 0) {
      timeout = setTimeout(() => {
        setText(word.slice(0, text.length - 1));
      }, DELETE_MS);
    } else if (isDeleting && text.length === 0) {
      timeout = setTimeout(() => setIsDeleting(false), PAUSE_DELETED_MS);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, word]);

  return text;
}

interface TypewriterCircuitLogoProps {
  size?: "sm" | "md" | "lg";
  dark?: boolean;
}

export default function TypewriterCircuitLogo({
  size = "lg",
  dark = false,
}: TypewriterCircuitLogoProps) {
  const displayed = useTypewriterLoop(WORD);
  const prefix = displayed.slice(0, 2);
  const techne = displayed.slice(2);

  const iconBox =
    size === "lg"
      ? "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"
      : size === "md"
        ? "h-14 w-14 sm:h-16 sm:w-16"
        : "h-9 w-9 min-[420px]:h-11 min-[420px]:w-11";
  const textSize =
    size === "lg"
      ? "text-2xl sm:text-3xl md:text-5xl"
      : size === "md"
        ? "text-xl sm:text-2xl md:text-3xl"
        : "text-sm min-[420px]:text-lg sm:text-xl";
  const gap =
    size === "sm" ? "gap-1.5 min-[420px]:gap-2 sm:gap-3" : "gap-4 sm:gap-6";

  return (
    <div
      className={`flex min-w-0 items-center ${gap}`}
      aria-label="EOTECHNE"
    >
      {/* Recuadro estático — Propuesta 4: hexágono verde, E blanca */}
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg bg-eotechne-green shadow-sm ${iconBox}`}
        aria-hidden
      >
        <Image
          src="/logos/eotechne-prop4-e-icon.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain object-center p-0.5"
          priority
        />
      </div>

      {/* Animación typewriter — palabra EOTECHNE */}
      <div
        className={`relative min-w-0 font-bold tracking-tight ${textSize} ${
          size === "sm" ? "hidden min-[420px]:block" : ""
        }`}
      >
        <span className="invisible whitespace-nowrap" aria-hidden>
          {WORD}|
        </span>
        <span className="absolute inset-0 whitespace-nowrap">
          <span className={dark ? "text-white" : "text-eotechne-blue-dark"}>
            {prefix}
          </span>
          <span className="text-eotechne-green">{techne}</span>
          <span className="ml-0.5 inline-block animate-pulse text-eotechne-green">
            |
          </span>
        </span>
      </div>
    </div>
  );
}

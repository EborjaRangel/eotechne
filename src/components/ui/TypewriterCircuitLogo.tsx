"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

const WORD = "EOTECHNE";
const TYPE_MS = 130;
const DELETE_MS = 90;
const PAUSE_TYPED_MS = 2200;
const PAUSE_DELETED_MS = 600;

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

function useTypewriterLoop(word: string, animate: boolean) {
  const [text, setText] = useState(word);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!animate) {
      setText(word);
      setIsDeleting(false);
      return;
    }

    setText("");
    setIsDeleting(false);
  }, [animate, word]);

  useEffect(() => {
    if (!animate) return;

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
  }, [animate, text, isDeleting, word]);

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
  const prefersReducedMotion = usePrefersReducedMotion();
  const displayed = useTypewriterLoop(WORD, !prefersReducedMotion);
  const prefix = displayed.slice(0, 2);
  const techne = displayed.slice(2);

  const iconBox =
    size === "lg"
      ? "h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28"
      : size === "md"
        ? "h-14 w-14 sm:h-16 sm:w-16"
        : "h-9 w-9 sm:h-10 sm:w-10";
  const textSize =
    size === "lg"
      ? "text-2xl sm:text-3xl md:text-5xl"
      : size === "md"
        ? "text-xl sm:text-2xl md:text-3xl"
        : "text-xs sm:text-sm md:text-base lg:text-lg";
  const gap = size === "sm" ? "gap-1.5 sm:gap-2" : "gap-4 sm:gap-6";

  return (
    <div
      className={`flex min-w-0 items-center ${gap}`}
      aria-label="EOTECHNE"
    >
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg bg-white shadow-sm ${iconBox}`}
        aria-hidden
      >
        <Image
          src="/logos/eotechne-prop4-e-icon.png"
          alt=""
          fill
          unoptimized
          sizes="48px"
          className="object-contain object-center p-0.5"
          priority
        />
      </div>

      <p
        className={`m-0 shrink-0 whitespace-nowrap font-bold leading-none tracking-tight ${textSize}`}
        aria-hidden
      >
        <span className={dark ? "text-white" : "text-eotechne-blue-dark"}>
          {prefix}
        </span>
        <span className="text-eotechne-green">{techne}</span>
        {!prefersReducedMotion && (
          <span className="ml-0.5 inline-block animate-pulse text-eotechne-green">
            |
          </span>
        )}
      </p>
    </div>
  );
}

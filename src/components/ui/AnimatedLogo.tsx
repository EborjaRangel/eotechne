"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface AnimatedLogoProps {
  variant?: "header" | "hero";
  dark?: boolean;
}

const MONOGRAM_SRC = "/logos/eotechne-logo-propuesta-2-monograma.png";

export default function AnimatedLogo({ variant = "header", dark = false }: AnimatedLogoProps) {
  const isHero = variant === "hero";

  return (
    <Link href="/" className="group flex items-center gap-2">
      <motion.div
        className="relative flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.span
          className={`absolute rounded-lg bg-eotechne-green/30 ${isHero ? "h-14 w-14" : "h-10 w-10"}`}
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`relative overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-eotechne-green/20 ${
            isHero ? "h-14 w-14" : "h-10 w-10"
          }`}
          whileHover={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={MONOGRAM_SRC}
              alt="EOTECHNE monograma"
              width={160}
              height={160}
              className={`absolute left-1/2 top-0 -translate-x-1/2 object-contain ${
                isHero ? "h-[5.5rem] w-[5.5rem]" : "h-16 w-16"
              }`}
              priority
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.span
        className={`font-bold tracking-tight ${
          isHero ? "text-2xl" : "text-xl"
        } ${dark ? "text-white" : "text-eotechne-blue-dark"}`}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        EO
        <motion.span
          className="text-eotechne-green"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          TECHNE
        </motion.span>
      </motion.span>
    </Link>
  );
}

interface AnimatedLogoImageProps {
  src: string;
  alt: string;
}

export function AnimatedLogoImage({ src, alt }: AnimatedLogoImageProps) {
  return (
    <motion.div
      className="relative flex aspect-video items-center justify-center overflow-hidden bg-white p-8"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          width={600}
          height={340}
          className="max-h-full w-auto object-contain"
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-eotechne-green/0 via-eotechne-green/10 to-eotechne-green/0"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
      />
    </motion.div>
  );
}

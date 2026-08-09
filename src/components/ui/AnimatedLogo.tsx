"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { LOGO_ALT, LOGO_PATH } from "@/lib/brand";

interface AnimatedLogoProps {
  variant?: "header" | "hero";
  dark?: boolean;
}

export default function AnimatedLogo({ variant = "header" }: AnimatedLogoProps) {
  const isHero = variant === "hero";
  const logoHeight = isHero ? "h-20 sm:h-24" : "h-11 sm:h-12";

  return (
    <Link href="/" className="group flex items-center">
      <motion.div
        className="relative flex items-center justify-center"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={LOGO_PATH}
            alt={LOGO_ALT}
            width={512}
            height={512}
            unoptimized
            priority
            className={`w-auto object-contain ${logoHeight}`}
          />
        </motion.div>
      </motion.div>
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
          unoptimized
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

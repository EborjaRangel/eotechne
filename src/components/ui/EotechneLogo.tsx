import Image from "next/image";
import { LOGO_ALT, LOGO_PATH } from "@/lib/brand";

interface EotechneLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

const heights = {
  sm: "h-10 sm:h-11",
  md: "h-14 sm:h-16",
  lg: "h-20 sm:h-24 md:h-28",
};

export default function EotechneLogo({
  size = "md",
  className = "",
  priority = false,
}: EotechneLogoProps) {
  return (
    <Image
      src={LOGO_PATH}
      alt={LOGO_ALT}
      width={512}
      height={512}
      unoptimized
      priority={priority}
      className={`w-auto object-contain ${heights[size]} ${className}`}
    />
  );
}

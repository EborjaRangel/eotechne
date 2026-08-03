/** Extrae el ID de un enlace de YouTube (watch, youtu.be o embed). */
export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());

    if (parsed.hostname.includes("studio.youtube.com")) {
      const studioMatch = parsed.pathname.match(/\/video\/([^/?]+)/);
      if (studioMatch) return studioMatch[1];
    }

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return fromQuery;

      const embedMatch = parsed.pathname.match(/^\/embed\/([^/?]+)/);
      if (embedMatch) return embedMatch[1];

      const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/?]+)/);
      if (shortsMatch) return shortsMatch[1];
    }
  } catch {
    return null;
  }

  return null;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function getYouTubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

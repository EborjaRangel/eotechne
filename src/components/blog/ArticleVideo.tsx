import { ExternalLink, Play } from "lucide-react";
import {
  getYouTubeEmbedUrl,
  getYouTubeVideoId,
  getYouTubeWatchUrl,
} from "@/lib/youtube";

interface ArticleVideoProps {
  title: string;
  youtubeUrl?: string;
  videoSrc?: string;
}

export default function ArticleVideo({
  title,
  youtubeUrl,
  videoSrc,
}: ArticleVideoProps) {
  const videoId = youtubeUrl ? getYouTubeVideoId(youtubeUrl) : null;
  const hasYouTube = Boolean(videoId);
  const hasLocalVideo = Boolean(videoSrc);

  if (!hasYouTube && !hasLocalVideo) return null;

  return (
    <section
      aria-label="Video del artículo"
      className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 text-eotechne-blue-dark">
        <Play className="h-5 w-5 text-eotechne-green" />
        <h2 className="text-base font-bold sm:text-lg">Ver en video</h2>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {hasYouTube
          ? "Resumen en video de este artículo en nuestro canal de YouTube."
          : "Resumen en video de este artículo."}
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-black shadow-sm">
        {hasYouTube ? (
          <iframe
            src={getYouTubeEmbedUrl(videoId!)}
            title={`Video: ${title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full"
          />
        ) : (
          <video
            src={videoSrc}
            title={`Video: ${title}`}
            controls
            playsInline
            preload="metadata"
            className="aspect-video w-full bg-black"
          />
        )}
      </div>

      {hasYouTube && (
        <a
          href={getYouTubeWatchUrl(videoId!)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-eotechne-green transition hover:text-eotechne-blue-dark"
        >
          Ver en YouTube
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </section>
  );
}

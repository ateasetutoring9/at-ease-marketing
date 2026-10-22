"use client";

import { useState } from "react";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

/**
 * Click-to-play facade — loads only a static thumbnail until clicked, then
 * swaps in the real iframe. Avoids shipping YouTube's embed JS/iframe to
 * every visitor just to show a thumbnail (this site's PageSpeed discipline,
 * see CLAUDE.md).
 */
export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-lg border border-border bg-panel">
      {playing ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group relative h-full w-full cursor-pointer"
        >
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-105">
              <Play className="h-7 w-7 text-accent" fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

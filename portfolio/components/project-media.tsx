"use client";

import Image from "next/image";

export type ProjectMediaType =
    | { type: "iframe"; src: string }
    | { type: "image"; src: string; alt: string };

export function ProjectMedia({
    media,
    title,
}: {
    media?: ProjectMediaType;
    title: string;
}) {
    if (!media) return null;

    return (
        <div className="overflow-hidden rounded-xl border bg-muted">
            <div className="relative aspect-video w-full">
                {media.type === "image" ? (
                    <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        className="object-cover"
                        priority={false}
                    />
                ) : (
                    <iframe
                        src={media.src}
                        title={`${title} live preview`}
                        className="absolute inset-0 h-full w-full"
                        loading="lazy"
                        sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-top-navigation-by-user-activation"
                    />
                )}
            </div>

            <p className="px-4 py-3 text-xs text-muted-foreground">
                If the live preview doesn’t render (some sites block embedding), use the
                “Live” button below.
            </p>
        </div>
    );
}
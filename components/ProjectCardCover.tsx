import { useState, useEffect } from 'react';

interface ProjectCardCoverProps {
  image?: string;
  title: string;
  children: React.ReactNode;
}

/**
 * Cover image with gradient fallback if `image` is missing or fails to load (404).
 */
export default function ProjectCardCover({
  image,
  title,
  children,
}: ProjectCardCoverProps) {
  const [showImage, setShowImage] = useState(Boolean(image));

  useEffect(() => {
    setShowImage(Boolean(image));
  }, [image]);

  return (
    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-stone-100 dark:from-stone-700 to-stone-200 dark:to-stone-600">
      {image && showImage && (
        // Local static previews under /public; <img> allows graceful onError fallback
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={`${title} — preview`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          onError={() => setShowImage(false)}
        />
      )}
      {/* Readability overlay for badges */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${
          image && showImage
            ? 'from-stone-900/70 via-stone-900/20 to-transparent'
            : 'from-stone-900/25 to-transparent'
        }`}
        aria-hidden
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

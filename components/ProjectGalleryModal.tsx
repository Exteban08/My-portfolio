import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { ProjectGallerySlide } from '@/types';

type ProjectGalleryModalProps = {
  projectId: string;
  title: string;
  images: ProjectGallerySlide[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
  captionPrefix: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  t: (key: string) => string;
};

export default function ProjectGalleryModal({
  projectId,
  title,
  images,
  isOpen,
  initialIndex,
  onClose,
  captionPrefix,
  closeLabel,
  prevLabel,
  nextLabel,
  t,
}: ProjectGalleryModalProps) {
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);

  const goPrev = useCallback(() => {
    setIndex(i => (i <= 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex(i => (i >= images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (isOpen) {
      setIndex(
        Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)),
      );
    }
  }, [isOpen, initialIndex, images.length]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goPrev, goNext]);

  const safeIndex = Math.min(Math.max(index, 0), images.length - 1);
  const current = images[safeIndex];

  const caption = current
    ? t(`${captionPrefix}.${projectId}.galleryCaptions.${current.captionKey}`)
    : '';

  if (!isOpen || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
      role="presentation"
    >
      <div
        className="absolute inset-0 cursor-default bg-stone-950/80 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden border border-stone-200 bg-white shadow-2xl dark:border-stone-600 dark:bg-stone-900"
      >
        <div className="flex items-center justify-between gap-4 border-b border-stone-200 px-4 py-3 dark:border-stone-700 md:px-6">
          <h2
            id={titleId}
            className="text-sm font-light tracking-wide text-stone-900 dark:text-stone-100 md:text-base"
          >
            {title}
            <span className="ml-2 text-stone-500 dark:text-stone-400">
              ({safeIndex + 1}/{images.length})
            </span>
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-50"
            aria-label={closeLabel}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col bg-stone-100 dark:bg-stone-950">
          <div className="relative flex min-h-[40vh] flex-1 items-center justify-center p-4 md:min-h-[50vh] md:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current?.src}
              alt={caption}
              className="max-h-[55vh] max-w-full object-contain shadow-lg"
            />
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-stone-200 bg-white/95 text-stone-700 shadow-md transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800/95 dark:text-stone-200 dark:hover:bg-stone-700 md:left-4"
              aria-label={prevLabel}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-stone-200 bg-white/95 text-stone-700 shadow-md transition-colors hover:bg-stone-50 dark:border-stone-600 dark:bg-stone-800/95 dark:text-stone-200 dark:hover:bg-stone-700 md:right-4"
              aria-label={nextLabel}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          <p className="border-t border-stone-200 bg-white px-4 py-4 text-center text-sm font-light leading-relaxed text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-400 md:px-8">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}

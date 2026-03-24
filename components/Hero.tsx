import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const RESUME_PATHS = {
  en: '/documents/resume-en.pdf',
  es: '/documents/resume-es.pdf',
} as const;

export default function Hero() {
  const { t, currentLanguage } = useLanguage();

  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const code = currentLanguage.split('-')[0]?.toLowerCase() ?? 'en';
    const isSpanish = code === 'es';
    const href = isSpanish ? RESUME_PATHS.es : RESUME_PATHS.en;
    const downloadName = isSpanish
      ? 'Esteban-Gonzalez-CV.pdf'
      : 'Esteban-Gonzalez-Resume.pdf';

    const link = document.createElement('a');
    link.href = href;
    link.download = downloadName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-stone-50 dark:bg-stone-900 px-4 md:px-8 pt-20">
      <div className="max-w-5xl mx-auto w-full">
        {/* Label */}
        <div className="flex justify-center mb-8">
          <span className="text-xs font-light tracking-widest uppercase text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 px-4 py-2">
            {t('hero.locationLine')}
          </span>
        </div>

        {/* Main heading */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extralight text-stone-900 dark:text-stone-50 tracking-tight leading-none mb-4">
            {t('hero.title')}
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-light text-stone-900 dark:text-stone-50 tracking-tight leading-none">
            {t('hero.titleHighlight')}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-stone-300 dark:bg-stone-600 mx-auto mb-10" />

        {/* Subtitle + Description */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <p className="text-xl md:text-2xl text-stone-700 dark:text-stone-300 font-light tracking-wide">
            {t('hero.subtitle')}
          </p>
          <p className="text-base md:text-lg text-stone-500 dark:text-stone-400 font-light leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        {/* CTAs — same width & height on mobile */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none mx-auto">
          <button
            type="button"
            onClick={scrollToWork}
            className="group bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 min-h-12 px-6 sm:px-8 font-light text-sm sm:text-base tracking-wide transition-all duration-200 hover:bg-stone-800 dark:hover:bg-stone-200 sm:hover:scale-105 flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
          >
            {t('hero.viewWork')}
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={handleDownloadResume}
            className="group border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-50 min-h-12 px-6 sm:px-8 font-light text-sm sm:text-base tracking-wide transition-all duration-200 hover:bg-stone-100 dark:hover:bg-stone-800 hover:border-stone-400 dark:hover:border-stone-500 flex items-center justify-center gap-3 cursor-pointer w-full sm:w-auto"
          >
            <Download className="w-4 h-4 shrink-0" />
            {t('hero.downloadResume')}
          </button>
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-14">
          {[
            'React',
            'TypeScript',
            'Next.js',
            'Django',
            'AWS',
            'React Native',
            'GraphQL',
          ].map(tech => (
            <span
              key={tech}
              className="text-xs font-light tracking-wide text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 px-3 py-1.5 hover:border-stone-300 dark:hover:border-stone-500 hover:text-stone-700 dark:hover:text-stone-200 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-stone-200/30 dark:bg-stone-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-300/20 dark:bg-stone-600/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

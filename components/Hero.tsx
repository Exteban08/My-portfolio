import { ArrowRight, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToWork = () => {
    const element = document.querySelector('#work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    // In a real implementation, you would download the actual resume file
    console.log('Downloading resume...');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-stone-50 px-4 md:px-8 pt-20">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-extralight text-stone-900 tracking-tight mb-6">
            {t('hero.title')}
            <br />
            <span className="font-light">{t('hero.titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-stone-600 font-light tracking-wide leading-relaxed max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-stone-300 mx-auto mb-12" />

        {/* Description */}
        <div className="mb-16 max-w-2xl mx-auto">
          <p className="text-lg text-stone-500 font-light leading-relaxed">
            {t('hero.description')}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={scrollToWork}
            className="group bg-stone-900 text-stone-50 px-8 py-4 rounded-none font-light tracking-wide transition-all duration-200 hover:bg-stone-800 hover:scale-105 flex items-center gap-3 cursor-pointer"
          >
            {t('hero.viewWork')}
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            onClick={handleDownloadResume}
            className="group border border-stone-300 text-stone-900 px-8 py-4 rounded-none font-light tracking-wide transition-all duration-200 hover:bg-stone-100 hover:border-stone-400 flex items-center gap-3 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {t('hero.downloadResume')}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-stone-400 to-transparent" />
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-stone-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-300/20 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

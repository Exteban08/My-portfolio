import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Code, Briefcase, Building2, Layers } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Code, label: t('about.stats.projectsCompleted'), value: '15+' },
    { icon: Briefcase, label: t('about.stats.yearsExperience'), value: '4+' },
    { icon: Building2, label: t('about.stats.companiesWorked'), value: '5' },
    { icon: Layers, label: t('about.stats.technologiesUsed'), value: '20+' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-white dark:bg-stone-950 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 dark:text-stone-50 tracking-tight mb-6">
            {t('about.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 dark:bg-stone-600 mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-2xl font-light text-stone-900 dark:text-stone-50 tracking-tight">
              {t('about.subtitle')}
            </h3>
            <p className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {t('about.description1')}
            </p>
            <p className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {t('about.education')}
            </p>
            <p className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {t('about.description2')}
            </p>
            <p className="text-lg text-stone-600 dark:text-stone-400 font-light leading-relaxed">
              {t('about.description3')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 pt-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`border border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 p-5 transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <stat.icon className="w-4 h-4 text-stone-500 dark:text-stone-400 shrink-0" />
                    <div className="text-2xl font-light text-stone-900 dark:text-stone-50 tracking-tight">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-light tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — EVA Protect card + Philosophy */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* EVA Protect co-founder highlight */}
            <div className="border border-stone-800 dark:border-stone-600 bg-stone-900 dark:bg-stone-800 text-stone-50 p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-stone-50 dark:bg-stone-200 flex items-center justify-center shrink-0">
                  <span className="text-stone-900 text-sm font-medium">E</span>
                </div>
                <div>
                  <span className="text-xs font-light tracking-widest uppercase text-stone-400 block mb-1">
                    {t('about.cofounder.badge')}
                  </span>
                  <h4 className="text-xl font-light tracking-tight">
                    {t('about.cofounder.company')}
                  </h4>
                </div>
              </div>
              <p className="text-stone-400 font-light leading-relaxed text-sm mb-6">
                {t('about.cofounder.description')}
              </p>
              <a
                href="https://evaprotect.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-stone-50 border border-stone-600 hover:bg-stone-700 transition-colors duration-200 px-4 py-2 text-sm font-light tracking-wide"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('about.cofounder.visitLink')}
              </a>
            </div>

            {/* Philosophy */}
            <div className="border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 p-8">
              <h3 className="text-lg font-light text-stone-900 dark:text-stone-50 tracking-tight mb-4">
                {t('about.philosophy')}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 font-light leading-relaxed text-sm">
                {t('about.philosophyText')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

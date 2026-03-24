import { useState, useEffect, useRef } from 'react';
import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { timeline } from '@/data/portfolio';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string>('consultoria-as');
  const sectionRef = useRef<HTMLElement>(null);
  const { t, tArray } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) =>
    setExpandedItem(prev => (prev === id ? '' : id));

  const getHighlights = (id: string): string[] =>
    tArray(`experience.timeline.${id}.highlights`);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 bg-white dark:bg-stone-950 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 dark:text-stone-50 tracking-tight mb-6">
            {t('experience.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 dark:bg-stone-600 mx-auto mb-8" />
          <p className="text-xl text-stone-600 dark:text-stone-400 font-light tracking-wide">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[1.875rem] top-0 bottom-0 w-px bg-stone-200 dark:bg-stone-700" />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const role = t(`experience.timeline.${item.id}.role`);
              const company = t(`experience.timeline.${item.id}.company`);
              const period = t(`experience.timeline.${item.id}.period`);
              const location = t(`experience.timeline.${item.id}.location`);
              const highlights = getHighlights(item.id);

              return (
                <div
                  key={item.id}
                  className={`relative pl-16 transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-[1.875rem] -translate-x-1/2 mt-5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      item.current
                        ? 'border-stone-900 dark:border-stone-50 bg-stone-900 dark:bg-stone-50'
                        : 'border-stone-400 dark:border-stone-600 bg-stone-50 dark:bg-stone-900'
                    }`}
                  >
                    {item.current && (
                      <span className="w-2 h-2 rounded-full bg-stone-50 dark:bg-stone-900 animate-pulse" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`border transition-all duration-200 cursor-pointer group ${
                      item.current
                        ? 'border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-800/50 hover:border-stone-400 dark:hover:border-stone-500'
                        : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600'
                    }`}
                    onClick={() => toggle(item.id)}
                  >
                    <div className="p-6">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {item.current && (
                            <span className="inline-block bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900 text-xs px-2.5 py-0.5 font-light tracking-widest mb-2 uppercase">
                              {t('experience.current')}
                            </span>
                          )}
                          <h3 className="text-xl font-light text-stone-900 dark:text-stone-50 tracking-tight">
                            {role}
                          </h3>
                          <p className="text-stone-600 dark:text-stone-400 font-light mt-0.5 text-base">
                            {company}
                          </p>
                        </div>
                        <button
                          className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors mt-1 shrink-0"
                          aria-label={
                            expandedItem === item.id
                              ? t('experience.hideDetails')
                              : t('experience.showDetails')
                          }
                        >
                          {expandedItem === item.id ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-stone-500 dark:text-stone-500 font-light">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          {period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          {location}
                        </span>
                      </div>

                      {/* Expanded details */}
                      {expandedItem === item.id && (
                        <div className="mt-6 space-y-5">
                          <ul className="space-y-2.5">
                            {highlights.map((highlight, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-stone-600 dark:text-stone-400 font-light text-sm leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-600 mt-1.5 shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {item.tech.map(tech => (
                              <span
                                key={tech}
                                className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 px-2.5 py-1 text-xs font-light tracking-wide"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

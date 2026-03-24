import { useEffect, useRef, useState } from 'react';
import {
  Monitor,
  Server,
  Cloud,
  Smartphone,
  Wrench,
  LucideIcon,
} from 'lucide-react';
import { skillCategories } from '@/data/portfolio';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Cloud,
  Smartphone,
  Wrench,
};

const colorMap: Record<
  string,
  { bg: string; text: string; border: string; dot: string }
> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    dot: 'bg-blue-400 dark:bg-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-400 dark:bg-emerald-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    dot: 'bg-orange-400 dark:bg-orange-500',
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    dot: 'bg-purple-400 dark:bg-purple-500',
  },
  stone: {
    bg: 'bg-stone-100 dark:bg-stone-700/50',
    text: 'text-stone-700 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-600',
    dot: 'bg-stone-400 dark:bg-stone-500',
  },
};

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

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

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 bg-stone-50 dark:bg-stone-900 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 dark:text-stone-50 tracking-tight mb-6">
            {t('skills.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 dark:bg-stone-600 mx-auto mb-8" />
          <p className="text-xl text-stone-600 dark:text-stone-400 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Monitor;
            const colors = colorMap[category.color] ?? colorMap.stone;

            return (
              <div
                key={category.id}
                className={`bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-7 transition-all duration-700 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-9 h-9 rounded-full ${colors.bg} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <h3 className="text-base font-light text-stone-900 dark:text-stone-50 tracking-wide">
                    {t(`skills.categories.${category.id}`)}
                  </h3>
                  <div className={`ml-auto w-2 h-2 rounded-full ${colors.dot}`} />
                </div>

                {/* Skills badges */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span
                      key={skill}
                      className={`${colors.bg} ${colors.text} ${colors.border} border px-3 py-1.5 text-xs font-light tracking-wide rounded-full transition-all duration-150 hover:opacity-80`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-14 text-center">
          <p className="text-stone-500 dark:text-stone-400 font-light leading-relaxed max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </div>
      </div>
    </section>
  );
}

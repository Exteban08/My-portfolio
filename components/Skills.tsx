import { useState, useEffect, useRef } from 'react';
import { Skill } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface SkillsProps {
  skills?: Skill[];
}

const defaultSkills: Skill[] = [
  { name: 'Frontend Development', level: 95, category: 'frontend' },
  { name: 'Backend Architecture', level: 90, category: 'backend' },
  { name: 'Database Design', level: 85, category: 'backend' },
  { name: 'DevOps & Cloud', level: 80, category: 'tools' },
  { name: 'Mobile Development', level: 75, category: 'frontend' },
  { name: 'UI/UX Design', level: 70, category: 'design' },
];

export default function Skills({ skills = defaultSkills }: SkillsProps) {
  const [animatedSkills, setAnimatedSkills] = useState<Skill[]>(
    skills.map(skill => ({ ...skill, level: 0 }))
  );
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate each skill with a slight delay
          skills.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev =>
                prev.map(s =>
                  s.name === skill.name ? { ...s, level: skill.level } : s
                )
              );
            }, index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [skills, isVisible]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend':
        return 'from-blue-500 to-blue-600';
      case 'backend':
        return 'from-green-500 to-green-600';
      case 'tools':
        return 'from-purple-500 to-purple-600';
      case 'design':
        return 'from-pink-500 to-pink-600';
      default:
        return 'from-stone-500 to-stone-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend':
        return '🎨';
      case 'backend':
        return '⚙️';
      case 'tools':
        return '🔧';
      case 'design':
        return '✨';
      default:
        return '💼';
    }
  };

  return (
    <section ref={sectionRef} className="py-32 bg-white px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 tracking-tight mb-6">
            {t('skills.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 mx-auto mb-8" />
          <p className="text-xl text-stone-600 font-light tracking-wide leading-relaxed">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {animatedSkills.map((skill, index) => (
            <div key={skill.name} className="group">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {getCategoryIcon(skill.category)}
                  </span>
                  <span className="text-lg font-light text-stone-900 tracking-wide">
                    {skill.name}
                  </span>
                </div>
                <span className="text-sm font-light text-stone-500 tabular-nums">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-px bg-stone-200 overflow-hidden">
                <div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getCategoryColor(skill.category)} transition-all duration-1000 ease-out`}
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Hover Effect */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                <div className="flex justify-between text-xs text-stone-400 font-light">
                  <span>{t('skills.foundations')}</span>
                  <span>{t('skills.advanced')}</span>
                  <span>{t('skills.expert')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-stone-500 font-light leading-relaxed max-w-2xl mx-auto">
            {t('skills.description')}
          </p>
        </div>

        {/* Tech Categories */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {['frontend', 'backend', 'tools', 'design'].map(category => (
            <div key={category} className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-stone-100 flex items-center justify-center">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
              </div>
              <h3 className="text-sm font-light text-stone-900 tracking-wide">
                {t(`skills.categories.${category}`)}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

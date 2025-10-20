import { useState, useEffect, useRef } from 'react';
import { Award, Users, Code, Coffee } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: Code, label: t('about.stats.projectsCompleted'), value: '50+' },
    { icon: Users, label: t('about.stats.happyClients'), value: '25+' },
    { icon: Award, label: t('about.stats.yearsExperience'), value: '5+' },
    { icon: Coffee, label: t('about.stats.cupsOfCoffee'), value: '2000+' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 bg-stone-50 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight text-stone-900 tracking-tight mb-6">
            {t('about.title')}
          </h2>
          <div className="w-16 h-px bg-stone-300 mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div>
              <h3 className="text-2xl font-light text-stone-900 tracking-tight mb-6">
                {t('about.subtitle')}
              </h3>
              <p className="text-lg text-stone-600 font-light leading-relaxed mb-6">
                {t('about.description1')}
              </p>
              <p className="text-lg text-stone-600 font-light leading-relaxed mb-6">
                {t('about.description2')}
              </p>
              <p className="text-lg text-stone-600 font-light leading-relaxed">
                {t('about.description3')}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`text-center transition-all duration-700 delay-${index * 100} ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-stone-200 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-stone-600" />
                  </div>
                  <div className="text-2xl font-light text-stone-900 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-stone-500 font-light tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Circular Visualization */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Outer Circle */}
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Background Circles */}
              <div className="absolute inset-0 rounded-full border border-stone-200" />
              <div className="absolute inset-8 rounded-full border border-stone-200" />
              <div className="absolute inset-16 rounded-full border border-stone-200" />

              {/* Rotating Inner Circle */}
              <div
                className="absolute inset-20 rounded-full border-2 border-stone-900 transition-transform duration-75"
                style={{ transform: `rotate(${rotation}deg)` }}
              />

              {/* Central Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-900 flex items-center justify-center">
                    <span className="text-stone-50 text-xl font-light tracking-wider">
                      E
                    </span>
                  </div>
                  <h4 className="text-lg font-light text-stone-900 tracking-wide mb-2">
                    Esteban
                  </h4>
                  <p className="text-sm text-stone-500 font-light tracking-wider">
                    Software Engineer
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-stone-400 animate-pulse" />
              </div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse delay-1000" />
              </div>
              <div className="absolute left-8 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse delay-500" />
              </div>
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 rounded-full bg-stone-400 animate-pulse delay-1500" />
              </div>
            </div>

            {/* Background Blur Effect */}
            <div className="absolute inset-0 bg-stone-100/50 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-20 text-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-light text-stone-900 tracking-tight mb-6">
              {t('about.philosophy')}
            </h3>
            <p className="text-lg text-stone-600 font-light leading-relaxed">
              {t('about.philosophyText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

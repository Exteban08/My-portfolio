import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
] as const;

export type LanguageSwitcherVariant = 'dropdown' | 'inline';

interface LanguageSwitcherProps {
  /** `inline` = full-width segmented control (mobile menu). `dropdown` = compact (desktop). */
  variant?: LanguageSwitcherVariant;
  /** Called after language change (e.g. close mobile nav). */
  onLanguageSelected?: () => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  onLanguageSelected,
}) => {
  const { currentLanguage, changeLanguage, isClient } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (languageCode: string) => {
    changeLanguage(languageCode);
    setIsOpen(false);
    onLanguageSelected?.();
  };

  useEffect(() => {
    if (variant !== 'dropdown') return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, variant]);

  /* ─── Inline: large touch targets, no dropdown ─── */
  if (variant === 'inline') {
    if (!isClient) {
      return (
        <div className="w-full" aria-hidden>
          <p className="text-xs font-light tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-3">
            Language / Idioma
          </p>
          <div className="grid grid-cols-2 gap-2">
            {languages.map(lang => (
              <div
                key={lang.code}
                className="flex items-center justify-center gap-2 min-h-12 py-3 px-2 text-sm font-light border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400"
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full">
        <p className="text-xs font-light tracking-widest uppercase text-stone-500 dark:text-stone-400 mb-3">
          Language / Idioma
        </p>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Language">
          {languages.map(lang => {
            const active = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-center gap-2 py-3 px-2 sm:px-3 text-sm font-light tracking-wide transition-all duration-200 border cursor-pointer min-h-12 ${
                  active
                    ? 'border-stone-900 dark:border-stone-50 bg-stone-900 dark:bg-stone-50 text-stone-50 dark:text-stone-900'
                    : 'border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-stone-400 dark:hover:border-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
                aria-pressed={active}
              >
                <span className="text-lg leading-none" aria-hidden>
                  {lang.flag}
                </span>
                <span>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  /* ─── Dropdown (desktop) ─── */
  if (!isClient) {
    return (
      <div className="relative group">
        <button
          className="inline-flex h-10 items-center gap-2 px-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide"
          aria-label="Change language"
        >
          <Globe className="w-4 h-4 shrink-0" />
          <span className="text-sm">🇺🇸</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(o => !o)}
        className="inline-flex h-10 items-center gap-2 px-3 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide cursor-pointer"
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 shrink-0" />
        <span className="text-sm">
          {languages.find(lang => lang.code === currentLanguage)?.flag}
        </span>
      </button>

      <div
        className={`absolute top-full right-0 mt-2 min-w-[9rem] bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-sm shadow-lg dark:shadow-stone-900/50 transition-all duration-200 z-50 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {languages.map(language => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full px-4 py-2.5 text-left text-sm font-light tracking-wide transition-colors duration-200 flex items-center gap-2.5 cursor-pointer ${
              currentLanguage === language.code
                ? 'bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-stone-50'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 hover:text-stone-900 dark:hover:text-stone-50'
            }`}
          >
            <span className="text-base">{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

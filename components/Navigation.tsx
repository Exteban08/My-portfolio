import { useState, useEffect } from 'react';
import Link from 'next/link';
import WaveVisualizer from './WaveVisualizer';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

/** Same touch target as ThemeToggle — keeps header icons aligned */
const mobileIconBtnClass =
  'inline-flex h-10 w-10 shrink-0 items-center justify-center text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50 transition-colors duration-200';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('navigation.work'), href: '#work' },
    { label: t('navigation.experience'), href: '#experience' },
    { label: t('navigation.skills'), href: '#skills' },
    { label: t('navigation.about'), href: '#about' },
    { label: t('navigation.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xl border-b border-stone-200 dark:border-stone-700'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-8">
        <div className="flex items-center justify-between gap-2 min-h-16 py-2 md:min-h-0 md:h-20 md:py-0">
          {/* Logo + name (full name visible on mobile) */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 md:gap-4 group min-w-0 flex-1 md:flex-initial"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="w-9 h-9 shrink-0 rounded-full bg-stone-900 dark:bg-stone-50 flex items-center justify-center md:w-8 md:h-8">
                <span className="text-stone-50 dark:text-stone-900 text-sm font-light tracking-wider">
                  E
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-stone-900 dark:text-stone-50 font-light tracking-wide text-[13px] leading-snug sm:text-sm md:text-lg line-clamp-2 md:line-clamp-none">
                  Esteban González Gómez
                </h1>
                <p className="text-stone-500 dark:text-stone-400 text-[10px] sm:text-xs font-light tracking-wider truncate">
                  {t('navigation.jobTitle')}
                </p>
              </div>
            </div>
            <WaveVisualizer
              size="sm"
              className="hidden md:flex opacity-60 group-hover:opacity-100 transition-opacity duration-300 shrink-0"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide text-sm relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 dark:bg-stone-50 transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile: ThemeToggle + Hamburger — same 40×40 target */}
          <div className="md:hidden flex items-center gap-0.5 shrink-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${mobileIconBtnClass} cursor-pointer`}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-[min(85vh,28rem)] overflow-y-auto opacity-100 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-700 shadow-lg dark:shadow-black/40'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.label}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className="flex w-full min-h-12 items-center text-left text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 transition-colors duration-200 font-light tracking-wide text-sm px-1"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 mt-2 -mx-4 px-4 pb-3 border-t border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800">
            <LanguageSwitcher
              variant="inline"
              onLanguageSelected={() => setIsMobileMenuOpen(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect } from 'react';
import Link from 'next/link';
import WaveVisualizer from './WaveVisualizer';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { label: t('navigation.work'), href: '#work' },
    { label: t('navigation.about'), href: '#about' },
    { label: t('navigation.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-50/80 backdrop-blur-xl border-b border-stone-200'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Wave Visualizer */}
          <Link
            href="/"
            className="flex items-center gap-4 group"
            onClick={e => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center">
                <span className="text-stone-50 text-sm font-light tracking-wider">
                  E
                </span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-stone-900 font-light tracking-wide text-lg">
                  Esteban
                </h1>
                <p className="text-stone-500 text-xs font-light tracking-wider">
                  Software Engineer
                </p>
              </div>
            </div>
            <WaveVisualizer
              size="sm"
              className="opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-stone-600 hover:text-stone-900 transition-colors duration-200 font-light tracking-wide relative group cursor-pointer"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-stone-900 transition-all duration-200 group-hover:w-full" />
              </button>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'max-h-64 opacity-100 bg-stone-50/95 backdrop-blur-xl border-t border-stone-200'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-stone-600 hover:text-stone-900 transition-colors duration-200 font-light tracking-wide py-2"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-stone-200">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}

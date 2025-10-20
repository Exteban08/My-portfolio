import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string) => string;
  isClient: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n, t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side after hydration
    setIsClient(true);

    // Set initial language from i18n, defaulting to English
    const initialLanguage = i18n.language || 'en';
    setCurrentLanguage(initialLanguage);

    // Ensure i18n is set to English if no language is detected
    if (
      !i18n.language ||
      i18n.language === 'en-US' ||
      i18n.language === 'en-GB'
    ) {
      i18n.changeLanguage('en');
    }

    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = (language: string) => {
    if (isClient) {
      i18n.changeLanguage(language);
    }
  };

  // Safe translation function that prevents hydration mismatch
  const safeT = (key: string) => {
    if (!isClient) {
      // During SSR, return a fallback that matches what we expect
      // This prevents hydration mismatch by ensuring server and client render the same
      const fallbacks: Record<string, string> = {
        'navigation.work': 'Work',
        'navigation.about': 'About',
        'navigation.contact': 'Contact',
        'hero.title': 'Crafting Digital',
        'hero.titleHighlight': 'Experiences',
        'hero.subtitle':
          'Precision-driven software engineering with an ear for detail and an eye for elegance',
        'hero.description':
          'I specialize in building sophisticated web applications with meticulous attention to performance, accessibility, and user experience. Every line of code is crafted with intention.',
        'hero.viewWork': 'View My Work',
        'hero.downloadResume': 'Download Resume',
        'projects.title': 'Selected Work',
        'projects.subtitle':
          'A curated selection of projects that showcase precision engineering and thoughtful design',
        'projects.viewProject': 'View Project',
        'projects.liveDemo': 'Live Demo',
        'projects.source': 'Source',
        'projects.viewAllProjects': 'View All Projects',
        'skills.title': 'Expertise',
        'skills.subtitle':
          'A comprehensive skill set honed through years of precision engineering',
        'skills.foundations': 'Foundations',
        'skills.advanced': 'Advanced',
        'skills.expert': 'Expert',
        'skills.description':
          'Continuously expanding my toolkit with emerging technologies and best practices. Each project presents an opportunity to refine and enhance these capabilities.',
        'skills.categories.frontend': 'Frontend',
        'skills.categories.backend': 'Backend',
        'skills.categories.tools': 'Tools',
        'skills.categories.design': 'Design',
        'about.title': 'About Me',
        'about.subtitle': 'Crafting Digital Experiences',
        'about.description1':
          "I'm a software engineer with a passion for creating elegant, performant applications. My approach combines technical precision with thoughtful design, resulting in digital experiences that feel both powerful and intuitive.",
        'about.description2':
          'With a background in both frontend and backend development, I specialize in full-stack solutions that scale. Every project is an opportunity to push boundaries and deliver something exceptional.',
        'about.description3':
          "When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, or enjoying the finer details of audio equipment and minimalist design.",
        'about.stats.projectsCompleted': 'Projects Completed',
        'about.stats.happyClients': 'Happy Clients',
        'about.stats.yearsExperience': 'Years Experience',
        'about.stats.cupsOfCoffee': 'Cups of Coffee',
        'about.philosophy': 'Philosophy',
        'about.philosophyText':
          "I believe in the power of thoughtful design and clean code. Every interaction, every animation, and every line of code should serve a purpose. It's this attention to detail that transforms good software into exceptional experiences.",
      };
      return fallbacks[key] || key;
    }
    return t(key);
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t: safeT,
    isClient,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

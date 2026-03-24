import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  getEnString,
  getEnStringArray,
} from '@/lib/ssrLocaleFallback';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  /** String translations — English on server / before hydration to avoid mismatch */
  t: (key: string) => string;
  /** Array translations (e.g. timeline highlights) — same SSR rule */
  tArray: (key: string) => string[];
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
    setIsClient(true);

    const initialLanguage = i18n.language || 'en';
    setCurrentLanguage(initialLanguage);

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

  const safeT = (key: string) => {
    if (!isClient) {
      return getEnString(key);
    }
    return t(key);
  };

  const safeTArray = (key: string): string[] => {
    if (!isClient) {
      return getEnStringArray(key);
    }
    const raw = t(key, { returnObjects: true });
    return Array.isArray(raw) ? (raw as string[]) : [];
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t: safeT,
    tArray: safeTArray,
    isClient,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

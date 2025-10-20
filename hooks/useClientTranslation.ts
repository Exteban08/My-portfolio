import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const useClientTranslation = () => {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return a safe translation function that only works on client
  const safeT = (key: string) => {
    if (!isClient) {
      // Return the key itself during SSR to prevent hydration mismatch
      return key;
    }
    return t(key);
  };

  return {
    t: safeT,
    i18n,
    isClient,
  };
};

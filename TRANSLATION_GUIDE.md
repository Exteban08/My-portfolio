# Translation Guide

This portfolio now supports internationalization (i18n) with Spanish and English languages.

## How to Use

### Language Switching

- Click the globe icon (🌐) in the navigation bar to switch between languages
- The language preference is saved in localStorage and persists across sessions
- Available languages: English (🇺🇸) and Spanish (🇪🇸)

### Adding New Translations

1. **Add new keys to translation files:**
   - `locales/en/common.json` - English translations
   - `locales/es/common.json` - Spanish translations

2. **Use translations in components:**

   ```tsx
   import { useLanguage } from '@/contexts/LanguageContext';

   function MyComponent() {
     const { t } = useLanguage();

     return <h1>{t('mySection.title')}</h1>;
   }
   ```

3. **Translation key structure:**
   ```json
   {
     "mySection": {
       "title": "My Title",
       "description": "My description"
     }
   }
   ```

### Adding New Languages

1. Create a new directory: `locales/[language-code]/`
2. Add `common.json` with translations
3. Update `lib/i18n.ts` to include the new language
4. Add the language option to `LanguageSwitcher.tsx`

## File Structure

```
locales/
├── en/
│   └── common.json
├── es/
│   └── common.json
lib/
└── i18n.ts
contexts/
└── LanguageContext.tsx
components/
└── LanguageSwitcher.tsx
```

## Features

- ✅ Automatic language detection from browser
- ✅ Language persistence in localStorage
- ✅ Smooth language switching without page reload
- ✅ Type-safe translation keys
- ✅ Mobile-friendly language switcher
- ✅ Fallback to English if translation is missing

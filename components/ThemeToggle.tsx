import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const btnClass =
  'inline-flex h-10 w-10 shrink-0 items-center justify-center text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-50 transition-colors duration-200 cursor-pointer';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={btnClass}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

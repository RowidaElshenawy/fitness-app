import { Moon, Sun } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { useTheme } from '../hooks/use-theme';

const ThemeToggle = () => {
  const { theme, changeTheme } = useTheme();

  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <Button
      type="button"
      onClick={() => changeTheme(isDark ? 'light' : 'dark')}
      className="cursor-pointer"
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeToggle;

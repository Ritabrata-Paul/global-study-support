'use client';

import {useEffect, useState} from 'react';
import {Monitor, Moon, Sun} from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';
const nextTheme: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'system',
  system: 'light',
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gss-theme');
      setTheme(saved === 'dark' || saved === 'system' ? saved : 'light');
    } catch {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === null) return;
    const system = matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      document.documentElement.dataset.theme = theme === 'system'
        ? (system.matches ? 'dark' : 'light')
        : theme;
    };
    apply();
    system.addEventListener('change', apply);
    return () => system.removeEventListener('change', apply);
  }, [theme]);

  const current = theme ?? 'light';
  const next = nextTheme[current];
  const Icon = current === 'dark' ? Moon : current === 'system' ? Monitor : Sun;
  const label = `Theme: ${current}. Switch to ${next} mode`;

  function toggleTheme() {
    setTheme(next);
    try {
      localStorage.setItem('gss-theme', next);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <Icon size={19} aria-hidden="true" />
    </button>
  );
}

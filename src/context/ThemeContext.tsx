import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings } from '../types/index.ts';
import { api } from '../services/api.ts';
import { initialData } from '../data/initialData.ts';

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (newTheme: Partial<ThemeSettings>) => Promise<void>;
  resetTheme: () => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: initialData.themeSettings,
  updateTheme: async () => {},
  resetTheme: async () => {},
  isLoading: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(initialData.themeSettings);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    api
      .getTheme()
      .then((data) => {
        if (mounted && data) {
          setTheme(data);
          applyCssVariables(data);
        }
      })
      .catch((err) => {
        console.warn('Could not fetch theme, using defaults:', err);
        applyCssVariables(initialData.themeSettings);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const applyCssVariables = (settings: ThemeSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', settings.primaryColor);
    root.style.setProperty('--color-secondary', settings.secondaryColor);
    root.style.setProperty('--color-accent', settings.accentColor);
    root.style.setProperty('--color-bg', settings.backgroundColor);
    root.style.setProperty('--color-surface', settings.surfaceColor);
    root.style.setProperty('--color-text', settings.textColor);
    root.style.setProperty('--color-border', settings.borderColor);

    // Apply background color to body
    document.body.style.backgroundColor = settings.backgroundColor;
    document.body.style.color = settings.textColor;
  };

  const updateTheme = async (partialTheme: Partial<ThemeSettings>) => {
    setIsLoading(true);
    try {
      const updated = await api.updateTheme(partialTheme);
      setTheme(updated);
      applyCssVariables(updated);
    } catch (err) {
      console.error('Failed to update theme:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetTheme = async () => {
    setIsLoading(true);
    try {
      const reset = await api.resetTheme();
      setTheme(reset);
      applyCssVariables(reset);
    } catch (err) {
      console.error('Failed to reset theme:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

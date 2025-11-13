import { create } from 'zustand';

export const useThemeStore = create((set, get) => ({
  theme: localStorage.getItem('chatter-theme') || 'dark',
  setTheme: () => {
    const { theme: currentTheme } = get();
    const applyTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('chatter-theme', applyTheme);
    set({ theme: applyTheme });
  },
}));

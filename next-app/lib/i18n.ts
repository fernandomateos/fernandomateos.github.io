export type Lang = 'en' | 'es';

export const defaultLang: Lang = 'en';

export const nav = {
  en: {
    home: 'Home',
    about: 'About',
    research: 'Research',
    blog: 'Blog',
    teAyudo: 'Mentoring',
    lang: 'Español',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    research: 'Investigación',
    blog: 'Blog',
    teAyudo: '¿Te ayudo?',
    lang: 'English',
  },
} as const;

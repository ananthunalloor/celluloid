import de from './locales/de.json';
import en from './locales/en.json';

export * from './config';

export { de, en };

export const messages = {
  en,
  de,
} as const;

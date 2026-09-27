import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from './routing';
import type { Locale } from '@celluloid/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`@celluloid/i18n/locales/${locale}.json`)).default,
  };
});

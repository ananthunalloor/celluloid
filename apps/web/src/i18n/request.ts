import { messages } from '@celluloid/i18n';
import { routing } from './routing';

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  console.log('locakle', locale);
  const resolvedLocale = locale ? locale : routing.defaultLocale;

  return {
    locale: resolvedLocale,
    messages: messages[resolvedLocale as keyof typeof messages],
  };
});

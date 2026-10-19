import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'ua'],
    routing: {
      prefixDefaultLocale: false  // don't add a prefix for the default locale.
    }
  }
});
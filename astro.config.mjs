import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'ua'],
    routing: {
      prefixDefaultLocale: false  // don't add a prefix for the default locale.
    }
  },
  
  site: 'https://zghoba.space',   // the url address of the site.
  base: '/',                      // the site location in the repo. 
});
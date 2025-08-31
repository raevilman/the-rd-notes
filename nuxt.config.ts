import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Load sitemap before content to enable future Nuxt Content integration if needed
  modules: ['@nuxtjs/sitemap', '@nuxt/content', '@nuxt/ui', '@nuxtjs/google-fonts', '@nuxtjs/color-mode', '@nuxtjs/robots'],
  nitro: {
    preset: 'static',
    prerender: { crawlLinks: true }
  },
  compatibilityDate: '2025-08-13',
  // Site config used by @nuxtjs/sitemap (and other Nuxt SEO modules)
  site: {
    // Default to production domain; can be overridden with env
    url: process.env.NUXT_SITE_URL || 'https://www.therdnotes.com',
    name: process.env.NUXT_SITE_NAME || 'theRDnotes'
  },
  // Default sitemap config; discovery works from routes and prerendered pages
  sitemap: {
    // Only include curated sources (published content) + homepage
    excludeAppSources: true,
    urls: [
      '/',
    ],
    sources: [
      '/api/__sitemap__/urls'
    ],
  },
  googleFonts: {
    families: {
      Roboto: [300, 400, 500, 700]
    },
    display: 'swap',
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },
  app: {
    head: {
      title: 'theRDnotes',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'theRDnotes is a collection of technical notes, guides, and articles for developers.' }
      ],
      htmlAttrs: { lang: 'en', class: 'font-roboto' }
    }
  },
  css: ['~/assets/css/main.css', '~/assets/css/app.css'],
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  },
})
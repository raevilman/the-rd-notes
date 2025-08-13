import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxtjs/google-fonts', '@nuxtjs/color-mode'], // @nuxt/fonts removed
  nitro: {
    preset: 'static',
    prerender: { crawlLinks: true }
  },
  compatibilityDate: '2025-08-13',
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      htmlAttrs: { class: 'font-roboto' }
    }
  },
  css: ['~/assets/css/main.css', '~/assets/css/app.css'],
  vite: {
    build: {
      sourcemap: process.env.NODE_ENV !== 'production',
    },
  },
})


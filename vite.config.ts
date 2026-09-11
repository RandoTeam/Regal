import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Icons from 'unplugin-icons/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Icons({
      compiler: 'vue3',
      autoInstall: false
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            // Cache images from Unsplash and other external origins
            urlPattern: /^https:\/\/(images\.unsplash\.com|cdn\..*|.*\.cloudfront\.net)\/.*$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'regal-external-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Cache web fonts
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'regal-google-fonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Regál — Srovnávač cen a nákupní košík ČR',
        short_name: 'Regál',
        description: 'Srovnávač cen a optimalizátor nákupního košíku pro Českou republiku',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'any',
        lang: 'cs',
        categories: ['shopping', 'finance', 'lifestyle'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          }
        ],
        shortcuts: [
          {
            name: 'Katalog potravin',
            short_name: 'Katalog',
            description: 'Procházet akční ceny potravin',
            url: '/#catalog',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Nákupní košík',
            short_name: 'Košík',
            description: 'Zobrazit nákupní košík a optimalizátor',
            url: '/#basket',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          },
          {
            name: 'Akční letáky',
            short_name: 'Letáky',
            description: 'Aktuální akční letáky řetězců',
            url: '/#leaflets',
            icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }]
          }
        ]
      }
    })
  ]
})

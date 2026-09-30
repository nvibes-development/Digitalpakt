import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
  preview: {
    proxy: {
      '/api': 'http://127.0.0.1:3000',
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'digitalpakt-check-icon.svg',
        'digitalpakt-check-icon-192.png',
        'digitalpakt-check-icon-512.png',
        'digitalpakt-check-icon-maskable-512.png',
      ],
      manifest: {
        name: 'KLARFÖRDERN',
        short_name: 'KLARFÖRDERN',
        description:
          'Unverbindliche Vorprüfung von Digitalisierungsvorhaben im Kontext des DigitalPakts 2.0.',
        lang: 'de',
        start_url: '/',
        display: 'standalone',
        background_color: '#FFFFFF',
        theme_color: '#105B5C',
        icons: [
          { src: 'digitalpakt-check-icon.svg', sizes: '1024x1024', type: 'image/svg+xml', purpose: 'any' },
          { src: 'digitalpakt-check-icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'digitalpakt-check-icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'digitalpakt-check-icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/assets\//],
      },
    }),
  ],
});

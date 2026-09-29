import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'DigitalPakt Check',
        short_name: 'DigitalPakt',
        description:
          'Unverbindliche Vorprüfung von Digitalisierungsvorhaben im Kontext des DigitalPakts 2.0.',
        lang: 'de',
        start_url: '/',
        display: 'standalone',
        background_color: '#eef5f7',
        theme_color: '#123f57',
        icons: [
          { src: 'pwa-192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
          { src: 'pwa-512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/assets\//],
      },
    }),
  ],
});

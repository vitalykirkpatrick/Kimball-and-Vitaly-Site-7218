import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import { splitVendorChunkPlugin } from 'vite';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    compression({ 
      include: [/\.(js|css|html|svg|json)$/], 
      threshold: 1024, // Only compress files > 1KB
      algorithm: 'gzip',
    }),
    compression({ 
      include: [/\.(js|css|html|svg|json)$/],
      threshold: 1024,
      algorithm: 'brotli',
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Kimball & Vitaly - Celebrating 20 Years',
        short_name: 'Kimball & Vitaly',
        description: 'Celebrating our journey of love, resilience, and finding home in each other',
        theme_color: '#4F46E5',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      }
    }),
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'react-icons': ['react-icons'],
          'supabase': ['@supabase/supabase-js'],
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    }
  }
});
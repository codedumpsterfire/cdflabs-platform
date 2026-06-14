import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { angularComponentsPlugin } from './vite-plugin-angular';

export default defineConfig({
  plugins: [angularComponentsPlugin()],
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    target: 'ES2022',
  },
  server: {
    port: 4200,
    open: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/app/components', import.meta.url)),
      '@models': fileURLToPath(new URL('./src/models', import.meta.url)),
    },
  },
});

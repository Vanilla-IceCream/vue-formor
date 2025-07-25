import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueRoutes from 'vite-plugin-vue-routes';

export default defineConfig({
  plugins: [vue(), vueRoutes()],
  resolve: {
    alias: {
      '~': resolve(import.meta.dirname, 'src'),
    },
  },
});

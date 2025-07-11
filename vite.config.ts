import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/vue-formor.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['vue', 'valibot'],
    },
  },
  plugins: [
    vue(),
    dts({
      exclude: ['**/__tests__/**'],
    }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});

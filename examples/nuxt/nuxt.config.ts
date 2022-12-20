export default defineNuxtConfig({
  dir: {
    pages: 'modules',
  },
  ignore: [
    '**/*.stories.{js,ts,jsx,tsx}',
    '**/*.{spec,test}.{js,ts,jsx,tsx}',
    '**/*.d.ts',
    '.output',
    '**/-*.*',
    '**/_includes',
  ],
  modules: [['@pinia/nuxt', { autoImports: ['defineStore'] }]],
});

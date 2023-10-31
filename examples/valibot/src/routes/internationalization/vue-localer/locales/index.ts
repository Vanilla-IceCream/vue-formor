import { defineLocale } from 'vue-localer';

import en from './en';

export default defineLocale<typeof en>('valdn', {
  en,
  ...import.meta.glob(['./*.ts', '!./en.ts']),
});

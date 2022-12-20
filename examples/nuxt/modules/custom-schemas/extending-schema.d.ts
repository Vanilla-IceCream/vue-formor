import type { StringSchema } from 'yup';

declare module 'yup' {
  interface StringSchema {
    letters(): StringSchema;
  }
}

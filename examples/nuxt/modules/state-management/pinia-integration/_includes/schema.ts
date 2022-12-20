import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

import { useStore } from './store';

setLocale({
  mixed: {
    required: 'This is a required field',
  },
  string: {
    email: 'This must be a valid email',
    min: 'This must be at least 8 characters',
  },
});

export const useBasicFormsSchema = () => {
  const store = useStore();

  const schema = useSchema([
    [computed(() => store.basicForms.email), string().required().email()],
    [computed(() => store.basicForms.password), string().required().min(8)],
  ], store);

  return schema;
};

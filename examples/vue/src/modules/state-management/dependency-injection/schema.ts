import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

import { useState } from './store';

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
  const state = useState();

  const schema = useSchema([
    [computed(() => state.basicForms.email), string().required().email()],
    [computed(() => state.basicForms.password), string().required().min(8)],
  ], state);

  return schema;
};

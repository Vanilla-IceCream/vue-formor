import type { Ref, ComputedRef } from 'vue';
import type { Schema, ValidationError } from 'yup';
import { watch, unref, onUnmounted } from 'vue';

import { debounce } from './utils';

export const useYupSchema = (schema: Schema | ComputedRef<Schema>, target: Ref, errors: Ref) => {
  let validated = false;

  const validate = () => {
    validated = true;

    const parse = () => {
      let parsedSuccess = false;

      try {
        unref(schema).validateSync(target.value, { abortEarly: false });
        parsedSuccess = true;
        errors.value = {};
      } catch (error) {
        errors.value = {};
        const err = error as ValidationError;

        err.inner.forEach((item) => {
          if (item.path) {
            errors.value[item.path] = item.errors[0];
          }
        });
      }

      return parsedSuccess;
    };

    const debouncing = debounce(() => {
      parse();
    });

    watch(
      () => target.value,
      () => {
        if (validated) debouncing();
      },
      { deep: true },
    );

    return parse();
  };

  const stop = () => {
    validated = false;
    errors.value = {};
  };

  onUnmounted(() => {
    stop();
  });

  return {
    validate,
    stop,
  };
};

import type { Ref } from 'vue';
import type { Schema, ValidationError } from 'yup';
import { watch, effectScope, onUnmounted } from 'vue';

import { debounce } from './utils';

export const useYupSchema = (schema: Schema, target: Ref, errors: Ref) => {
  const scope = effectScope();

  const validate = () => {
    const parse = () => {
      let parsedSuccess = false;

      try {
        schema.validateSync(target.value, { abortEarly: false });
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

    scope.run(() => {
      const debouncing = debounce(() => {
        parse();
      });

      watch(
        () => target.value,
        () => {
          debouncing();
        },
        { deep: true },
      );
    });

    return parse();
  };

  const stop = () => {
    errors.value = {};
    scope.stop();
  };

  onUnmounted(() => {
    stop();
  });

  return {
    validate,
    stop,
  };
};

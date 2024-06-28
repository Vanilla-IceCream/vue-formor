import type { Ref, ComputedRef } from 'vue';
import type { Schema, ValidationError } from 'yup';
import { watch, unref, onUnmounted } from 'vue';

import { debounce } from './utils';

/**
 * @deprecated
 * For front-end development, it is best to use libraries that support tree shaking and modularization.
 * It is recommended to use Valibot. This function will be removed in v6.
 */
export const useYupSchema = (
  schema: Schema | ComputedRef<Schema>,
  target: Ref,
  errors: Ref,
  touched?: Ref,
) => {
  let validated = false;

  function parse(useTouch = false) {
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
          if (useTouch) {
            if (touched?.value?.[item.path]) errors.value[item.path] = item.errors[0];
          } else {
            errors.value[item.path] = item.errors[0];
          }
        }
      });
    }

    return parsedSuccess;
  }

  const validate = () => {
    validated = true;

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

  const run = () => {
    watch(
      () => touched?.value,
      () => {
        if (!validated) parse(true);
      },
      { deep: true },
    );

    const debouncing = debounce(() => {
      parse(true);
    });

    watch(
      () => target.value,
      () => {
        if (!validated) debouncing();
      },
      { deep: true },
    );
  };

  const rerun = () => {
    if (touched?.value) {
      touched.value = {};
    }
  };

  onUnmounted(() => {
    stop();
  });

  return {
    validate,
    stop,
    run,
    rerun,
  };
};

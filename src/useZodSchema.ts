import type { Ref, ComputedRef } from 'vue';
import type { ZodSchema } from 'zod';
import { watch, unref, onUnmounted } from 'vue';

import { debounce } from './utils';

/**
 * @deprecated
 * For front-end development, it is best to use libraries that support tree shaking and modularization.
 * It is recommended to use Valibot. This function will be removed in v6.
 */
export const useZodSchema = (
  schema: ZodSchema | ComputedRef<ZodSchema>,
  target: Ref,
  errors: Ref,
  touched?: Ref,
) => {
  let validated = false;

  function parse(useTouch = false) {
    const parsed = unref(schema).safeParse(target.value);

    errors.value = {};

    if (!parsed.success) {
      for (let i = 0; i < parsed.error.issues.length; i++) {
        const issue = parsed.error.issues[i];

        const errorPath = issue.path.reduce((acc, cur) => {
          if (typeof cur === 'number') return acc + `[${cur}]`;
          return acc + `.${cur}`;
        });

        if (useTouch) {
          if (touched?.value?.[errorPath]) errors.value[errorPath] = issue.message;
        } else {
          errors.value[errorPath] = issue.message;
        }
      }
    }

    return parsed.success;
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

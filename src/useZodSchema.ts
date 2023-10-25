import type { Ref, ComputedRef } from 'vue';
import type { ZodSchema } from 'zod';
import { watch, unref, effectScope, onUnmounted } from 'vue';

import { debounce } from './utils';

export const useZodSchema = (
  schema: ZodSchema | ComputedRef<ZodSchema>,
  target: Ref,
  errors: Ref,
) => {
  const scope = effectScope();

  const validate = () => {
    const parse = () => {
      const parsed = unref(schema).safeParse(target.value);

      errors.value = {};

      if (!parsed.success) {
        for (let i = 0; i < parsed.error.issues.length; i++) {
          const issue = parsed.error.issues[i];

          errors.value[
            issue.path.reduce((acc, cur) => {
              if (typeof cur === 'number') return acc + `[${cur}]`;
              return acc + `.${cur}`;
            })
          ] = issue.message;
        }
      }

      return parsed.success;
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

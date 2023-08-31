import type { EffectScope, Ref } from 'vue';
import type { BaseSchema } from 'valibot';
import { watch, effectScope, onUnmounted } from 'vue';
import { safeParse } from 'valibot';

import { debounce } from './utils';

export const useValibotSchema = (schema: BaseSchema, target: Ref, errors: Ref) => {
  let _scope: EffectScope;

  const validate = () => {
    const scope = effectScope();
    _scope = scope;

    const parse = () => {
      const parsed = safeParse(schema, target.value);

      errors.value = {};

      if (!parsed.success) {
        for (let i = 0; i < parsed.issues.length; i++) {
          const issue = parsed.issues[i];

          let errorPath = issue.path?.[0].key;

          if (issue.path?.some((item) => item.schema === 'array')) {
            errorPath = issue.path?.reduce((acc, cur) => {
              if (typeof cur.key === 'number') return acc + `[${cur.key}]`;
              if (acc) return acc + `.${cur.key}`;
              return cur.key;
            }, '');
          }

          if (errorPath) {
            if (!Object.keys(errors.value).includes(errorPath)) {
              errors.value[errorPath] = issue.message;
            }
          }
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
    _scope?.stop();
  };

  onUnmounted(() => {
    stop();
  });

  return {
    validate,
    stop,
  };
};

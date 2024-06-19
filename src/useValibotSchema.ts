import type { Ref, ComputedRef } from 'vue';
import type { BaseSchema, BaseIssue, ObjectPathItem, ArrayPathItem } from 'valibot';
import { watch, unref, onUnmounted } from 'vue';
import { safeParse } from 'valibot';

import { debounce } from './utils';

export const useValibotSchema = <
  const TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
>(
  schema: TSchema | ComputedRef<TSchema>,
  target: Ref,
  errors: Ref,
  touched?: Ref,
) => {
  let validated = false;

  function parse(useTouch = false) {
    const parsed = safeParse(unref(schema), target.value);

    errors.value = {};

    if (!parsed.success) {
      for (let i = 0; i < parsed.issues.length; i++) {
        const issue = parsed.issues[i];

        let errorPath = issue.path?.length ? String((issue.path?.[0] as ObjectPathItem).key) : '';

        if (issue.path?.some((item) => item.type === 'array')) {
          errorPath = issue.path?.reduce((acc, cur) => {
            const path = cur as ArrayPathItem;
            if (typeof path.key === 'number') return acc + `[${path.key}]`;
            if (acc) return acc + `.${path.key}`;
            return String(path.key);
          }, '');
        }

        if (errorPath) {
          if (!errors.value[errorPath]) {
            if (useTouch) {
              if (touched?.value?.[errorPath]) errors.value[errorPath] = issue.message;
            } else {
              errors.value[errorPath] = issue.message;
            }
          }
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
    rerun();
  });

  return {
    validate,
    stop,
    run,
    rerun,
  };
};

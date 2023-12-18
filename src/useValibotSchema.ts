import type { Ref, ComputedRef } from 'vue';
import type { BaseSchema } from 'valibot';
import { watch, unref, onUnmounted } from 'vue';
import { safeParse } from 'valibot';

import { debounce } from './utils';

export const useValibotSchema = (
  schema: BaseSchema | ComputedRef<BaseSchema>,
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

        let errorPath = issue.path?.length ? String(issue.path?.[0].key) : '';

        if (
          issue.path?.some(
            (item) =>
              // @ts-ignore - valibot v0.19-
              item.schema === 'array' ||
              // valibot v0.20+
              item.type === 'array',
          )
        ) {
          errorPath = issue.path?.reduce((acc, cur) => {
            if (typeof cur.key === 'number') return acc + `[${cur.key}]`;
            if (acc) return acc + `.${cur.key}`;
            return String(cur.key);
          }, '');
        }

        if (errorPath) {
          if (!Object.keys(errors.value).includes(errorPath)) {
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

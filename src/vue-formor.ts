import { watch, onUnmounted } from 'vue';

const getRawKeys = (val: any) => {
  const func = val.expression || val.raw || val.fn;

  const keys = func
    .toString()
    .split('.')
    .map((item: any) => item.replace(/;|\n|}/g, '').trim());

  keys.splice(0, 1);

  return keys.join('.');
};

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

type Field = [any, any];

export const useYupSchema = (fields: Field[], storeIn: any, errorsKey = 'errors') => {
  let checked = false;

  const validate = () => {
    checked = true;
    storeIn[errorsKey] = {};

    for (let i = 0; i < fields.length; i++) {
      const [val, schema] = fields[i];

      const fieldKey = getRawKeys(val.effect);

      if (typeof schema === 'object') {
        let _schema = schema;
        if (schema.value) _schema = schema.value;

        try {
          _schema.validateSync(val.value);
        } catch (error: any) {
          storeIn[errorsKey][fieldKey] = error.message;
        }
      }

      if (typeof schema === 'function') {
        for (let j = 0; j < val.value.length; j++) {
          const row = val.value[j];
          const rowFields = schema(row, j);

          for (let k = 0; k < rowFields.length; k++) {
            const [rowVal, rowSchema] = rowFields[k];

            const rowFieldKey = getRawKeys(rowVal.effect);

            if (typeof rowSchema === 'object') {
              let _rowSchema = rowSchema;
              if (rowSchema.value) _rowSchema = rowSchema.value;

              try {
                _rowSchema.validateSync(rowVal.value);
              } catch (error: any) {
                storeIn[errorsKey][`${fieldKey}[${j}].${rowFieldKey}`] = error.message;
              }
            }

            if (typeof rowSchema === 'function') {
              for (let l = 0; l < rowVal.value.length; l++) {
                const subRow = rowVal.value[l];
                const subRowFields = rowSchema(subRow, l);

                for (let m = 0; m < subRowFields.length; m++) {
                  const [subRowVal, subRowSchema] = subRowFields[m];

                  const subRowFieldKey = getRawKeys(subRowVal.effect);

                  if (typeof subRowSchema === 'object') {
                    let _subRowSchema = subRowSchema;
                    if (subRowSchema.value) _subRowSchema = subRowSchema.value;

                    try {
                      _subRowSchema.validateSync(subRowVal.value);
                    } catch (error: any) {
                      storeIn[errorsKey][
                        `${fieldKey}[${j}].${rowFieldKey}[${l}].${subRowFieldKey}`
                      ] = error.message;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return (
      Object.values(storeIn[errorsKey])
        .filter(Boolean)
        .filter((item) => item !== true).length === 0
    );
  };

  const stop = () => {
    checked = false;
    storeIn[errorsKey] = {};
  };

  const debounced = debounce(() => {
    if (checked) validate();
  }, 250);

  watch(
    () => fields,
    () => {
      debounced();
    },
    { deep: true },
  );

  onUnmounted(() => {
    stop();
  });

  return {
    validate,
    stop,
  };
};

/**
 * @deprecated Please use useYupSchema instead of useSchema.
 */
export const useSchema = useYupSchema;

export { useZodSchema } from './useZodSchema';

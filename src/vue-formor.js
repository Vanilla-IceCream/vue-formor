import { inject, watch, onUnmounted } from 'vue';
import $f from 'message-interpolation';

export const messageSymbol = Symbol('messages');
export const ruleSymbol = Symbol('rule');

const getRawKeys = (val) => {
  const func = val.expression || val.raw || val.fn;

  const keys = func
    .toString()
    .split('.')
    .map((item) => item.replace(/;|\n|}/g, '').trim());

  keys.splice(0, 1);

  return keys.join('.');
};

const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    // @ts-expect-error
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

export const useValidation = (fields, storeIn) => {
  let checked = false;

  const validate = () => {
    checked = true;
    storeIn.errors = {};

    for (let i = 0; i < fields.length; i++) {
      const [val, rules, key] = fields[i];

      let _rules = rules;
      if (_rules?.value) _rules = [...rules.value];

      let curErrMsg = '';
      let storeKey = key;
      if (!key) storeKey = getRawKeys(val.effect);

      if (Array.isArray(_rules)) {
        for (let j = 0; j < _rules.length; j++) {
          const rule = _rules[j];

          if (curErrMsg === '') {
            curErrMsg = rule(val.value);
            storeIn.errors[storeKey] = rule(val.value);
          }
        }
      } else {
        if (Array.isArray(val.value)) {
          for (let k = 0; k < val.value.length; k++) {
            const row = val.value[k];
            const rowFields = _rules(row, k);

            for (let l = 0; l < rowFields.length; l++) {
              const [rowVal, rowRules] = rowFields[l];

              let _rowRules = rowRules;
              if (_rowRules?.value) _rowRules = [..._rowRules.value];

              const rowFieldKey = getRawKeys(rowVal.effect);
              const rowKey = `${storeKey}[${k}].${rowFieldKey}`;
              let rowErrMsg = '';

              if (Array.isArray(_rowRules)) {
                for (let m = 0; m < _rowRules.length; m++) {
                  const rowRule = _rowRules[m];

                  if (rowErrMsg === '') {
                    rowErrMsg = rowRule(rowVal.value);
                    storeIn.errors[rowKey] = rowRule(rowVal.value);
                  }
                }
              } else {
                if (Array.isArray(rowVal.value)) {
                  for (let kk = 0; kk < rowVal.value.length; kk++) {
                    const row = rowVal.value[kk];
                    const rowRowFields = _rowRules(row, kk);

                    for (let ll = 0; ll < rowRowFields.length; ll++) {
                      const [rowRowVal, rowRowRules] = rowRowFields[ll];

                      let _rowRowRules = rowRowRules;
                      if (_rowRowRules?.value) _rowRowRules = [..._rowRowRules.value];

                      const rowRowFieldKey = getRawKeys(rowRowVal.effect);
                      const rowRowKey = `${rowKey}[${kk}].${rowRowFieldKey}`;
                      let rowRowErrMsg = '';

                      for (let mm = 0; mm < _rowRowRules.length; mm++) {
                        const rowRowRule = _rowRowRules[mm];

                        if (rowRowErrMsg === '') {
                          rowRowErrMsg = rowRowRule(rowRowVal.value);
                          storeIn.errors[rowRowKey] = rowRowRule(rowRowVal.value);
                        }
                      }
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
      Object.values(storeIn.errors)
        .filter(Boolean)
        .filter((item) => item !== true).length === 0
    );
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
    checked = false;
    storeIn.errors = {};
  });

  return {
    validate,
    stop() {
      checked = false;
      storeIn.errors = {};
    },
  };
};

export const useValidator = () => {
  const messages = inject(messageSymbol, {
    required: 'This field is required',
    minLength: 'The field must be at least {min} characters long',
    maxLength: 'The field must be max {max} characters long',
  });

  const rules = inject(ruleSymbol, {});

  return {
    ...rules,
    required: (value) => {
      if (!value || (Array.isArray(value) && !value.length)) return messages.required;
      return '';
    },
    minLength: (min) => (value) => {
      if (value && value?.length < min) return $f(messages.minLength, { min });
      return '';
    },
    maxLength: (max) => (value) => {
      if (value && value?.length > max) return $f(messages.maxLength, { max });
      return '';
    },
    validateAll(...validations) {
      return validations.map((item) => item.validate()).every((item) => item === true);
    },
  };
};

export const useSchema = (fields, storeIn, errorsKey = 'errors') => {
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
        } catch (error) {
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
              } catch (error) {
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
                    } catch (error) {
                      storeIn[errorsKey][`${fieldKey}[${j}].${rowFieldKey}[${l}].${subRowFieldKey}`] = error.message;
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
        .filter(item => item !== true).length === 0
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

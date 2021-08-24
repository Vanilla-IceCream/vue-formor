import { watch, onUnmounted } from 'vue';

export const useValidation = (fields, storeIn, isCpn = true, tableKey = '', stackIdx = 0) => {
  watch(
    () => fields,
    (_fields) => {
      for (let i = 0; i < _fields.length; i++) {
        const [val, rules, key] = _fields[i];

        let curErrMsg = '';
        let storeKey = key;

        if (!key) {
          const keys = val.effect.raw
            .toString()
            .split('.')
            .map((item) => item.replace(/;|\n|}/g, '').trim());

          keys.splice(0, 1);
          storeKey = keys.join('.');
        }

        if (tableKey) {
          storeKey = `${tableKey}[${stackIdx}].${storeKey}`;
        }

        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];

          if (storeIn[storeKey + '_watch']) {
            if (curErrMsg === '') {
              curErrMsg = rule(val.value);
              storeIn[storeKey] = rule(val.value);
            }
          }
        }
      }
    },
    { deep: true },
  );

  if (isCpn) {
    onUnmounted(() => {
      for (let i = 0; i < fields.length; i++) {
        const [val, rules, key] = fields[i];

        let storeKey = key;

        if (!key) {
          const keys = val.effect.raw
            .toString()
            .split('.')
            .map((item) => item.replace(/;|\n|}/g, '').trim());

          keys.splice(0, 1);
          storeKey = keys.join('.');
        }

        delete storeIn[storeKey];
        delete storeIn[storeKey + '_watch'];
      }
    });
  }

  return {
    validate() {
      for (let i = 0; i < fields.length; i++) {
        const [val, rules, key] = fields[i];

        let curErrMsg = '';
        let storeKey = key;

        if (!key) {
          const keys = val.effect.raw
            .toString()
            .split('.')
            .map((item) => item.replace(/;|\n|}/g, '').trim());

          keys.splice(0, 1);
          storeKey = keys.join('.');
        }

        if (tableKey) {
          storeKey = `${tableKey}[${stackIdx}].${storeKey}`;
        }

        for (let j = 0; j < rules.length; j++) {
          const rule = rules[j];

          storeIn[storeKey + '_watch'] = true;

          if (curErrMsg === '') {
            curErrMsg = rule(val.value);
            storeIn[storeKey] = rule(val.value);
          }
        }
      }

      return (
        Object.values(storeIn)
          .filter(Boolean)
          .filter((item) => item !== true).length === 0
      );
    },
  };
};

export const useValidationStack = (stack, rowFields, storeIn) => {
  // TODO: [enhancement] If the length of the current array is less than the previous one, revalidate it.

  let validations = [];
  let checkedLength = 0;

  const clean = () => {
    validations = [];

    for (let i = 0; i < stack.value.length; i++) {
      const row = stack.value[i];
      const fields = rowFields(row, i);

      for (let j = 0; j < fields.length; j++) {
        const [val, rules, key] = fields[j];

        let storeKey = key;

        if (!key) {
          let tableKey = '';

          const _tablekeys = stack.effect.raw
            .toString()
            .split('.')
            .map((item) => item.replace(/;|\n|}/g, '').trim());

          _tablekeys.splice(0, 1);
          tableKey = _tablekeys.join('.');

          const keys = val.effect.raw
            .toString()
            .split('.')
            .map((item) => item.replace(/;|\n|}/g, '').trim());

          keys.splice(0, 1);
          storeKey = keys.join('.');
          storeKey = `${tableKey}[${i}].${storeKey}`;
        }

        delete storeIn[storeKey];
        delete storeIn[storeKey + '_watch'];
      }
    }
  };

  watch(
    () => stack.value,
    (_stack) => {
      validations = [];

      let tableKey = '';

      const keys = stack.effect.raw
        .toString()
        .split('.')
        .map((item) => item.replace(/;|\n|}/g, '').trim());

      keys.splice(0, 1);
      tableKey = keys.join('.');

      for (let i = 0; i < _stack.length; i++) {
        const row = _stack[i];
        const rowValidation = useValidation(rowFields(row, i), storeIn, false, tableKey, i);
        validations.push(rowValidation);
      }
    },
    { deep: true },
  );

  onUnmounted(() => {
    clean();
  });

  return {
    validate() {
      checkedLength = validations.length;

      const pass = [];

      for (let i = 0; i < validations.length; i++) {
        const validation = validations[i];
        pass.push(validation.validate());
      }

      return pass.every((item) => item === true);
    },
    recompose() {
      clean();

      if (checkedLength) {
        setTimeout(() => {
          this.validate();
        }, 0);
      }
    },
  };
};

export const useValidator = () => {
  return {
    required: (value) => {
      if (!value || (Array.isArray(value) && !value.length)) return 'This field is required';
      return '';
    },
    minLength: (min) => (value) => {
      return value?.length < min ? `The field must be at least ${min} characters long` : '';
    },
    maxLength: (max) => (value) => {
      return value?.length > max ? `The field must be max ${max}} characters long` : '';
    },
    pattern: (regExp, message) => (value) => {
      return !regExp.test(value) ? message : '';
    },
    validateAll(...validations) {
      return validations.map((item) => item.validate()).every((item) => item === true);
    },
  };
};

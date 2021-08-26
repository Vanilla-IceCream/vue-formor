import { watch, nextTick, onUnmounted } from 'vue';

const getRawKeys = (val) => {
  const keys = val.raw
    .toString()
    .split('.')
    .map((item) => item.replace(/;|\n|}/g, '').trim());

  keys.splice(0, 1);

  return keys.join('.');
};

export const useValidation = (fields, storeIn, isCpn = true, tableKey = '', stackIdx = 0) => {
  let checked = false;

  const clean = () => {
    for (let i = 0; i < fields.length; i++) {
      const [val, rules, key] = fields[i];

      let storeKey = key;
      if (!key) storeKey = getRawKeys(val.effect);

      delete storeIn[storeKey];
      delete storeIn[storeKey + '_watch'];
    }
  };

  const validate = () => {
    checked = true;

    for (let i = 0; i < fields.length; i++) {
      const [val, rules, key] = fields[i];

      let _rules = rules;
      if (_rules?.value) _rules = [...rules.value];

      let curErrMsg = '';
      let storeKey = key;

      if (!key) storeKey = getRawKeys(val.effect);
      if (tableKey) storeKey = `${tableKey}[${stackIdx}].${storeKey}`;

      for (let j = 0; j < _rules.length; j++) {
        const rule = _rules[j];

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
  };

  watch(
    () => fields,
    (_fields) => {
      clean();

      if (checked) {
        nextTick(() => {
          validate();
        });
      }

      for (let i = 0; i < _fields.length; i++) {
        const [val, rules, key] = _fields[i];

        let curErrMsg = '';
        let storeKey = key;

        if (!key) storeKey = getRawKeys(val.effect);
        if (tableKey) storeKey = `${tableKey}[${stackIdx}].${storeKey}`;

        let _rules = rules;
        if (_rules?.value) _rules = [...rules.value];

        for (let j = 0; j < _rules.length; j++) {
          const rule = _rules[j];

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
      clean();
    });
  }

  return { validate };
};

export const useValidationStack = (stack, rowFields, storeIn) => {
  let validations = [];
  let checkedLength = 0;

  const clean = (stackArr) => {
    validations = [];

    for (let i = 0; i < stackArr.length; i++) {
      const row = stackArr[i];
      const fields = rowFields(row, i);

      for (let j = 0; j < fields.length; j++) {
        const [val, rules, key] = fields[j];

        let storeKey = key;

        if (!key) {
          const tableKey = getRawKeys(stack.effect);
          storeKey = getRawKeys(val.effect);
          storeKey = `${tableKey}[${i}].${storeKey}`;
        }

        delete storeIn[storeKey];
        delete storeIn[storeKey + '_watch'];
      }
    }
  };

  const validate = () => {
    checkedLength = validations.length;

    const pass = [];

    for (let i = 0; i < validations.length; i++) {
      const validation = validations[i];
      pass.push(validation.validate());
    }

    return pass.every((item) => item === true);
  };

  watch(
    () => stack.value,
    (_stack, _oldsStack) => {
      clean(_oldsStack);

      if (checkedLength) {
        nextTick(() => {
          validate();
        });
      }

      const tableKey = getRawKeys(stack.effect);

      for (let i = 0; i < _stack.length; i++) {
        const row = _stack[i];
        const rowValidation = useValidation(rowFields(row, i), storeIn, false, tableKey, i);
        validations.push(rowValidation);
      }
    },
    { deep: true },
  );

  onUnmounted(() => {
    clean(stack.value);
  });

  return { validate };
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
      return value?.length > max ? `The field must be max ${max} characters long` : '';
    },
    pattern: (regExp, message) => (value) => {
      return !regExp.test(value) ? message : '';
    },
    validateAll(...validations) {
      return validations.map((item) => item.validate()).every((item) => item === true);
    },
  };
};

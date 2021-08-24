# Vue Formor [![Build Status](https://travis-ci.org/Vanilla-IceCream/vue-formor.svg?branch=main)](https://travis-ci.org/Vanilla-IceCream/vue-formor) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vue-formor/badge.svg?branch=main)](https://coveralls.io/github/Vanilla-IceCream/vue-formor?branch=main)

Form validation for Vue in composition functions.

## Installation and Usage

```sh
$ npm i vue-formor -S
# or
$ pnpm i vue-formor -S
# or
$ yarn add vue-formor
```

```js
// for commonjs
const { useValidator, useValidation, useValidationStack } = require('vue-formor');

// for es modules
import { useValidator, useValidation, useValidationStack } from 'vue-formor';
```

## Getting Started

```vue
<script setup>
import { reactive, computed } from 'vue';
import { useValidator, useValidation } from 'vue-formor';

const state = reactive({
  signInForm: {
    username: '',
    password: '',
  },
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [
    [computed(() => state.signInForm.username), [validator.required]],
    [computed(() => state.signInForm.password), [validator.required]],
  ],
  state.errors,
);

const signIn = () => {
  if (validation.validate()) {
    // ...
  }
};
</script>

<template>
  <form>
    <div>
      <label for="username">Username:</label>
      <input id="username" type="text" v-model="state.signInForm.username" />
      <div>{{ state.errors['signInForm.username'] }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="state.signInForm.password" />
      <div>{{ state.errors['signInForm.password'] }}</div>
    </div>

    <div>
      <button type="button" @click="signIn">Sign In</button>
    </div>
  </form>
</template>
```

Stack

```vue
<script setup>
import { reactive, computed } from 'vue';
import { useValidator, useValidation, useValidationStack } from 'vue-formor';

const state = reactive({
  form: { groupName: '' },
  table: [{ firstField: '', secondField: '', thirdField: '' }],
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [[computed(() => state.form.groupName), [validator.required]]],
  state.errors,
);

const validationStack = useValidationStack(
  computed(() => state.table),
  (row, idx) => [
    [computed(() => row.firstField), [validator.required]],
    [computed(() => row.secondField), [validator.required]],
    [computed(() => row.thirdField), [validator.required]],
  ],
  state.errors,
);

const submit = () => {
  if (validator.validateAll(validation, validationStack)) {
    // ...
  }
};
</script>

<template>
  <form>
    <div>
      <label for="groupName">Group Name:</label>
      <input id="groupName" type="text" v-model="state.form.groupName" />
      <div>{{ state.errors['form.groupName'] }}</div>
    </div>
  </form>

  <table>
    <tr v-for="(row, idx) in state.table" :key="idx">
      <td>
        <input v-model="row.firstField" />
        <div>{{ state.errors[`table[${idx}].firstField`] }}</div>
      </td>
      <td>
        <input v-model="row.secondField" />
        <div>{{ state.errors[`table[${idx}].secondField`] }}</div>
      </td>
      <td>
        <input v-model="row.thirdField" />
        <div>{{ state.errors[`table[${idx}].secondField`] }}</div>
      </td>
    </tr>
  </table>

  <button type="button" @click="submit">Submit</button>
</template>
```

### Internationalization

TODO:

```js
import mi from 'message-interpolation';

const state = reactive({
  errors: {},
});

const validator = useValidator({
  errors: state.errors,
  messages: {
    required: () => 'This field is required',
    minLength: (min) => mi('The field must be at least {min} characters long', { min }),
  },
});

const validation = useValidation(
  [computed(() => state.form.foo), [validator.required]],
  [computed(() => state.form.bar), [validator.required]],
);

const validationStack = useValidationStack(
  computed(() => state.table),
  (row, idx) => [
    [computed(() => row.firstField), [validator.required]],
    [computed(() => row.secondField), [validator.required]],
    [computed(() => row.thirdField), [validator.required]],
  ],
);
```

### Custom Validation Rules

```js
const maxLength = (max) => (value) => {
  return value?.length > max ? `The field must be max ${max}} characters long` : '';
};

const validation = useValidation(
  [[computed(() => state.form.groupName), [validator.required, maxLength(12)]]],
  state.errors,
);
```

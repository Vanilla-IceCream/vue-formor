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
    [computed(() => state.signInForm.username), [validator.required], 'signInForm.username'],
    [computed(() => state.signInForm.password), [validator.required], 'signInForm.password'],
  ],
  state.errors,
);

const signIn = () => {
  if (validation.validate()) {
    // Do sign-in
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
  table: [{ firstField: '', secondField: '', thirdField: '' }],
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [[computed(() => state.form.groupName), [validator.required], 'form.groupName']],
  state.errors,
);

const validationStack = useValidationStack(
  computed(() => state.table),
  (row, idx) => [
    [computed(() => row.firstField), [validator.required], `table[${idx}].firstField`],
    [computed(() => row.secondField), [validator.required], `table[${idx}].secondField`],
    [computed(() => row.thirdField), [validator.required], `table[${idx}].thirdField`],
  ],
  state.errors,
);

const doSth = () => {
  if (validator.validateAll(validation, validationStack)) {
    // ...
  }
};
</script>
```

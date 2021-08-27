# Vue Formor [![Build Status](https://travis-ci.org/Vanilla-IceCream/vue-formor.svg?branch=main)](https://travis-ci.org/Vanilla-IceCream/vue-formor) [![Coverage Status](https://coveralls.io/repos/github/Vanilla-IceCream/vue-formor/badge.svg?branch=main)](https://coveralls.io/github/Vanilla-IceCream/vue-formor?branch=main)

Form validation for Vue in composition functions.

## Installation and Usage

Required: vue >= 3.2 < 4

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
    console.log('Sign-in');
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
  table: [],
  errors: {},
});

const validator = useValidator();

const validationStack = useValidationStack(
  computed(() => state.table),
  (row, idx) => [
    [computed(() => row.firstField), [validator.required]],
    [computed(() => row.secondField), [validator.required]],
    [computed(() => row.thirdField), [validator.required]],
  ],
  state.errors,
);

const add = () => {
  const arr = [...state.table];
  arr.push({ firstField: '', secondField: '', thirdField: '' });
  state.table = arr;
};

const remove = (idx) => {
  const arr = [...state.table];
  arr.splice(idx, 1);
  state.table = arr;
};

const submit = () => {
  if (validationStack.validate()) {
    console.log('Submit');
  }
};
</script>

<template>
  <button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded" @click="add">
    Add
  </button>

  <table>
    <tr v-for="(row, idx) in state.table" :key="idx">
      <td>
        <input v-model="row.firstField" class="border" />
        <div class="text-red-500">{{ state.errors[`table[${idx}].firstField`] }}</div>
      </td>
      <td>
        <input v-model="row.secondField" class="border" />
        <div class="text-red-500">{{ state.errors[`table[${idx}].secondField`] }}</div>
      </td>
      <td>
        <input v-model="row.thirdField" class="border" />
        <div class="text-red-500">{{ state.errors[`table[${idx}].thirdField`] }}</div>
      </td>
      <td>
        <button
          class="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
          @click="remove(idx)"
        >
          Remove
        </button>
      </td>
    </tr>
  </table>

  <button
    type="button"
    class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
    @click="submit"
  >
    Submit
  </button>
</template>
```

Form + Table

```js
if (validator.validateAll(validation, validationStack)) {
  // ...
}
```

### Internationalization

TODO:

```js
import { formorSymbol } from 'vue-formor';

provide(
  formorSymbol,
  reactive({
    required: 'This field is required',
    minLength: 'The field must be at least {min} characters long',
    maxLength: 'The field must be max {max} characters long',
  }),
);
```

### Built-in Rules

```js
const validation = useValidation(
  [
    [
      computed(() => state.form.employeeId),
      [
        validator.required,
        validator.minLength(8),
        validator.maxLength(12),
        validator.pattern(/^[0-9]*$/g, 'This field can only contain numeric values'),
      ],
    ],
  ],
  state.errors,
);
```

### Custom Rules

```js
const compareEmployeeId = (employeeIdInfo) => (val) => {
  if (employeeNoInfo.value !== val.replace(/\D/g, '')) {
    return messageCodeMap[MessageCode.EA0200];
  }

  return '';
};

const validation = useValidation(
  [
    [
      computed(() => state.form.employeeId),
      [validator.required, compareEmployeeNo(computed(() => state.userInfo.employeeId))],
    ],
  ],
  state.errors,
);
```

### Dynamic Rules

```js
const validation = useValidation(
  [
    [computed(() => state.searchForm.branchCode), [validator.required]],
    [
      computed(() => state.searchForm.employeeId),
      computed(() => (state.searchForm.branchCode === 'AC00' ? [validator.required] : [])),
    ],
  ],
  state.errors,
);
```

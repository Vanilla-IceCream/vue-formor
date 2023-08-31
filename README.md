# vue-formor

Form validation for Vue in composition functions.

## Installation

Install `vue-formor` with your favorite package manager:

```sh
$ npm i vue-formor@1.0.1
# or
$ yarn add vue-formor@1.0.1
# or
$ pnpm i vue-formor@1.0.1
# or
$ bun add vue-formor@1.0.1
```

## Usage

```ts
// esm
import { useValidator, useValidation } from 'vue-formor';

// cjs
const { useValidator, useValidation } = require('vue-formor');
```

## Examples

- [Vue](./examples/vue)
- [Nuxt](./examples/nuxt)

## Guide

### Basics

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
  state,
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

### Iterator

```vue
<script setup>
import { reactive, computed } from 'vue';
import { useValidator, useValidation } from 'vue-formor';

const state = reactive({
  table: [],
  errors: {},
});

const validator = useValidator();

const validation = useValidation(
  [
    [
      computed(() => state.table),
      (row, idx) => [
        [computed(() => row.firstField), [validator.required]],
        [computed(() => row.secondField), [validator.required]],
        [computed(() => row.thirdField), [validator.required]],
      ],
    ],
  ],
  state,
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
  if (validation.validate()) {
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

### Built-in Rules

```js
const validation = useValidation(
  [
    [
      computed(() => state.form.employeeId),
      [validator.required, validator.minLength(8), validator.maxLength(12)],
    ],
  ],
  state,
);
```

### Internationalization

```js
import { messageSymbol } from 'vue-formor';

provide(
  messageSymbol,
  reactive({
    required: 'This field is required',
    minLength: 'The field must be at least {min} characters long',
    maxLength: 'The field must be max {max} characters long',
  }),
);
```

### Custom Rules

```js
const compareEmployeeId = (employeeIdInfo) => (val) => {
  if (employeeNoInfo.value !== val.replace(/\D/g, '')) {
    return 'Employee ID does not match';
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
  state,
);
```

Extends from `validator.required`

```js
const validator = useValidator();

const eitherOrRequired = (val) => {
  if (validator.required(val)) return 'Either Customer ID or Account Number field is required';
  return '';
};

const validation = useValidation(
  [
    [
      computed(() => state.searchForm.customerId),
      computed(() => (!state.searchForm.accountNumber ? [eitherOrRequired] : [])),
    ],
    [
      computed(() => state.searchForm.accountNumber),
      computed(() => (!state.searchForm.customerId ? [eitherOrRequired] : [])),
    ],
  ],
  state,
);
```

Custom Rules in `const validator = useValidator();`

```js
import { ruleSymbol } from 'vue-formor';

const startDateRange = (endDate) => (val) => {
  const start = new Date(val).getTime();
  const end = new Date(endDate).getTime();
  if (start > end) return 'Provided date is not in valid range';
  return '';
};

provide(ruleSymbol, reactive({ dateRange }));
```

Extends from `validator.pattern`

```js
import { ruleSymbol } from 'vue-formor';

const onlyNumbers = (val) => {
  return validator.pattern(/^[0-9]*$/g, 'This field can only contain numeric values')(val);
};

provide(ruleSymbol, reactive({ onlyNumbers }));
```

```js
const validation = useValidation(
  [[computed(() => state.form.employeeId), [validator.required, validator.onlyNumbers]]],
  state,
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
  state,
);
```

## API Reference

### `useValidator`

Provide validation rules and helpers

```ts
export interface ValFunc {
  (val: any): string;
}

export interface Rules {
  required: ValFunc;
  minLength(min: number): ValFunc;
  maxLength(min: number): ValFunc;
}

export type UseValidator = Rules & Validator;
```

Type: `useValidator(): UseValidator`

### `useValidation`

Create form validation

```ts
const validation = useValidation(
  [
    // fields
  ],
  // storeIn
);

validation.validate(); // return Boolean

validation.stop();
```

Type: `useValidation(fields, storeIn)`

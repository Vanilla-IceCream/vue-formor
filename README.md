# vue-formor

Form validation for Vue in composition functions with Yup.

This branch refers to the vue-formor v3 release. Check out the [v2](https://github.com/Vanilla-IceCream/vue-formor/tree/v2) branch for v2.

## Installation and Usage

```sh
$ npm i vue-formor yup
# or
$ pnpm i vue-formor yup
# or
$ yarn add vue-formor yup
```

```js
// esm
import { useSchema } from 'vue-formor';

// cjs
const { useSchema } = require('vue-formor');
```

## Examples

- [Basic Forms](./examples/vue/src/modules/basic-forms/Registry.vue)
- [Dynamic Forms](./examples/vue/src/modules/dynamic-forms/Registry.vue)
- [Tabular Forms](./examples/vue/src/modules/tabular-forms/Registry.vue)
- [Tabular Form Groups](./examples/vue/src/modules/tabular-form-groups/Registry.vue)
- [Custom Schemas](./examples/vue/src/modules/custom-schemas/Registry.vue)
- State Management
  - [Dependency Injection](./examples/vue/src/modules/state-management/dependency-injection)
  - [Pinia Integration](./examples/vue/src/modules/state-management/pinia-integration)
- Multiple Schemas
  - [Single-instance](./examples/vue/src/modules/multiple-schemas/single-instance/Registry.vue)
  - [Multiple-instance](./examples/vue/src/modules/multiple-schemas/multiple-instance/Registry.vue)

## Guide

### Basics

```vue
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface BasicForms {
  email: string;
  password: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
  string: {
    email: 'This must be a valid email',
    min: 'This must be at least 8 characters',
  },
});

const state = reactive({
  basicForms: {} as BasicForms,
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [computed(() => state.basicForms.email), string().required().email()],
    [computed(() => state.basicForms.password), string().required().min(8)],
  ],
  state,
);

const signIn = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <form>
    <div>
      <label for="email">Email:</label>
      <input id="email" type="email" v-model="state.basicForms.email" />
      <div>{{ state.errors['basicForms.email'] }}</div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input id="password" type="password" v-model="state.basicForms.password" />
      <div>{{ state.errors['basicForms.password'] }}</div>
    </div>

    <button @click="signIn">Sign in</button>
  </form>
</template>
```

### Iterators

```vue
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

interface DataTableRow {
  firstField: string;
  secondField: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

const state = reactive({
  dataTable: [
    { firstField: 'O', secondField: '' },
    { firstField: '', secondField: 'O' },
    { firstField: 'O', secondField: 'O' },
    { firstField: '', secondField: '' },
  ],
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [
      computed(() => state.dataTable),
      (row: DataTableRow, idx: number) => [
        [computed(() => row.firstField), string().required()],
        [computed(() => row.secondField), string().required()],
      ],
    ],
  ],
  state,
);

const add = () => {
  state.dataTable = [...state.dataTable, {}];
};

const remove = (idx) => {
  const arr = [...state.dataTable];
  arr.splice(idx, 1);
  state.dataTable = arr;
};

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <button @click="add">Add</button>

  <table>
    <tr v-for="(row, idx) in state.dataTable" :key="idx">
      <td>
        <input v-model="row.firstField" />
        <div class="text-red-500">{{ state.errors[`dataTable[${idx}].firstField`] }}</div>
      </td>
      <td>
        <input v-model="row.secondField" />
        <div class="text-red-500">{{ state.errors[`dataTable[${idx}].secondField`] }}</div>
      </td>
      <td>
        <button @click="remove(idx)">Remove</button>
      </td>
    </tr>
  </table>

  <button @click="submit">Submit</button>
</template>
```

### Internationalization

```js
const { t } = useI18n({ useScope: 'global' });

const schema = useSchema(
  [
    [computed(() => state.signInForm.username), computed(() => string().required(t('required')))],
    [
      computed(() => state.signInForm.password),
      computed(() => string().required(t('required')).min(8, t('string.min'))),
    ],
  ],
  state,
);
```

## API Reference

### `useSchema`

Create `yup` schema

```ts
const schema = useSchema(
  [
    // fields
  ],
  // storeIn
);

schema.validate(); // return Boolean

schema.stop();
```

Type: `useSchema(fields, storeIn, errorsKey)`

# vue-formor

Form validation for Vue in composition functions with Yup or Zod.

This branch refers to the vue-formor v3 release. Check out the [v2](https://github.com/Vanilla-IceCream/vue-formor/tree/v2) branch for v2.

## Installation

Install `vue-formor` with your favorite package manager:

```sh
$ npm i vue-formor
# or
$ yarn add vue-formor
# or
$ pnpm i vue-formor
# or
$ bun add vue-formor
```

## Usage

```js
// esm
import { useYupSchema, useZodSchema } from 'vue-formor';

// cjs
const { useYupSchema, useZodSchema } = require('vue-formor');
```

## Documentation

To learn more about `vue-formor`, check [its documentation](https://vitesheet.onrender.com/vue-formor/).

## Examples

See [./examples](./examples).

## Guide

### Basics

<details>
  <summary>useZodSchema</summary>

```vue
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  zodForm: {} as CustomSchemas,
  zodValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
};

const string = () => z.string({ required_error: msgs.required });

const schema = useZodSchema(
  z.object({
    name: string()
      .nonempty(msgs.required)
      .refine((val) => {
        if (val) return /^[A-Za-z]+$/.test(val);
        return true;
      }, 'This must contain only letters'),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <form>
    <div>
      <label>Name:</label>
      <input v-model="state.zodForm.name" type="text" />
      <div class="text-red-500">{{ state.zodValdn.name }}</div>
    </div>

    <button @click="submit">Submit</button>
  </form>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>
```

</details>

<details>
  <summary>useYupSchema</summary>

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

</details>

### Iterators

<details>
  <summary>useYupSchema</summary>

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

</details>

### Internationalization

#### `vue-i18n`

<details>
  <summary>useYupSchema</summary>

```ts
// src/path/to/schema.ts
import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { useI18n } from 'vue-i18n';
import { string } from 'yup';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const { t } = useI18n({ useScope: 'global' });
  const state = useState();

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

  return schema;
};
```

</details>

#### `vue-localer`

<details>
  <summary>useYupSchema</summary>

```ts
// src/composables/useValidationMessages/index.ts
import { defineLocale } from 'vue-localer';

import enUS from './en-US';

export default defineLocale('validation-messages', {
  'en-US': enUS,
  'ja-JP': () => import('./ja-JP'),
  'ko-KR': () => import('./ko-KR'),
  'zh-TW': () => import('./zh-TW'),
});
```

```ts
// src/path/to/schema.ts
import { computed } from 'vue';
import { useSchema } from 'vue-formor';
import { string } from 'yup';

import useValidationMessages from '~/composables/useValidationMessages';

import { useState } from './provider';

export const useSignInFormSchema = () => {
  const messages = useValidationMessages();
  const state = useState();

  const schema = useSchema(
    [
      [
        computed(() => state.signInForm.username),
        computed(() => string().required(messages.value.required)),
      ],
      [
        computed(() => state.signInForm.password),
        computed(() =>
          string().required(messages.value.required).min(8, messages.value.string?.min),
        ),
      ],
    ],
    state,
  );

  return schema;
};
```

</details>

## API Reference

### `useSchema`

Create `yup` validation schema

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

### `useYupSchema`

Create `yup` validation schema

```ts
const schema = useYupSchema(
  [
    // fields
  ],
  // storeIn
);

schema.validate(); // return Boolean

schema.stop();
```

Type: `useYupSchema(fields, storeIn, errorsKey)`

### `useZodSchema`

Create `zod` validation schema

```ts
const schema = useZodSchema(/* ... */);

schema.validate(); // return Boolean

schema.stop();
```

Type: `useZodSchema(schema: ZodSchema, target: Ref, errors: Ref)`

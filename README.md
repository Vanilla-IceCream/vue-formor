# vue-formor

Form validation for Vue in composition functions with Valibot or Zod or Yup.

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
import { useValibotSchema, useZodSchema, useYupSchema } from 'vue-formor';

// cjs
const { useValibotSchema, useZodSchema, useYupSchema } = require('vue-formor');
```

## Documentation

To learn more about `vue-formor`, check [its documentation](https://vitesheet.onrender.com/vue-formor/).

## Examples

See [./examples](./examples).

## API Reference

### `useValibotSchema`

Create `valibot` validation schema

```ts
const schema = useValibotSchema(/* ... */);

schema.validate(); // return Boolean

schema.stop();
```

Type: `useValibotSchema(schema: BaseSchema, target: Ref, errors: Ref)`

### `useZodSchema`

Create `zod` validation schema

```ts
const schema = useZodSchema(/* ... */);

schema.validate(); // return Boolean

schema.stop();
```

Type: `useZodSchema(schema: ZodSchema, target: Ref, errors: Ref)`

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

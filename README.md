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

## Playground

- [ZodForm](https://play.vuejs.org/#eNqlVlFv2zYQ/iuEXiwDtpQ66NB5jtF1yIDuYSuSYg+DgJWWzgoTitRIynZi6L/veJRkJdvctQUSW3f38bvveEdax+jHuk52DUTLaGVzI2rHJFflVRY5m0XMgmvqdaZEVWvj2B+6+Fmbim2NrtgkSTvbE0x+yNQqDRS4AA0HVS25A7QYW/VLUzRX6SgWzaLAPq94ndxbrVDL0a/JugAKWTLyeB/mmm+RSRvvzqI752q7TNP9fp80qn4ok1xX6Qn19jJZJK/SQlg38mKiLJr1nE+6OEeGYc+ySBapFJtUqAIOSeUZPEGbqRaLcDbXaivKFyXg+lpIML/VTmj1vBQupd7/Qj5nGhjk5HeQP/yL/94egswPBiyYHYxKcNyU4EL4+vZXOODzEKx00UhEnwnegNWy8RoD7F2jCpQ9wpHa99QRocqP9vrgQNm+KC+UdoPw1KafzpR+knuZXI52cTRR/28kj8wAz53YwYw5fQNb1nbj2Q3lgGssIPstbm7Fx6BuIp5hnwYA9t5HMKYcmC3Pgb3jVuRepQ31IJ+QS2adwX1BLGM1t3avTTFyYn2ZwgmxDn04+exqEB4Ti9SlUJ4Vd6ll3I7S0JZS/HcuC9UDbiDHHKuQYtalWiO4nZLikK2ypcVklMPAX40wgLo+fbwTluEfH5xsK0AWnyhZV1JAVQ3SbAChOy5FEYIBVwlU8wKF7QKOz29YfscNlgjGenQ7EmVDF66eNSX2jE+J3txD7sKmDEqeklBe7Psd9P4JxmizpAKToYh2mtCSmNz0OE2UVnjhuMfg7LHTbrRP3fqSLFh6/GYW/Ph8PkkbvmhAY+r/jE2Gjk/+M0r9pvC4pVaU6r3C3Yun7GodWiu2LA67mlCXkCSeTvsD59dpCQmSxpM+XjD8xCZM/Oyg7aNBkE8WjuRnbnUaGTyRZKEtoQRVrGl0Gc3uKu18fjVh/HHr8GgVYsdyiR3A872VcGAlr+eLLBoQnpVvQK6vaRKQj6xRWKi6cWw3x4sMJNK8KCYMAd4c7rEGDPem/yUaOMYyHN6Pc2zd/PXFBQo5HsfbQx0JlKxtV/i7sjsV01lfUdyHfga/or5+fk8ljjzfUmVP8/lCN41zWvXpg4XJ3+ZS5A9eMk0sprnFByZwpgKmn5u0G4rOrA28EETvDl6GD53BkfARkLhPQ/rszQNN6x4l4G2ka/ATmlCT6Mzg+wLiHpfMu/r7O6H+BQA+LtlF8tpANYTHexpQ83mj5uTWNc+FQ8JXdLhyLf21YsoNjxeX38/Yd3iZ+P8dN/E/Vk39icQceBa9Yv/a1P4NLyVHcg==)

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

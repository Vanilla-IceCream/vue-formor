# vue-formor

Form validation for Vue in composition functions with Valibot.

The main branch refers to the `vue-formor` v5 release. Check out the [v4.x branch](https://github.com/Vanilla-IceCream/vue-formor/tree/v4.x) for v4.

If you need to use `valibot` v0.30 or lower, please install `vue-formor` v4.x instead.

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

> [!NOTE]
>
> Don't forget to install `valibot`.

## Usage

```vue
<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useSchema } from 'vue-formor';
import * as v from 'valibot';

interface BasicForms {
  email?: string;
  password?: string;
}

const state = reactive({
  loginForm: {} as BasicForms,
  loginValdn: {} as Record<keyof BasicForms, string>,
});

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

const schema = useSchema(
  v.object({
    email: v.nullish(v.pipe(v.string(), v.minLength(1, msgs.required), v.email(msgs.email)), ''),
    password: v.nullish(
      v.pipe(v.string(), v.minLength(1, msgs.required), v.minLength(8, msgs.min)),
      '',
    ),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
);

const signIn = () => {
  if (schema.validate()) {
    console.log('validated data =', state.loginForm);
  }
};
</script>

<template>
  <fieldset>
    <legend>Basic Forms</legend>

    <form>
      <div class="flex gap-2">
        <label>Email:</label>
        <input v-model="state.loginForm.email" type="email" />
        <div class="text-red-500">{{ state.loginValdn.email }}</div>
      </div>

      <div class="flex gap-2">
        <label>Password:</label>
        <input v-model="state.loginForm.password" type="password" />
        <div class="text-red-500">{{ state.loginValdn.password }}</div>
      </div>

      <button type="button" @click="signIn">Sign in</button>
    </form>

    <pre>{{ state.loginForm }}</pre>

    <pre>{{ state.loginValdn }}</pre>
  </fieldset>
</template>

<style scoped>
.flex {
  display: flex;
}

.gap-2 {
  gap: 0.5rem;
}

.text-red-500 {
  --un-text-opacity: 1;
  color: rgba(239, 68, 68, var(--un-text-opacity));
}
</style>

```

## Documentation

To learn more about `vue-formor`, check [its documentation](https://vitesheet.onrender.com/vue-formor/).

## Examples

See [./examples](./examples).

## Playground

- [ValibotForm](https://play.vuejs.org/#eNqlVm1v2zYQ/iuEvlgGbClt0KHzHG/rkAEdhq1Iin2ZBpSWTjITitRIynZg6L/veJRkJSnSrQMSW7x7+NzLc6R1in5smmTfQrSK1jY3onFMclVdZZGzWcQsuLbZZErUjTaO/cGl2Gr3szY1K42u2SxJJzZPNPsuU+s0UOFGXDioG8kd4Iqx9ZQiRdM6nfijRRQiLWveJHdWK8zr5PdlvQOTWjGyeBvGW5bIpI03Z9HOucau0vRwOCStau6rJNd1ekalhbBussYQWbQY2UJqL1IFSOARqoAjUXiGLlMd5u9srlUpqifZ4+ZGSDC/N05o9bgKLqU+/EI2Z1oY88l3kN9/xn5njyHHDwYsmD1ManDcVNCXcH37GxzxeXTWumglol9w3oDVsvU5Bti7VhWY9gRH2b4nMYSqPtrrowNlh6J8otQNwpNCP71Q+jndy+Ry0sUnQ/XvpvPEDPDciT0smNM3ULKun9J+Lkdca6GPcItNrvkU2I/GI7ym1LlcML29g9wtmHUGq1+wWqhfQVVut2DII+SZKfB7GiRSDkzJc2DvuBW5L8uGJtCm71c9H4IZa7i1B22KqRXbkikcLOvQhmeFXY21xsQjdSWU58XmdozbSSBSgvxYc6EGwA3kGGR9Dw+6nKL7oBvc1s0p+xC3tpXFsBTNwN+tMFCs2KePO2EZ/vHRyEoBsvhEYam8AVW3SLMFhPrmFMEZcNjGZyjUGjg+v2X5jhssFoz16G6SlA3yXT1TNPasQazQoDGXQcs41Bn/OUoYv0I9scpkqGTeixqTlR7nf6FxNpv3x2HQ6r/Snp1veydaHnF34YvmGDlRc/SNKvegz3hJY3JPxbOiUu8V9imes6tNEFGULA79S0gPJInn8+Fs+n1aQoKkMQ2z9xcMP7HdMz8luPbekJAPFk7vF+5/Gg48uLTCtYQKVLGhAWQ0geu0t/ndhPEnssfjqhB7lktsPF4DpYQjq3izfJ1FI8Kz8i3IzTUpjny0mriFalrH9ku880AizZNigtR4wbiHBtA9LP3v1cgxTcPhVbpEZZdvLi4wkdNp2h5SJFCyrlvjb8f+XEy/+oriPgyj9xX1DWN7LnFi+T9VDjRfLnTbOqfVED6sMPgPuRT5vU+ZJhbD3OIDEzhTATPMTdoPRb9sDDxJiN4wfBre9QKOEp8Aifs8pI/eT3Bp3YMEvHd0A35CExKJzgy+EyDuYcW8abizE9IvAPBxxS6SNwbq0T3taUAtl61aklk3PBcOCV/R4cq11GbFTLXl8evLbxfsG7w7/P+em/jZrrk/kRgDz6LP2L9cdf8AA8xYuQ==)

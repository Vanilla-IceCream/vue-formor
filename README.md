# vue-formor

Form validation for Vue in composition functions with Valibot.

The main branch refers to the `vue-formor` v6 release. Check out the [v5.x branch](https://github.com/Vanilla-IceCream/vue-formor/tree/v5.x) for v5.

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

- [ValibotForm](https://play.vuejs.org/#eNqlVm1v2zYQ/iuEv1gebMltkKHzHC/rkAEdhq1Iin3Sh8rSWWZCkRpJyQ4M/fcdj5LMekW6tUBii3cPn3vuhbROk5/rOm4bmKwma5NrXlsmMlnepBNr0gkzYJt6k0pe1Upb9lcm+FbZX5Wu2E6rik3jJLA5oumPqVwnngo34sJCVYvMAq4YW4cUCZrWSeCfzCc+0qLK6vjRKIm6Tm5f2jtQ1IqRxdkw3mKHTEo7czrZW1ubVZIcDoe4kfVTGeeqSs6o2+t4GS+TghsbWDFQOpmPnF7gi4QecruMr5DQ03FZwJGYHFGXyg6TsSZXcsfLi1SQo+YC9J+15Up+mlImhDr8RjarGxhl5XvInz5jfzRHL/W9BgO6hSAVm+kS+kzuHv6AIz6PzkoVjUD0C857MEo0TqOHvW1kgbIDHKl9R53hsvxg7o4WpBmSckKpGoSndv3yQupnuVfxVVDFiwn7b6N6Yhqy3PIW5syqe9ixrh/ZfkhHXGPgAatbZSGiH40A+B3LDGsHhJfk3AiQFvQuy4G9zQzPnU7js0JSLn5aMWM1lgfBjNWZMQeli9CKeaYSJ8VYtOFJYDej+Ih4hCq5dLxYrc7pOAei0pIfy1TIAXAPOQZZP8Gz2oXoPugGt3UzUu/jVqY0GJaiafi74RqKFfv4Yc8Nw79sNLIdB1F8pLCU3oCqGqTZAkJdcQrv9LiKo64LFDYPMnx+w/J9pjFZ0Mahu0CU8W25ObcocnRtrLaPkFtfm1FGG8tGCG72URvXvAb88slGszk6UcTvIEu7j17NKd14SIncRBKRnR5naJ1OZ/2kD10Lo3iPk/P/o53db3o3WjDkwDmd9o/e1PkvmuOIRgTFjUPRq/yMl0aC3GGvDS/lO4lljWbsZuN7zncs8uWOqX1IEs1mw9l0+5SAGEkjmn3nLxh+Ynembqhw7bxekAvmT+8XfgxolvDg0grXAkqQxYbmldHArpPe5nYTxh3MHo+rgrcsF9gdvAZ2Ao6szOrF63QyIhxrtgWxuaMpQT5aBW4u68aydoF3HgikuUjGjwNeMPa5BnQPS/fjNXKEMixepQts9OJ6uUQhp1NYHuqIp2Rdt8bfjvacTL/6iuTeD/P5FfkNs31OMbB8S5YDzZcT3TbWKjmE9ysMfpsLnj85yTSxGOYBHxjHmfKYYW6Sfij6Za3hQhC9bjgZzvUCjoQHQOI+D+knLyu4NPZZAF5TqgY3oTE1ic4MvhMg7nnFnGm44mPqnwfg44ot42sN1egOa+pRi0UjF2RWdZZzi4Sv6HDlSii9YrrcZtHrqx/m7Hu8SNx/m+noX7tm7kRiDDyLTrF70+r+ATIbVKQ=)

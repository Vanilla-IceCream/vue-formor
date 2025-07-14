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
> Don't forget to install `valibot` v1.

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
      ''
    ),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn')
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

[Edit in Vue SFC Playground](https://play.vuejs.org/#eNqlVW1v2zYQ/iuEvlgebDmpkS7zHC/rkAEdhq1Iin4ysNLSWWZCkRpJyQ4M//cdj5LFZUWGdUBexLuHzz33QvKY/FjXWdtAskiWNjeidkxyVd6sE2fXCbPgmnq1VqKqtXHsyAzw3IkWJszpe9iyE9saXbERUoy+j3CNhYd8BxWPEdOtNpU2EfAbxi1rewSXYqOddyNAOTBbngN7x63If8adlh3XijEkFfKHBbPOCFUimLGaW7vXpoitJ8+Sa2Ud2rgDdnMWnxKP1KVQnnfBjievYwg0Ofs/cVmoHnAPOQZZPsGz3sboLugKt53GpD7ErWxpMSxFM/BnIwwUC/b5405Yhj/8bGRbAbL4TGEpvR5VNUizAYT64hTBGXCVQF0vUNg84Ph9zfIdN5gsGOvRp0iUDW25GVqUero205tHyF2ozVlGm6lGSmF3aZvVogb8F5JNxxN0oohfQZVul15OKN2sT4ncRJKSnT7HaB2NxqR/6FocJXi8nP8ebXBfd260YMieczTqPoPpFP7RHKc0IijuPBSdyi94aSTIHffailK9V1jWdMxuVqHnYsvSUO6M2ock6XgcfIz5fVpChqQpzb73Fwz/YndGfqhw7b1BkA+GokMzl7NwWPFo4sJBVUsE44qxJc0SHlxa4VpCCapY0bwyGtjlrLP53YTxB7PD46oQLcsldgevga2EAyt5PX2zTs4Iz8o3IFd3NCXIR6vILVTdONZOK12ARJoXyYRxwAvGPdeA7n45izliGQ4OboqNnl5dXKCQ4zEuD3UkULLTaTnDjUMy3eorkvvQz+dX5NfP9pBiZPk/WfY0/57opnFOqz58WGHw21yK/MlLponFMA/4wQTOVMD0czPrhqJb1gZeCPKJkgzvegVHwiMgcQ9DupxF84tL654l4DWla/ATmlGT6MwUwiLuecG8qb/iM+pfAODngl1kVwaqszuuaUBNp42aklnXPBcOCS/pcOVaarNgptzw9M38uwl7ixeJ/225Sf+xa+xPJMbAs+gVo9RkkoR3bVrxOnu0WuGzSiHXnQPfVHxMQqXWyfAkevM62TlX28Vstt/vs0bVT2WW62o2oG7fZgfssnWRDcOsk+5eQ8bwhL5KFyC3lz2XUAUciKa/YDAPh/VXW1G+yAIJaiHB/F47gdfX37LhUur9L2RzpoGzJrwA86cv2B/tIej8YMCCaSHKw3FTQpfG3cNvWPXIiWeukYh+xXkPeLU2XmOAvWtUgbIjHKl9T03B9+WjvTs4ULZPygulahCeOvXTK6kPcufZPKriHy0+wIjGAs6zq+zyW29z9tPZepVdZ/Pk9BewfSna)

## Documentation

To learn more about `vue-formor`, check [its documentation](https://vitesheet.onrender.com/vue-formor/).

## Examples

See [./examples](./examples).

<script lang="ts" setup>
import { computed, reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { useLocaler } from 'vue-localer';
import * as v from 'valibot';

import useLocale from './locales';

const localer = useLocaler();

const locale = useLocale();

interface LoginForm {
  username?: string;
  password?: string;
}

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
});

const schema = useValibotSchema(
  computed(() =>
    v.object({
      username: v.nullish(v.pipe(v.string(), v.minLength(1, locale.value.required)), ''),
      password: v.nullish(v.pipe(v.string(), v.minLength(1, locale.value.required)), ''),
    }),
  ),
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
    <legend>`vue-localer`</legend>

    <form>
      <div class="flex gap-2">
        <label>Username:</label>
        <input v-model="state.loginForm.username" />
        <div class="text-red-500">{{ state.loginValdn.username }}</div>
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

    <label class="flex gap-2">
      <span>Language:</span>

      <select v-model="localer.lang.value" name="languages">
        <option value="en">English</option>
        <option value="zh">中文</option>
      </select>
    </label>
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

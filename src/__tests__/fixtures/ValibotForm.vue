<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from '../../vue-formor';
import * as v from 'valibot';

interface BasicForms {
  email: string;
  password: string;
}

const state = reactive({
  loginForm: {} as BasicForms,
  loginValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

const schema = useValibotSchema(
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
  <form>
    <div>
      <label>Email:</label>
      <input v-model="state.loginForm.email" type="email" data-testid="email" />
      <div>{{ state.loginValdn.email }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" data-testid="password" />
      <div>{{ state.loginValdn.password }}</div>
    </div>

    <button type="button" data-testid="sign-in" @click="signIn">Sign in</button>
  </form>
</template>

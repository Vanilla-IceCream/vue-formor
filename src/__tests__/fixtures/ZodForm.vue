<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from '../../vue-formor';
import { z } from 'zod';

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

const schema = useZodSchema(
  z.object({
    email: z.string({ required_error: msgs.required }).email(msgs.email).nonempty(msgs.required),
    password: z.string({ required_error: msgs.required }).min(8, msgs.min).nonempty(msgs.required),
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

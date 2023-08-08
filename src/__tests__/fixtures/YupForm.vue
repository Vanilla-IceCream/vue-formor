<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from '../../vue-formor';
import { string } from 'yup';

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

const schema = useYupSchema(
  [
    [computed(() => state.loginForm.email), string().required(msgs.required).email(msgs.email)],
    [computed(() => state.loginForm.password), string().required(msgs.required).min(8, msgs.min)],
  ],
  state,
  'loginValdn',
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
      <div>{{ state.loginValdn['loginForm.email'] }}</div>
    </div>

    <div>
      <label>Password:</label>
      <input v-model="state.loginForm.password" type="password" data-testid="password" />
      <div>{{ state.loginValdn['loginForm.password'] }}</div>
    </div>

    <button type="button" data-testid="sign-in" @click="signIn">Sign in</button>
  </form>
</template>

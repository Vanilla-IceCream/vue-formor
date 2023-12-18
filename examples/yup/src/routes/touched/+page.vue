<script lang="ts" setup>
import { reactive, toRef, onMounted } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

interface LoginForm {
  email?: string;
  password?: string;
}

const state = reactive({
  loginForm: {} as LoginForm,
  loginValdn: {} as Record<keyof LoginForm, string>,
  loginTouched: {} as Record<keyof LoginForm, boolean>,
});

const msgs = {
  required: `This is a required field`,
  email: `This must be a valid email`,
  min: `This must be at least 8 characters`,
};

const schema = useYupSchema(
  object({
    email: string().email(msgs.email).required(msgs.required),
    password: string().min(8, msgs.min).required(msgs.required),
  }),
  toRef(state, 'loginForm'),
  toRef(state, 'loginValdn'),
  toRef(state, 'loginTouched'),
);

onMounted(() => {
  schema.run();
});

const signIn = () => {
  if (schema.validate()) {
    console.log('validated data =', state.loginForm);
  }
};
</script>

<template>
  <fieldset>
    <legend>Touched</legend>

    <form>
      <div class="flex gap-2">
        <label>Email:</label>
        <input
          v-model="state.loginForm.email"
          type="email"
          @blur="state.loginTouched.email = true"
        />
        <div class="text-red-500">{{ state.loginValdn.email }}</div>
      </div>

      <div class="flex gap-2">
        <label>Password:</label>
        <input
          v-model="state.loginForm.password"
          type="password"
          @blur="state.loginTouched.password = true"
        />
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

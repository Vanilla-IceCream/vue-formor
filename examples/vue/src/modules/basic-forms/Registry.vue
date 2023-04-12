<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, string } from 'yup';

import ZodForm from './ZodForm.vue';

interface BasicForms {
  email: string;
  password: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
  string: {
    email: 'This must be a valid email',
    min: 'This must be at least 8 characters',
  },
});

const state = reactive({
  basicForms: {} as BasicForms,
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [
    [computed(() => state.basicForms.email), string().required().email()],
    [computed(() => state.basicForms.password), string().required().min(8)],
  ],
  state,
);

const signIn = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Basic Forms</div>

    <div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="state.basicForms.email" />
        <div>{{ state.errors['basicForms.email'] }}</div>
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="state.basicForms.password" />
        <div>{{ state.errors['basicForms.password'] }}</div>
      </div>

      <button @click="signIn">Sign in</button>
    </div>

    <pre>{{ state.basicForms }}</pre>

    <pre>{{ state.errors }}</pre>

    <hr />

    <ZodForm />
  </div>
</template>

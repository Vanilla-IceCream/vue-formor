<script lang="ts" setup>
import { reactive } from 'vue';

import { useStore } from './store';
import { useBasicFormsSchema } from './schema';

const store = useStore();
const schema = useBasicFormsSchema();

const flux = reactive({
  signIn() {
    if (schema.validate()) {
      store.signIn();
    }
  },
});
</script>

<template>
  <div>
    <div>State Management >> Pinia Integration</div>

    <div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="store.basicForms.email">
        <div>{{ store.errors['basicForms.email'] }}</div>
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="store.basicForms.password">
        <div>{{ store.errors['basicForms.password'] }}</div>
      </div>

      <button @click="flux.signIn">Sign in</button>
    </div>

    <pre>{{ store.basicForms }}</pre>

    <pre>{{ store.errors }}</pre>
  </div>
</template>

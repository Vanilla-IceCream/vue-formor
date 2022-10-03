<script lang="ts" setup>
import { reactive } from 'vue';

import { useState, useActions } from './store';
import { useBasicFormsSchema } from './schema';

const state = useState();
const actions = useActions();
const schema = useBasicFormsSchema();

const flux = reactive({
  signIn() {
    if (schema.validate()) {
      actions.signIn();
    }
  },
});
</script>

<template>
  <div>
    <div>State Management >> Dependency Injection</div>

    <div>
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="state.basicForms.email">
        <div>{{ state.errors['basicForms.email'] }}</div>
      </div>

      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="state.basicForms.password">
        <div>{{ state.errors['basicForms.password'] }}</div>
      </div>

      <button @click="flux.signIn">Sign in</button>
    </div>

    <pre>{{ state.basicForms }}</pre>

    <pre>{{ state.errors }}</pre>
  </div>
</template>

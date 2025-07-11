<script lang="ts" setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <ul class="list">
    <li><RouterLink to="/">Basic Forms</RouterLink></li>
    <li><RouterLink to="/dynamic-forms">Dynamic Forms</RouterLink></li>
    <li><RouterLink to="/tabular-forms">Tabular Forms</RouterLink></li>
    <li><RouterLink to="/dynamic-tabular-forms">Dynamic Tabular Forms (TODO)</RouterLink></li>
    <li><RouterLink to="/tabular-form-groups">Tabular Form Groups</RouterLink></li>
    <li><RouterLink to="/custom-schemas">Custom Schemas</RouterLink></li>
    <li><RouterLink to="/touched">Touched</RouterLink></li>
    <li><RouterLink to="/internationalization/vue-localer">`vue-localer`</RouterLink></li>
  </ul>

  <RouterView />
</template>

<style scoped>
.list {
  display: flex;
  list-style: none;
  padding: 0;
}

.list > li {
  margin: 0 0.5rem;
}
</style>

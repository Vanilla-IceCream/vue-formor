<script lang="ts" setup>
</script>

<template>
  <div>
    <ul>
      <li>
        <router-link to="/basic-forms">Basic Forms</router-link>
      </li>
      <li>
        <router-link to="/dynamic-forms">Dynamic Forms</router-link>
      </li>
      <li>
        <router-link to="/tabular-forms">Tabular Forms</router-link>
      </li>
      <li>
        <router-link to="/tabular-form-groups">Tabular Form Groups</router-link>
      </li>
      <li>
        <router-link to="/custom-schemas">Custom Schemas</router-link>
      </li>
      <li>
        State Management
        <ul>
          <li>
            <router-link to="/state-management/dependency-injection">Dependency Injection</router-link>
          </li>
          <li>
            <router-link to="/state-management/pinia-integration">Pinia Integration</router-link>
          </li>
        </ul>
      </li>
      <li>
        Multiple Schemas
        <ul>
          <li>
            <router-link to="/multiple-schemas/single-instance">Multiple Schemas (Single-instance)</router-link>
          </li>
          <li>
            <router-link to="/multiple-schemas/multiple-instance">Multiple Schemas (Multiple-instance)</router-link>
          </li>
        </ul>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

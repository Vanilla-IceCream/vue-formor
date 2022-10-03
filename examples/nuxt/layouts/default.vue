<script lang="ts" setup>
</script>

<template>
  <div>
    <ul>
      <li>
        <NuxtLink to="/basic-forms">Basic Forms</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/dynamic-forms">Dynamic Forms</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tabular-forms">Tabular Forms</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/tabular-form-groups">Tabular Form Groups</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/custom-schemas">Custom Schemas</NuxtLink>
      </li>
      <li>
        State Management
        <ul>
          <li>
            <NuxtLink to="/state-management/dependency-injection">Dependency Injection</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/state-management/pinia-integration">Pinia Integration</NuxtLink>
          </li>
        </ul>
      </li>
      <li>
        Multiple Schemas
        <ul>
          <li>
            <NuxtLink to="/multiple-schemas/single-instance">Multiple Schemas (Single-instance)</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/multiple-schemas/multiple-instance">Multiple Schemas (Multiple-instance)</NuxtLink>
          </li>
        </ul>
      </li>
    </ul>

    <slot></slot>
  </div>
</template>

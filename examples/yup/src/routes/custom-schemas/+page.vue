<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useYupSchema } from 'vue-formor';
import { string } from 'yup';

interface CustomSchemas {
  name: string;
}

const msgs = {
  required: 'This is a required field',
  letters: 'This must contain only letters',
};

const state = reactive({
  customSchemas: {} as CustomSchemas,
  errors: {} as Record<string, string>,
});

const schema = useYupSchema(
  [
    [
      computed(() => state.customSchemas.name),
      string()
        .required(msgs.required)
        .test('letters', msgs.letters, (value) => {
          if (value && !/^[A-Za-z]+$/.test(value)) return false;
          return true;
        }),
    ],
  ],
  state,
  'errors',
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <fieldset>
    <legend>Custom Schemas</legend>

    <form>
      <div class="flex gap-2">
        <label for="name">Name:</label>
        <input id="name" v-model="state.customSchemas.name" type="text" />
        <div class="text-red-500">{{ state.errors['customSchemas.name'] }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.customSchemas }}</pre>

    <pre>{{ state.errors }}</pre>
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

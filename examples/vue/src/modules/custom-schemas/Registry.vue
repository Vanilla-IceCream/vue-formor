<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { useSchema } from 'vue-formor';
import { setLocale, addMethod, string } from 'yup';

import ZodForm from './ZodForm.vue';

interface CustomSchemas {
  name: string;
}

setLocale({
  mixed: {
    required: 'This is a required field',
  },
});

addMethod(string, 'letters', function () {
  return this.test('letters', 'This must contain only letters', (value) => {
    if (value && !/^[A-Za-z]+$/.test(value)) return false;
    return true;
  });
});

const state = reactive({
  customSchemas: {} as CustomSchemas,
  errors: {} as Record<string, string>,
});

const schema = useSchema(
  [[computed(() => state.customSchemas.name), string().required().letters()]],
  state,
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <div>
    <div>Custom Schemas</div>

    <div>
      <div>
        <label for="name">Name:</label>
        <input id="name" type="text" v-model="state.customSchemas.name" />
        <div>{{ state.errors['customSchemas.name'] }}</div>
      </div>

      <button @click="submit">Submit</button>
    </div>

    <pre>{{ state.customSchemas }}</pre>

    <pre>{{ state.errors }}</pre>

    <ZodForm />
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useYupSchema } from 'vue-formor';
import { object, string } from 'yup';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  yupForm: {} as CustomSchemas,
  yupValdn: {} as Record<string, string>,
});

const msgs = {
  required: 'This is a required field',
  letters: 'This must contain only letters',
};

const schema = useYupSchema(
  object({
    name: string()
      .required(msgs.required)
      .test('letters', msgs.letters, (value) => {
        if (value && !/^[A-Za-z]+$/.test(value)) return false;
        return true;
      }),
  }),
  toRef(state, 'yupForm'),
  toRef(state, 'yupValdn'),
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
        <input id="name" v-model="state.yupForm.name" type="text" />
        <div class="text-red-500">{{ state.yupValdn.name }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.yupForm }}</pre>

    <pre>{{ state.yupValdn }}</pre>
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

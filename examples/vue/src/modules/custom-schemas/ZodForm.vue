<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useZodSchema } from 'vue-formor';
import { z } from 'zod';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  zodForm: {} as CustomSchemas,
  zodValdn: {} as Record<string, string>,
});

const msgs = {
  required: `This is a required field`,
};

const string = () => z.string({ required_error: msgs.required });

const schema = useZodSchema(
  z.object({
    name: string()
      .nonempty(msgs.required)
      .refine((val) => {
        if (val) return /^[A-Za-z]+$/.test(val);
        return true;
      }, 'This must contain only letters'),
  }),
  toRef(state, 'zodForm'),
  toRef(state, 'zodValdn'),
);

const submit = () => {
  if (schema.validate()) {
    // passed
  }
};
</script>

<template>
  <form>
    <div>
      <label>Name:</label>
      <input v-model="state.zodForm.name" type="text" />
      <div class="text-red-500">{{ state.zodValdn.name }}</div>
    </div>

    <button @click="submit">Submit</button>
  </form>

  <pre>{{ state.zodForm }}</pre>

  <pre>{{ state.zodValdn }}</pre>
</template>

<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, string, minLength, custom } from 'valibot';

interface CustomSchemas {
  name?: string;
}

const state = reactive({
  valibotForm: {} as CustomSchemas,
  valibotValdn: {} as Record<keyof CustomSchemas, string>,
});

const msgs = {
  required: 'This is a required field',
  letters: 'This must contain only letters',
};

const schema = useValibotSchema(
  object({
    name: optional(
      string([
        minLength(1, msgs.required),
        custom((input) => /^[A-Za-z]+$/.test(input), msgs.letters),
      ]),
      '',
    ),
  }),
  toRef(state, 'valibotForm'),
  toRef(state, 'valibotValdn'),
);

const submit = () => {
  if (schema.validate()) {
    console.log('validated data =', state.valibotForm);
  }
};
</script>

<template>
  <fieldset>
    <legend>Custom Schemas</legend>

    <form>
      <div class="flex gap-2">
        <label for="name">Name:</label>
        <input id="name" v-model="state.valibotForm.name" type="text" />
        <div class="text-red-500">{{ state.valibotValdn.name }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.valibotForm }}</pre>

    <pre>{{ state.valibotValdn }}</pre>
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

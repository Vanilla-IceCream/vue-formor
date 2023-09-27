<script lang="ts" setup>
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, string, minLength, getPipeIssues } from 'valibot';

interface CustomSchemas {
  name: string;
}

const state = reactive({
  zodForm: {} as CustomSchemas,
  zodValdn: {} as Record<string, string>,
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
        (input) => {
          if (input && !/^[A-Za-z]+$/.test(input)) {
            return getPipeIssues('custom', msgs.letters, input);
          }

          return { output: input };
        },
      ]),
      '',
    ),
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
  <fieldset>
    <legend>Custom Schemas</legend>

    <form>
      <div class="flex gap-2">
        <label for="name">Name:</label>
        <input id="name" v-model="state.zodForm.name" type="text" />
        <div class="text-red-500">{{ state.zodValdn.name }}</div>
      </div>

      <button type="button" @click="submit">Submit</button>
    </form>

    <pre>{{ state.zodForm }}</pre>

    <pre>{{ state.zodValdn }}</pre>
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

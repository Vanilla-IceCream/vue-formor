<script lang="ts" setup>
import type { BaseValidation } from 'valibot';
import { reactive, toRef } from 'vue';
import { useValibotSchema } from 'vue-formor';
import { optional, object, string, minLength, getPipeIssues, getOutput } from 'valibot';

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

function customValidation<T = any>(fn: BaseValidation<T>['_parse']): BaseValidation<T> {
  return {
    async: false,
    message: '',
    _parse: fn,
  };
}

const schema = useValibotSchema(
  object({
    name: optional(
      string([
        minLength(1, msgs.required),
        /** valibot v0.20- */
        // (input) => {
        //   if (!/^[A-Za-z]+$/.test(input)) {
        //     return getPipeIssues('custom', msgs.letters, input);
        //   }

        //   return getOutput(input);
        // },

        /** valibot v0.21+ */
        customValidation((input) => {
          if (!/^[A-Za-z]+$/.test(input)) {
            return getPipeIssues('custom', msgs.letters, input);
          }

          return getOutput(input);
        }),
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

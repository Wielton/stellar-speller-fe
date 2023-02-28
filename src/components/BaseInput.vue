<template>
  <v-text-field
    v-bind="$attrs"
    :placeholder="props.label"
    :label="props.label"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></v-text-field>
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});
</script>

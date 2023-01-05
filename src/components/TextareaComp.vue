<script setup lang="ts">
defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
function onInput(event: Event) {
  const { value } = event.target as HTMLInputElement;
  emit('update:modelValue', value);
}
</script>

<template>
  <textarea :value="modelValue" @input="onInput"></textarea>
</template>

<style scoped lang="scss">
textarea {
  padding: 0.8em;
  resize: vertical;
  color: var(--color-text);
  font-size: 0.8em;
  font-weight: 500;
  background-color: var(--color-background-sec);
  border-radius: 8px;
  border: none;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:focus {
    outline: none;
  }
}
</style>

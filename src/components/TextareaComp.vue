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
  padding: 12px;
  resize: vertical;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 500;
  background: var(--color-background-sec);
  border-radius: 8px;
  border: none;

  &:focus {
    outline: none;
  }
}
</style>

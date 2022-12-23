<script setup lang="ts">
defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
function onInput(event: Event) {
  const { value } = event.target as HTMLInputElement;
  emit('update:modelValue', value);
}
</script>

<template>
  <input type="text" :value="modelValue" @input="onInput" />
</template>

<style scoped lang="scss">
input {
  padding: 12px;
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

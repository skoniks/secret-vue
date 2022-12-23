<script setup lang="ts">
defineProps(['modelValue', 'options']);
const emit = defineEmits(['update:modelValue']);
function onChange(e: Event) {
  const { value } = e.target as HTMLSelectElement;
  emit('update:modelValue', value);
}
</script>

<template>
  <select :value="modelValue" @change="onChange">
    <option
      v-for="([key, value], _, index) in options"
      :key="index"
      :value="key"
    >
      {{ value }}
    </option>
  </select>
</template>

<style scoped lang="scss">
select {
  padding: 12px;
  color: var(--color-text);
  font-size: 12px;
  font-weight: 500;
  background: var(--color-background-sec);
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
</style>

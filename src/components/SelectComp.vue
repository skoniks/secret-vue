<script setup lang="ts">
const props = defineProps<{ options: Record<string, string> }>();
</script>

<template>
  <select>
    <option
      v-for="(value, key, index) in props.options"
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

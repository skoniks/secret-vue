<script setup lang="ts"></script>

<template>
  <input type="text" />
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

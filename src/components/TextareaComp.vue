<script setup lang="ts"></script>

<template>
  <textarea></textarea>
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

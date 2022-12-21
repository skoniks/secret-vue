<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
main {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  @media (max-width: 900px) {
    padding: 0 20px;
  }
}
</style>

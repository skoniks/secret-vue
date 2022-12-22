<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterComp from './components/FooterComp.vue';
import HeaderComp from './components/HeaderComp.vue';
import PreloadComp from './components/PreloadComp.vue';
</script>

<template>
  <main>
    <PreloadComp />
    <HeaderComp />
    <RouterView />
  </main>
  <FooterComp />
</template>

<style scoped lang="scss">
main {
  max-width: 800px;
  min-height: 95vh;
  margin: 0 auto;
  @media (max-width: 900px) {
    max-width: 850px;
    padding: 0 25px;
  }
}
</style>

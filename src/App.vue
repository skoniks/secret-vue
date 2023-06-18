<script setup lang="ts">
import { RouterView } from 'vue-router';
import AlertComp from './components/AlertComp.vue';
import FooterComp from './components/FooterComp.vue';
import HeaderComp from './components/HeaderComp.vue';
import PreloadComp from './components/PreloadComp.vue';
</script>

<template>
  <PreloadComp />
  <AlertComp />
  <main>
    <HeaderComp />
    <RouterView />
  </main>
  <FooterComp />
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  letter-spacing: 0px;
  background-color: var(--color-background);
  transition: all 0.2s ease;

  --color-text: #1e232a;
  --color-text-sec: #8898af;
  --color-background: #f0f2f5;
  --color-background-sec: #e0e4eb;

  &.dark {
    --color-text: #ffffff;
    --color-text-sec: #8898af;
    --color-background: #1e232a;
    --color-background-sec: #242a33;
  }
}

main {
  max-width: 800px;
  min-height: 95vh;
  margin: 0 auto;
  @media (max-width: 900px) {
    max-width: 850px;
    padding: 0 25px;
  }
}

// Transitions
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(-30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>

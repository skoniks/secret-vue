<script setup lang="ts">
import { RouterView } from 'vue-router';
import ButtonComp from './components/ButtonComp.vue';
</script>

<template>
  <main>
    <ButtonComp :outline="false">Создать тайну 2</ButtonComp>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. In ab minus a
      commodi aliquid officiis error dolor, voluptate laborum, porro non vel id
      deleniti praesentium? Cupiditate unde doloribus aspernatur sint.
    </p>
    <!-- <RouterView /> -->
  </main>
</template>

<style scoped lang="scss">
main {
  max-width: 800px;
  padding: 100px 0;
  margin: 0 auto;

  // max-width: 800px;
  // margin: 0 auto;
  // text-align: center;
  // @media (max-width: 900px) {
  //   padding: 0 20px;
  // }
}
</style>

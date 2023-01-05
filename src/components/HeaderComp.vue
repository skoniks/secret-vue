<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
</script>

<template>
  <header>
    <div class="theme">
      <template v-if="themeStore.theme === 'light'">
        <div class="icon light" @click="themeStore.changeTheme('dark')"></div>
      </template>
      <template v-else>
        <div class="icon dark" @click="themeStore.changeTheme('light')"></div>
      </template>
    </div>
    <div class="title">
      <div class="icon"></div>
      <h1>Secret Notes</h1>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  padding-top: 16vh;
  padding-bottom: 8vh;
  text-align: center;

  .theme {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;

    .icon {
      width: 32px;
      height: 32px;

      background-color: var(--color-text);
      -webkit-mask: url(../assets/moon.svg) no-repeat 100% 100%;
      mask: url(../assets/moon.svg) no-repeat 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;

      &.dark {
        -webkit-mask: url(../assets/sunset.svg) no-repeat 100% 100%;
        mask: url(../assets/sunset.svg) no-repeat 100% 100%;
        -webkit-mask-position: center;
        mask-position: center;
      }
    }
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    h1 {
      color: var(--color-text);
      font-size: 1.5em;
      font-weight: 700;
    }

    .icon {
      width: 2em;
      height: 2em;

      background-color: var(--color-text);
      -webkit-mask: url(../assets/secret.svg) no-repeat 100% 100%;
      mask: url(../assets/secret.svg) no-repeat 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;
    }
  }
}
</style>

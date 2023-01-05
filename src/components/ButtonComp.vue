<script setup lang="ts">
const props = defineProps<{ outline?: boolean }>();
</script>

<template>
  <div class="button" :class="{ outline: props.outline }">
    <span><slot></slot></span>
  </div>
</template>

<style scoped lang="scss">
.button {
  width: 20em;
  padding: 0.8em;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: #2688eb;
  box-shadow: inset 0px -4px 0px #157ce5;
  border-radius: 6px;

  overflow: hidden;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  user-select: none;
  cursor: pointer;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;

    -webkit-mask: url(../assets/secret.svg) no-repeat 100% 100%;
    mask: url(../assets/secret.svg) no-repeat 100% 100%;
    -webkit-mask-position: center;
    mask-position: center;
    -webkit-mask-size: 110px;
    mask-size: 110px;

    background-color: #157ce5;
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: #57a3f0;
    box-shadow: inset 0px -4px 0px #3f96ed;
    &::before {
      background-color: #3f96ed;
    }
  }

  &:active {
    background-color: #1370cd;
    box-shadow: inset 0px -4px 0px #1163b6;
    &::before {
      background-color: #1163b6;
    }
  }

  > span {
    color: #fff;
    font-weight: 700;
    font-size: 1em;
    position: relative;
    transition: color 0.2s ease;
  }

  &.outline {
    background-color: rgba(38, 136, 235, 0.1);
    border: 1px solid #2688eb;
    box-shadow: none;

    > span {
      color: #2688eb;
    }

    &::before {
      background-color: rgba(21, 124, 229, 0.1);
    }

    &:hover {
      background-color: rgba(87, 163, 240, 0.1);
      border-color: #57a3f0;
      &::before {
        background-color: rgba(87, 163, 240, 0.1);
      }
      > span {
        color: #57a3f0;
      }
    }

    &:active {
      background-color: rgba(19, 112, 205, 0.1);
      border-color: #1370cd;
      &::before {
        background-color: rgba(19, 112, 205, 0.1);
      }
      > span {
        color: #1370cd;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { useAlertStore } from '@/stores/alert';
import { onMounted, ref } from 'vue';

const alertStore = useAlertStore();
const alertsBlock = ref<HTMLElement>();

onMounted(() => {
  alertsBlock.value?.addEventListener('mousedown', alertMouseDown, false);
  alertsBlock.value?.addEventListener('mouseup', alertMouseUp, false);
});

function alertMouseDown({ clientX, clientY }: MouseEvent) {
  if (alertsBlock.value) alertsBlock.value.style.pointerEvents = 'none';
  (document.elementFromPoint(clientX, clientY) as HTMLElement | null)?.click();
}
function alertMouseUp() {
  if (alertsBlock.value) alertsBlock.value.style.pointerEvents = 'all';
}
</script>

<template>
  <div class="alerts" ref="alertsBlock">
    <TransitionGroup name="fade">
      <div
        v-for="data in alertStore.alerts"
        class="item"
        :key="data.id"
        :class="data.type"
        @click="alertStore.del(data.id)"
      >
        <div class="icon"></div>
        <span>{{ data.msg }} </span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.alerts {
  z-index: 10;
  position: fixed;
  top: 10px;
  left: 10px;
  bottom: 10px;

  display: flex;
  flex-direction: column;
  max-width: calc(100% - 20px);
  gap: 10px;

  max-height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  > * {
    pointer-events: initial;
  }

  .item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: fit-content;
    padding: 12px 16px;
    gap: 12px;

    backdrop-filter: blur(10px);
    border-radius: 6px;

    .icon {
      width: 24px;
      height: 24px;
      min-width: 24px;
    }

    span {
      font-weight: 700;
      font-size: 14px;
    }

    &.success {
      background: rgba(39, 174, 96, 0.1);

      .icon {
        background-color: #27ae60;
        -webkit-mask: url(../assets/check.svg) no-repeat 100% 100%;
        mask: url(../assets/check.svg) no-repeat 100% 100%;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-size: 24px;
        mask-size: 24px;
      }

      span {
        color: #27ae60;
      }
    }

    &.error {
      background: rgba(235, 87, 87, 0.1);

      .icon {
        background-color: #eb5757;
        -webkit-mask: url(../assets/warn.svg) no-repeat 100% 100%;
        mask: url(../assets/warn.svg) no-repeat 100% 100%;
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-size: 24px;
        mask-size: 24px;
      }

      span {
        color: #eb5757;
      }
    }
  }
}
</style>

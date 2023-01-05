<script setup lang="ts">
import { useAlertStore } from '@/stores/alert';
import { computed, onMounted, ref } from 'vue';

const alertStore = useAlertStore();
const position = computed(() =>
  alertStore.alerts.length <= 1 ? 'initial' : undefined,
);
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
        :style="{ position }"
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
    padding: 0.5em;
    gap: 12px;

    backdrop-filter: blur(10px);
    border-radius: 6px;

    .icon {
      width: 1.5em;
      height: 1.5em;
      min-width: 24px;
    }

    span {
      font-weight: 700;
      font-size: 0.8em;
    }

    &.success {
      background-color: rgba(39, 174, 96, 0.1);

      .icon {
        background-color: #27ae60;
        -webkit-mask: url(../assets/check.svg) no-repeat 100% 100%;
        mask: url(../assets/check.svg) no-repeat 100% 100%;
        -webkit-mask-position: center;
        mask-position: center;
      }

      span {
        color: #27ae60;
      }
    }

    &.error {
      background-color: rgba(235, 87, 87, 0.1);

      .icon {
        background-color: #eb5757;
        -webkit-mask: url(../assets/warn.svg) no-repeat 100% 100%;
        mask: url(../assets/warn.svg) no-repeat 100% 100%;
        -webkit-mask-position: center;
        mask-position: center;
      }

      span {
        color: #eb5757;
      }
    }
  }
}
</style>

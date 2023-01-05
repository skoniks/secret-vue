import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

interface Alert {
  id: number;
  msg: string;
  type: string;
}

export const useAlertStore = defineStore('alert', () => {
  const lastId = ref(0);
  const alerts = reactive<Alert[]>([]);

  function add(msg: string, type = 'success') {
    const id = lastId.value++;
    alerts.unshift({ id, msg, type });
    setTimeout(() => del(id), 500000);
  }

  function del(alertId: number) {
    const index = alerts.findIndex(({ id }) => id === alertId);
    if (index !== -1) alerts.splice(index, 1);
  }

  return { alerts, add, del };
});

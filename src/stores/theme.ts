import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('theme') || getDefaultTheme());
  watch([theme], applyTheme);
  applyTheme();

  function getDefaultTheme() {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  }

  function changeTheme(newTheme: string) {
    localStorage.setItem('theme', newTheme);
    theme.value = newTheme;
  }

  function applyTheme() {
    const app = document.getElementById('app');
    if (app !== null) app.className = theme.value;
  }

  return { theme, changeTheme };
});

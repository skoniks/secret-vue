import { defineStore } from 'pinia';
import { reactive } from 'vue';

type Config = { short: string; ttl: string };

export const useSecretStore = defineStore('secret', () => {
  const config = reactive(loadConfig());

  function loadConfig(): Config {
    const def = { short: 'true', ttl: '604800' };
    const raw = localStorage.getItem('config');
    const config = raw ? JSON.parse(raw) : def;
    return config;
  }

  function changeConfig({ short, ttl }: Config) {
    (config.short = short), (config.ttl = ttl);
    localStorage.setItem('config', JSON.stringify(config));
  }

  return { config, changeConfig };
});

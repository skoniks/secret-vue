<script setup lang="ts">
import { http } from '@/plugins/http';
import { computed, onMounted, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const id = computed(() => `${route.params.id}`);
const message = ref('Загрузка...');
const preview = ref();
const content = ref('');
const passphrase = ref('');

onMounted(() => index());

async function index() {
  const data = await http('/api/' + id.value);
  if (data.expire) {
    message.value = '';
    preview.value = data;
  } else {
    message.value = 'Тайна не найдена';
  }
}

async function open() {
  const data = await http('/api/' + id.value, {
    body: JSON.stringify({ passphrase: passphrase.value }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  if (data.content) {
    preview.value = undefined;
    content.value = data.content;
  } else {
    alert('Тайна недоступна');
  }
}
</script>

<template>
  <div class="openForm" v-if="preview">
    <template v-if="preview.passphrase">
      <h1>Требуется фраза-пропуск</h1>
      <input
        type="text"
        maxlength="255"
        name="passphrase"
        v-model="passphrase"
        placeholder="Введите фразу-пропуск"
      />
    </template>
    <template v-else>
      <h1>Нажмите для продолжения</h1>
    </template>
    <p>Тайна истекает: {{ new Date(preview.expire).toLocaleString() }}</p>
    <button @click="open">Взглянуть на тайну</button>
  </div>
  <div class="watchForm" v-if="content">
    <h1>Просмотр тайны</h1>
    <textarea name="content" v-model="content" readonly></textarea>
  </div>
  <h1 v-if="message">{{ message }}</h1>
  <RouterLink to="/">
    <button>Создать новую тайну</button>
  </RouterLink>
</template>

<style scoped lang="scss">
h1 {
  margin: 10px 0;
  font-weight: initial;
}

input {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
}

textarea {
  width: 100%;
  min-height: 300px;
  resize: vertical;
  font-size: 16px;

  background: #eee;
  border-radius: 3px;
  padding: 10px;
  &:focus {
    outline: none;
  }
}
</style>

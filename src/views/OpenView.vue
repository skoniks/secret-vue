<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import TextareaComp from '@/components/TextareaComp.vue';
import { fileFromBase64 } from '@/plugins/file';
import { http } from '@/plugins/http';
import router from '@/plugins/router';
import { useAlertStore } from '@/stores/alert';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const alertStore = useAlertStore();
const id = computed(() => `${route.params.id}`);
const result = reactive({
  expire: 0,
  passphrase: false,
  content: '',
  image: false,
});
const expire = computed(() => new Date(result.expire).toLocaleString());
const passphrase = ref('');

onMounted(() => index());

async function index() {
  const data = await http('/api/' + id.value);
  if (data.statusCode !== 200) {
    const { message = 'Ошибка получения тайны' } = data;
    alertStore.add(message, 'error');
    return router.push('/');
  }
  result.expire = data.result.expire;
  result.passphrase = data.result.passphrase;
}

async function open() {
  const data = await http('/api/' + id.value, {
    body: JSON.stringify({ passphrase: passphrase.value }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  });
  if (data.statusCode !== 200) {
    const { message = 'Ошибка получения тайны' } = data;
    return alertStore.add(message, 'error');
  }
  if (data.result.type == 'text') {
    result.content = data.result.content;
  } else if (data.result.type == 'image') {
    result.content = data.result.content;
    result.image = true;
  } else {
    fileFromBase64(data.result.content, data.result.filename);
    return router.push('/');
  }
}
</script>

<template>
  <div class="container" v-if="!result.content">
    <div class="form" v-if="result.passphrase">
      <label for="passphrase">Требуется фраза-пропуск:</label>
      <InputComp
        id="passphrase"
        maxlength="255"
        v-model="passphrase"
        placeholder="Введите фразу-пропуск"
      />
    </div>
    <div class="form">
      <label for="expire">Тайна истекает:</label>
      <InputComp id="expire" v-model="expire" readonly />
    </div>
    <div class="buttons">
      <ButtonComp @click="open">Взглянуть на тайну</ButtonComp>
      <ButtonComp outline @click="router.push('/')">Новая тайна</ButtonComp>
    </div>
  </div>
  <div class="container" v-else>
    <div class="form">
      <label for="content">Тайное сообщение:</label>
      <TextareaComp
        v-if="!result.image"
        id="content"
        v-model="result.content"
        readonly
      />
      <img v-else :src="result.content" />
    </div>
    <div class="buttons">
      <ButtonComp outline @click="router.push('/')">Новая тайна</ButtonComp>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 1.2em;

  .form {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 12px;

    label {
      color: var(--color-text);
      font-weight: 700;
      font-size: 0.8em;
    }
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }

  textarea {
    min-height: 25vh;
  }

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    vertical-align: top;

    color: var(--color-text-sec);
    font-weight: 700;
    font-size: 0.8em;

    span {
      color: var(--color-text);
    }
  }

  img {
    padding: 0.8em;
    background-color: var(--color-background-sec);
    border-radius: 8px;
  }
}
</style>

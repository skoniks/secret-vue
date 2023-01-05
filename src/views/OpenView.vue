<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import TextareaComp from '@/components/TextareaComp.vue';
import { http } from '@/plugins/http';
import router from '@/plugins/router';
import { useAlertStore } from '@/stores/alert';
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const alertStore = useAlertStore();
const id = computed(() => `${route.params.id}`);
const result = reactive({ expire: 0, passphrase: false, content: '' });
const passphrase = ref('');

onMounted(() => index());

async function index() {
  try {
    const data = await http('/api/' + id.value);
    if (!data.expire) throw new Error();
    result.expire = data.expire;
    result.passphrase = data.passphrase;
  } catch (error) {
    alertStore.add('Ошибка получения тайны', 'error');
    router.push('/');
  }
}

async function open() {
  const data = await http('/api/' + id.value, {
    body: JSON.stringify({ passphrase: passphrase.value }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  if (data.content) {
    result.content = data.content;
  } else {
    alertStore.add('Тайна недоступна');
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
    <p>
      <span>Тайна истекает:</span>
      {{ new Date(result.expire).toLocaleString() }}
    </p>
    <div class="buttons">
      <ButtonComp @click="open">Взглянуть на тайну</ButtonComp>
      <ButtonComp outline @click="router.push('/')">Новая тайна</ButtonComp>
    </div>
  </div>
  <div class="container" v-else>
    <div class="form">
      <label for="content">Тайное сообщение:</label>
      <TextareaComp id="content" v-model="result.content" readonly />
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
    min-height: 15vh;
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
}
</style>

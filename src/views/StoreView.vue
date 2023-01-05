<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import SelectComp from '@/components/SelectComp.vue';
import TextareaComp from '@/components/TextareaComp.vue';
import { http } from '@/plugins/http';
import { useAlertStore } from '@/stores/alert';
import { computed, reactive } from 'vue';

const alertStore = useAlertStore();
const secret = reactive({ content: '', passphrase: '', ttl: '604800' });
const result = reactive({ id: '', url: '', expire: 0 });
const chars = computed(() => 1000000 - secret.content.length);

async function store() {
  try {
    const data = await http('/api', {
      body: JSON.stringify(secret),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    });
    if (!data.id) throw new Error();
    result.id = data.id;
    result.expire = data.expire;
    result.url = location.origin + '/' + data.id;
    alertStore.add('Тайна создана', 'success');
  } catch (error) {
    alertStore.add('Ошибка создания тайны', 'error');
  }
}

function clear() {
  result.id = '';
  result.url = '';
  result.expire = 0;
  secret.content = '';
  secret.passphrase = '';
}

function copy(event: Event, message: string) {
  (event.target as HTMLInputElement).select();
  const { value } = event.target as HTMLInputElement;
  navigator.clipboard.writeText(value);
  alertStore.add(message, 'success');
}
</script>

<template>
  <div class="container" v-if="!result.id">
    <div class="form">
      <label for="content">Тайное сообщение:</label>
      <TextareaComp
        id="content"
        maxlength="1000000"
        v-model="secret.content"
        placeholder="Напишите сюда свое сообщение"
      />
      <label class="chars" for="content">{{ chars }}</label>
    </div>
    <div class="form">
      <label for="passphrase">Фраза-пропуск:</label>
      <InputComp
        id="passphrase"
        maxlength="255"
        v-model="secret.passphrase"
        placeholder="Слово или фраза, которую сложно угадать"
      />
    </div>
    <div class="form">
      <label for="ttl">Срок хранения:</label>
      <SelectComp
        v-model="secret.ttl"
        :options="[
          [604800, '7 дней'],
          [259200, '3 дня'],
          [86400, '1 день'],
          [43200, '12 часов'],
          [14400, '4 часа'],
          [3600, '1 час'],
          [1800, '30 минут'],
          [300, '5 минут'],
        ]"
      />
    </div>
    <ButtonComp @click="store">Создать тайну</ButtonComp>
  </div>
  <div class="container" v-else>
    <div class="form">
      <label for="url">Ссылка:</label>
      <InputComp
        id="url"
        v-model="result.url"
        @click="(e: Event) => copy(e, 'Ссылка скопирована')"
        readonly
      />
    </div>
    <div class="form" v-if="secret.passphrase.length">
      <label for="passphrase">Фраза-пропуск:</label>
      <InputComp
        id="passphrase"
        v-model="secret.passphrase"
        @click="(e: Event) => copy(e, 'Фраза-пропуск скопирована')"
        readonly
      />
    </div>
    <p>
      <span>Тайна истекает:</span>
      {{ new Date(result.expire).toLocaleString() }}
    </p>
    <div class="buttons">
      <ButtonComp @click="clear" outline>Новая тайна</ButtonComp>
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

      &.chars {
        position: absolute;
        bottom: 10px;
        right: 10px;

        color: var(--color-text-sec);
        font-weight: 500;
        font-size: 0.8em;
      }
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

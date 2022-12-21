<script setup lang="ts">
import { computed, ref } from 'vue';

const baseUrl = import.meta.env.VITE_API_URL;

const content = ref('');
const passphrase = ref('');
const ttl = ref('604800');
const shareUrl = ref('');
const share = ref<HTMLInputElement>();
const chars = computed(() => 1000000 - content.value.length);

async function store() {
  try {
    const data = await fetch(baseUrl + '/api', {
      body: JSON.stringify({
        content: content.value,
        passphrase: passphrase.value,
        ttl: ttl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    }).then((response) => response.json());
    shareUrl.value = location.origin + '/secret/' + data.id;
    setTimeout(() => select(), 50);
  } catch (error) {
    alert('Ошибка создания тайны');
  }
}

function select() {
  share.value!.select();
}
</script>

<template>
  <div class="shareForm" v-show="shareUrl.length">
    <h1>Поделиться этой ссылкой:</h1>
    <input
      type="text"
      @click="select"
      v-model="shareUrl"
      ref="share"
      readonly
    />
  </div>
  <h1>Вставьте пароль или тайное сообщение ниже</h1>
  <div class="textForm">
    <textarea name="content" v-model="content" maxlength="1000000"></textarea>
    <label for="content">{{ chars }}</label>
  </div>
  <div class="paramsForm">
    <div class="group">
      <span>Фраза-пропуск:</span>
      <input
        type="text"
        maxlength="255"
        name="passphrase"
        v-model="passphrase"
        placeholder="Слово или фраза, которую сложно угадать"
      />
    </div>
    <div class="group">
      <span>Срок хранения:</span>
      <select name="ttl" v-model="ttl">
        <option value="604800">7 дней</option>
        <option value="259200">3 дня</option>
        <option value="86400">1 день</option>
        <option value="43200">12 часов</option>
        <option value="14400">4 часа</option>
        <option value="3600">1 час</option>
        <option value="1800">30 минут</option>
        <option value="300">5 минут</option>
      </select>
    </div>
  </div>
  <button @click="store">Создать тайну</button>
</template>

<style scoped lang="scss">
h1 {
  margin: 10px 0;
  font-weight: initial;
}

.shareForm {
  input {
    width: 100%;
    font-size: 16px;
    padding: 10px;
  }
}

.textForm {
  display: flex;
  position: relative;
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
  label {
    color: #aaa;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}

.paramsForm {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
  .group {
    display: flex;
    align-items: center;
    span {
      flex: 1;
    }
    input,
    select {
      font-size: 16px;
      padding: 10px;
      flex: 4;
    }
  }
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
}
</style>

<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import SelectComp from '@/components/SelectComp.vue';
import TextareaComp from '@/components/TextareaComp.vue';
import { useAlertStore } from '@/stores/alert';
import { computed, reactive } from 'vue';

const alertStore = useAlertStore();
const secret = reactive({ content: '', passphrase: '', ttl: '604800' });
const chars = computed(() => 1000000 - secret.content.length);
</script>

<template>
  <div class="container">
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
    <ButtonComp @click="alertStore.add(new Date().toLocaleString())"
      >Создать тайну</ButtonComp
    >
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 22px;

  .form {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 12px;

    label {
      color: var(--color-text);
      font-weight: 700;
      font-size: 14px;

      &.chars {
        position: absolute;
        bottom: 10px;
        right: 10px;

        color: var(--color-text-sec);
        font-weight: 500;
        font-size: 12px;
      }
    }
  }

  .button {
    max-width: 100%;
    margin: 0 auto;
  }

  textarea {
    min-height: 15vh;
  }
}
</style>

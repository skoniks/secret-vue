<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import SelectComp from '@/components/SelectComp.vue';
import TextareaComp from '@/components/TextareaComp.vue';
</script>

<template>
  <div class="container">
    <div class="form">
      <label for="content">Тайное сообщение:</label>
      <TextareaComp
        id="content"
        maxlength="1000000"
        placeholder="Напишите сюда свое сообщение"
      />
    </div>
    <div class="form">
      <label for="passphrase">Фраза-пропуск:</label>
      <InputComp
        id="passphrase"
        maxlength="255"
        placeholder="Слово или фраза, которую сложно угадать"
      />
    </div>
    <div class="form">
      <label for="ttl">Срок хранения:</label>
      <SelectComp
        :options="{
          604800: '7 дней',
          259200: '3 дня',
          86400: '1 день',
          43200: '12 часов',
          14400: '4 часа',
          3600: '1 час',
          1800: '30 минут',
          300: '5 минут',
        }"
      />
    </div>
    <ButtonComp>Создать тайну</ButtonComp>
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
    gap: 12px;

    label {
      font-weight: 700;
      font-size: 14px;
      color: var(--color-text);
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

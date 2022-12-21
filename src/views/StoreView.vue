<template>
  <h1>Вставьте пароль или тайное сообщение ниже</h1>
  <div class="textForm">
    <textarea name="content"></textarea>
    <label for="content">1000000</label>
  </div>
  <div class="paramsForm">
    <div class="group">
      <span>Фраза-пропуск:</span>
      <input
        type="text"
        maxlength="255"
        name="passphrase"
        placeholder="Слово или фраза, которую сложно угадать"
      />
    </div>
    <div class="group">
      <span>Срок хранения:</span>
      <select name="ttl">
        <option value="604800" selected>7 дней</option>
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
  <button>Создать тайну</button>
</template>

<style scoped lang="scss">
h1 {
  margin: 10px 0;
  font-weight: initial;
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

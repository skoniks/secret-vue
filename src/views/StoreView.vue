<script setup lang="ts">
import ButtonComp from '@/components/ButtonComp.vue';
import InputComp from '@/components/InputComp.vue';
import SelectComp from '@/components/SelectComp.vue';
import TextareaComp from '@/components/TextareaComp.vue';
import { fileToBase64 } from '@/plugins/file';
import { http } from '@/plugins/http';
import { useAlertStore } from '@/stores/alert';
import { useSecretStore } from '@/stores/secret';
import { computed, reactive, ref, watch } from 'vue';

const alertStore = useAlertStore();
const secretStore = useSecretStore();
const secret = reactive({
  content: '',
  type: 'text',
  mime: '',
  filename: '',
  passphrase: '',
  // short: 'true',
  // ttl: '604800',
  ...secretStore.config,
});
watch(secret, (value) => secretStore.changeConfig(value));

const input = ref<HTMLInputElement>();
const result = reactive({ id: '', url: '', expire: 0 });
const chars = computed(() => 1000000 - secret.content.length);
const expire = computed(() => new Date(result.expire).toLocaleString());

async function store() {
  alertStore.add('Создание тайны...', 'success');
  const data = await http('/api', {
    body: JSON.stringify(secret),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  if (data.statusCode !== 200) {
    const { message = 'Ошибка создания тайны' } = data;
    return alertStore.add(message, 'error');
  }
  result.id = data.result.id;
  result.expire = data.result.expire;
  result.url = location.origin + '/' + data.result.id;
  alertStore.add('Тайна создана', 'success');
}

function clear() {
  result.id = '';
  result.url = '';
  result.expire = 0;
  secret.content = '';
  secret.type = 'text';
  secret.mime = '';
  secret.filename = '';
  secret.passphrase = '';
}

function copy(event: Event, message: string) {
  (event.target as HTMLInputElement).select();
  const { value } = event.target as HTMLInputElement;
  navigator.clipboard.writeText(value);
  alertStore.add(message, 'success');
}

function onInput() {
  if (secret.type != 'text') {
    secret.type = 'text';
    secret.mime = '';
    secret.filename = '';
  }
}

function copyPrev(event: Event) {
  ((event.target as HTMLInputElement).previousSibling as HTMLElement).click();
}

async function handleFile(file: File) {
  const base64 = await fileToBase64(file);
  if (base64.length > 1000000) {
    const message = 'Недопустимый размер файла';
    return alertStore.add(message, 'error');
  }
  secret.type = file.type.startsWith('image') ? 'image' : 'file';
  secret.mime = file.type;
  secret.filename = file.name;
  secret.content = base64;
}

function onDrop(event: DragEvent) {
  if (!event.dataTransfer?.files) return;
  const [file] = event.dataTransfer.files;
  if (file) event.preventDefault(), handleFile(file);
}

function onPaste(event: ClipboardEvent) {
  if (!event.clipboardData?.files) return;
  const [file] = event.clipboardData.files;
  if (file) event.preventDefault(), handleFile(file);
}

function onFile() {
  if (!input.value?.files) return;
  const [file] = input.value.files;
  if (file) handleFile(file);
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
        @drop="onDrop"
        @paste="onPaste"
        @input="onInput"
      />
      <label class="chars" for="content">{{ chars }}</label>
      <div v-if="!secret.content" class="file" @click="input?.click"></div>
      <input ref="input" type="file" @change="onFile" />
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
    <div class="group">
      <div class="form">
        <label>Срок хранения:</label>
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
      <div class="form">
        <label>Тип ссылки:</label>
        <SelectComp
          v-model="secret.short"
          :options="[
            ['true', 'Короткая'],
            ['', 'Длинная'],
          ]"
        />
      </div>
    </div>
    <ButtonComp @click="store">Создать тайну</ButtonComp>
  </div>
  <div class="container" v-else>
    <div class="form copy">
      <label for="url">Ссылка на тайну:</label>
      <InputComp
        id="url"
        v-model="result.url"
        @click="(e: Event) => copy(e, 'Ссылка скопирована')"
        readonly
      />
      <div class="copy" @click="copyPrev"></div>
    </div>
    <div class="form copy" v-if="secret.passphrase.length">
      <label for="passphrase">Фраза-пропуск:</label>
      <InputComp
        id="passphrase"
        v-model="secret.passphrase"
        @click="(e: Event) => copy(e, 'Фраза-пропуск скопирована')"
        readonly
      />
      <div class="copy" @click="copyPrev"></div>
    </div>
    <div class="form">
      <label for="expire">Тайна истекает:</label>
      <InputComp id="expire" v-model="expire" readonly />
    </div>
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

    &.copy input {
      padding-right: 3em;
    }

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

        transition: all 0.2s ease;

        &:hover {
          padding: 0.2em 0.4em;
          background-color: var(--color-background-sec);
          border-radius: 8px;
        }
      }
    }

    .copy {
      width: 1.2em;
      height: 1.2em;
      position: absolute;
      bottom: 0.6em;
      right: 0.6em;
      cursor: pointer;

      background-color: var(--color-text);
      -webkit-mask: url(../assets/copy.svg) no-repeat 100% 100%;
      mask: url(../assets/copy.svg) no-repeat 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;
    }

    .file {
      width: 1.2em;
      height: 1.5em;
      position: absolute;
      cursor: pointer;
      bottom: 0.6em;
      left: 0.6em;

      transition: opacity 0.2s ease;
      opacity: 0.5;

      background-color: var(--color-text-sec);
      -webkit-mask: url(../assets/file.svg) no-repeat 100% 100%;
      mask: url(../assets/file.svg) no-repeat 100% 100%;
      -webkit-mask-position: center;
      mask-position: center;

      &:hover {
        opacity: 1;
      }
    }

    input[type='file'] {
      display: none;
    }
  }

  .group {
    display: flex;
    gap: 1em;

    > .form {
      width: 100%;
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

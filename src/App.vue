<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { ref, computed } from 'vue'
import { convertJSON } from '@/utils/convertJSON'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

const { classes, converter } = convertJSON()

const jsonText = ref()
const ts = ref<string[]>()
const results = computed(() => {
  return ts.value?.map((value) => {
    const className = Array.from(value.matchAll(/class (.*?) \{/g), x => x[1])[0] + '.ts'
    return {
      value,
      className
    }
  }).reverse()
})

function generate() {
  ts.value = []
  classes.value = []
  converter(JSON.parse(jsonText.value))
  ts.value = classes.value
}

async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    alert('Copied to clipboard!')
  } catch (error) {
    alert('Failed to copy')
  }
}
</script>

<template>
  <section class="container">
    <section style="flex: 1 1 0; border: 1px solid teal; overflow-y: auto; border-radius: 8px;">
      <Codemirror v-model="jsonText" placeholder="Input JSON here" autofocus :extensions="[json(), oneDark]" />
    </section>
    <section style="flex: 0 0 10%">
      <button @click="generate" class="generate-button">Generate</button>
    </section>
    <section style="flex: 1 1 0; overflow-y: auto; display: flex; flex-direction: column; row-gap: 8px;">
      <section v-for="(result, index) in results" :key="index" class="result-container">
        <div class="result-header">
          <p>{{ result.className }}</p>
          <button class="copy-button" @click="copy(result.value)">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor">
              <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
            </svg>
          </button>
        </div>
        <section style="padding: 16px;">
          <pre>{{ result.value }}</pre>
        </section>
      </section>
      <p v-if="ts?.length === 0" style="text-align: center; font-style: italic;">Please Input a JSON first</p>
    </section>
  </section>
</template>

<style scoped>
.container {
  width: 100vw; 
  height: 100dvh;
  display: flex;
  padding: 16px;
  overflow-y: hidden;
  column-gap: 16px;
}

.generate-button {
  width: 100%; padding: 8px 8px; font-weight: 700; color: teal; border: none; background-color: wheat; border-radius: 8px;
  cursor: pointer;
}

.generate-button:hover {
  background-color: teal;
  color: wheat;
}

.result-container {
  border: 1px solid teal;
  border-radius: 8px;
}

.result-header {
  padding: 8px 16px;
  background-color: rgba(0, 128, 128, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.copy-button {
  padding: 0;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.copy-button:hover {
  opacity: 0.8;
}
</style>

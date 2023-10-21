<script setup lang="ts">
import { Codemirror } from 'vue-codemirror'
import { ref, computed } from 'vue'
import { convertJSON, resetClasses } from '@/utils/convertJSON'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import * as JSZip from 'jszip'

const jsonText = ref()
const ts = ref<string[]>()
const results = computed(() => {
  return ts.value?.map((value) => {
    const className = Array.from(value.matchAll(/class (.*?) \{/g), x => x[1])[0] + '.ts'
    return {
      value,
      className
    }
  })
})

function generate() {
  ts.value = []
  resetClasses()
  ts.value = convertJSON(JSON.parse(jsonText.value))
}

async function copy(value: string) {
  try {
    await navigator.clipboard.writeText(value)
    alert('Copied to clipboard!')
  } catch (error) {
    alert('Failed to copy')
  }
}

function downloadSingle(fileName: string, value: string) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(value)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function downloadAll() {
  const zip = new JSZip()
  const dtos = zip.folder('dtos')
  results.value.forEach((result) => {
    dtos.file(result.className, result.value)
  })
  zip.generateAsync({ type: 'blob' }).then((content) => {
    const link = document.createElement('a')
    link.download = 'dtos.zip'
    link.href = URL.createObjectURL(content)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}

function download() {
  if (results.value.length > 1) downloadAll()
  if (results.value.length === 1) downloadSingle(results.value[0].className, results.value[0].value)
  return
}
</script>

<template>
  <section class="container">
    <div>
      <h1>JSON to Typescript Class</h1>
      <div class="link-container">
        <a href="https://twitter.com/lutvue" target="_blank" rel="noopener noreferrer" title="My X's account">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
          </svg>
        </a>
        <a href="https://github.com/lutfihakim28/json-to-tsclass" target="_blank" rel="noopener noreferrer" title="GitHub Repository">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" fill="currentColor">
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
          </svg>
        </a>
      </div>
    </div>
    <section class="main">
      <section style="flex: 1 1 0; border: 1px solid teal; overflow-y: auto; border-radius: 8px;">
        <Codemirror v-model="jsonText" placeholder="Input JSON here" style="min-height: 100%;" autofocus :extensions="[json(), oneDark]" />
      </section>
      <section style="flex: 0 0 10%; align-self: center; display: flex; flex-direction: column; row-gap: 8px;">
        <button @click="generate" class="generate-button">Generate</button>
        <button @click="download" class="generate-button" :style="{ opacity: ts && ts?.length ? 1 : 0, pointerEvents: ts && ts?.length ? 'auto' : 'none' }">Download All</button>
      </section>
      <section style="flex: 1 1 0; overflow-y: auto; display: flex; flex-direction: column; position: relative; row-gap: 8px; background-color: #282c34; border-radius: 8px; border: 1px solid teal; padding: 8px;">
        <section v-for="(result, index) in results" :key="index" class="result-container">
          <div class="result-header">
            <p>{{ result.className }}</p>
            <section style="display: flex; align-items: center; column-gap: 16px;">
              <button class="copy-button" @click="copy(result.value)">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"/>
                </svg>
              </button>
              <button class="copy-button" @click="downloadSingle(result.className, result.value)">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/>
                </svg>
              </button>
            </section>
          </div>
          <section style="padding: 16px;">
            <pre>{{ result.value }}</pre>
          </section>
        </section>
        <p v-if="!ts || ts?.length === 0" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); text-align: center; font-style: italic;">Please Input a JSON first</p>
      </section>
    </section>
  </section>
</template>

<style scoped>
* {
  scrollbar-width: thin !important;
  scrollbar-color: #008080 #ffffff00;
}
*::-webkit-scrollbar {
  width: 4px;
}
*::-webkit-scrollbar-track {
  background: #ffffff00;
}
*::-webkit-scrollbar-thumb {
  background-color: #008080;
  border-radius: 10px;
  border: 0px none #ffffff;
}
.container {
  width: 100vw; 
  height: 100dvh;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
}

.container > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
}

.container > div > h1 {
  font-size: 28px;
}

.container .link-container {
  display: flex;
  column-gap: 16px;
}

.link-container a {
  color: #ebebeba3;
}

.link-container a:hover {
  color: #ebebeb50;
  background-color: transparent;
}

.link-container a svg {
  width: 24px;
  height: 24px;
}

.main {
  padding: 16px;
  display: flex;
  column-gap: 16px;
  flex: 1 0 0;
  overflow: hidden;
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
  border-radius: 4px;
  background-color: #181818;
  /* box-shadow: 4px 4px 6px -2px teal;
  -webkit-box-shadow: 4px 4px 6px -2px teal;
  -moz-box-shadow: 4px 4px 6px -2px teal; */
}

.result-header {
  padding: 8px 16px;
  background-color: rgba(0, 128, 128, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
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

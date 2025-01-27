---
outline: deep
---

# Icon Demo

<script setup>
import IconPreview from './components/IconPreview.vue'
import { ref, watch } from 'vue'
import { useData } from 'vitepress'
import json from '@nortic/icons'

const { isDark } = useData()
const iconNames = Object.keys(json.icons).sort()
const color = ref(isDark.value ? '#ffffff' : '#000000')
const currentIcon = ref()

function handleIconClick(iconName) {
  currentIcon.value = iconName
}

watch(isDark, (_isDark) => {
  if (_isDark) {
    color.value = '#ebebf5'
  } else [
    color.value = '#3c3c43'
  ]
})
</script>

<div class="flex flex-wrap gap-4 mt-8">
  <IconPreview v-for="iconName in iconNames" :key="iconName" :color="color" :icon-name="iconName" @click="handleIconClick" />
</div>

<div v-if="currentIcon" class="mt-8 bg-[var(--vp-c-bg-alt)] border border-solid border-[var(--vp-c-divider)] p-4 rounded-lg">
  <div class="mb-4">
    <h5>{{ currentIcon }}</h5>
    <h4>UnoCSS usage: <code>{{ `<div class="i-nortic-${currentIcon}" />` }}</code></h4>
  </div>

  <div :class="`i-nortic-${currentIcon}`" :style="{ color }" class="text-6xl" />
</div>

<div>
  <h2>Change color</h2>

  <input v-model="color" type="color" />
</div>

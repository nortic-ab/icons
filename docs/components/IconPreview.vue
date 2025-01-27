<script setup lang="ts">
import { offset, useFloating } from '@floating-ui/vue'
import { ref, useTemplateRef } from 'vue'

defineProps<{
  iconName: string
  color?: string
}>()

defineEmits<{
  click: [iconName: string]
}>()

const isTooltipVisible = ref(false)
const iconButton = useTemplateRef('icon-button')
const tooltipRef = useTemplateRef('tooltip')
const {
  floatingStyles,
} = useFloating(iconButton, tooltipRef, {
  placement: 'bottom',
  middleware: [
    offset(6),
  ],
})
</script>

<template>
  <button ref="icon-button" class="p-2 border border-solid border-[var(--vp-c-divider)] rounded-md hover:border-[var(--vp-c-brand-1)]" @click="$emit('click', iconName)" @mouseover="isTooltipVisible = true" @mouseleave="isTooltipVisible = false">
    <div :class="`i-nortic-${iconName}`" class="text-4xl" :style="{ color }" />
  </button>

  <ClientOnly>
    <Teleport to="body">
      <div v-if="isTooltipVisible" ref="tooltip" :style="floatingStyles" class="text-sm rounded-md border border-solid border-[var(--vp-c-brand-1)] bg-[var(--vp-c-bg)] px-2 py-1">
        {{ iconName }}
      </div>
    </Teleport>
  </ClientOnly>
</template>

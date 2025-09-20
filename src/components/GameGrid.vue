<template>
  <div
    class="grid animate-scaleIn"
    :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }"
    role="grid"
    aria-label="Color grid"
  >
    <div
      v-for="(color, index) in colors"
      :key="`${gridSize}-${index}`"
      :style="{ backgroundColor: color, '--index': index }"
      class="grid-item grid-item-enter"
      role="gridcell"
      :tabindex="0"
      @click="checkColor(index)"
      @keydown.enter.space="checkColor(index)"
      :aria-label="'Color cell ' + (index + 1)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, ref, watch } from 'vue'
import { useSound } from '../composables/useSound'
import { useHaptics } from '../composables/useMobileInteractions'

const props = defineProps<{ gridSize: number }>()
const emit = defineEmits(['correct', 'wrong'])
const { playCorrect, playWrong } = useSound()
const { successFeedback, errorFeedback, tapFeedback } = useHaptics()

const baseColor = ref('')
const differentColor = ref('')
const colors = ref<string[]>([])

const generateColors = () => {
  baseColor.value = `rgb(${random255()}, ${random255()}, ${random255()})`
  differentColor.value = lightenColor(baseColor.value, 20)

  colors.value = Array(props.gridSize ** 2).fill(baseColor.value)
  const diffIndex = Math.floor(Math.random() * props.gridSize ** 2)
  colors.value[diffIndex] = differentColor.value
}

const checkColor = (index: number) => {
  tapFeedback() // Haptic feedback for touch
  
  if (colors.value[index] === differentColor.value) {
    playCorrect()
    successFeedback() // Success haptic pattern
    emit('correct')
  } else {
    playWrong()
    errorFeedback() // Error haptic pattern
    emit('wrong')
  }
  generateColors()
}

// Watch for grid size changes and regenerate the grid
watch(() => props.gridSize, generateColors)
onMounted(generateColors)

function random255() {
  return Math.floor(Math.random() * 256)
}

function lightenColor(rgb: string, percent: number) {
  const [r, g, b] = rgb.match(/\d+/g)!.map(Number)
  return `rgb(${r + percent}, ${g + percent}, ${b + percent})`
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.grid {
  display: grid;
  gap: 5px;
  margin: 20px auto;
  width: 300px;
  max-width: 90vw;
  justify-content: center;
}

// Base grid-item styles
.grid-item {
  aspect-ratio: 1 / 1;
  border-radius: $radius-base;
  cursor: pointer;
  transition: transform $animation-duration-fast $animation-easing, box-shadow $animation-duration-fast;
  -webkit-tap-highlight-color: transparent;
  outline: none;
  user-select: none;
  
  &.grid-item-enter {
    animation: slideInUp $animation-duration-fast $animation-easing;
    animation-delay: calc(var(--index) * 0.02s);
    animation-fill-mode: both;
  }
}

// Only apply hover/scale on devices that support hover (not touch)
@media (hover: hover) and (pointer: fine) {
  .grid-item:hover {
    transform: scale(1.1);
  }
}

// Remove active/focus highlight on mobile/touch
.grid-item:active,
.grid-item:focus {
  outline: none;
  box-shadow: none;
  background-image: none;
}

@media (max-width: $breakpoint-mobile) {
  .grid {
    width: 80%;
    max-width: 95vw;
    gap: 2vw;
    margin: 10px auto;
  }
  .grid-item {
    border-radius: $radius-small;
    // Remove tap highlight and focus/active outline on mobile
    -webkit-tap-highlight-color: transparent;
    outline: none;
    user-select: none;
  }
}
</style>

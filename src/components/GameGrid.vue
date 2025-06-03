<template>
  <div class="grid" :style="{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :style="{ backgroundColor: color }"
      class="grid-item"
      @click="checkColor(index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, ref, watch } from 'vue'

const props = defineProps<{ gridSize: number }>()
const emit = defineEmits(['correct', 'wrong'])

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
  if (colors.value[index] === differentColor.value) emit('correct')
  else emit('wrong')
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
.grid {
  display: grid;
  gap: 5px;
  margin: 20px auto;
  width: 300px;
  max-width: 90vw;
  justify-content: center;
}

.grid-item {
  aspect-ratio: 1 / 1;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.1s;
}

.grid-item:hover {
  transform: scale(1.1);
}
@media (max-width: 768px) {
  .grid {
    width: 80%;
    max-width: 95vw;
    gap: 2vw;
    margin: 10px auto;
  }
  .grid-item {
    border-radius: 3px;
  }
}
</style>

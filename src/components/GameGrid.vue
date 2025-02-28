<template>
    <div class="grid">
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
  import { defineEmits, onMounted, ref } from "vue";
  
  const emit = defineEmits(["correct", "wrong"]);
  
  const gridSize = 4;
  const baseColor = ref("");
  const differentColor = ref("");
  const colors = ref<string[]>([]);
  
  const generateColors = () => {
    baseColor.value = `rgb(${random255()}, ${random255()}, ${random255()})`;
    differentColor.value = lightenColor(baseColor.value, 20);
    
    colors.value = Array(gridSize ** 2).fill(baseColor.value);
    const diffIndex = Math.floor(Math.random() * (gridSize ** 2));
    colors.value[diffIndex] = differentColor.value;
  };
  
  const checkColor = (index: number) => {
    if (colors.value[index] === differentColor.value) emit("correct");
    else emit("wrong");
    generateColors();
  };
  
  onMounted(generateColors);
  
  function random255() {
    return Math.floor(Math.random() * 256);
  }
  
  function lightenColor(rgb: string, percent: number) {
    const [r, g, b] = rgb.match(/\d+/g)!.map(Number);
    return `rgb(${r + percent}, ${g + percent}, ${b + percent})`;
  }
  </script>
  
  <style scoped lang="scss">
  .grid {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    gap: 5px;
    margin-top: 20px;
  }
  
  .grid-item {
    width: 45px;
    height: 45px;
    border-radius: 5px;
    cursor: pointer;
    transition: transform 0.1s;
  }
  
  .grid-item:hover {
    transform: scale(1.1);
  }
  </style>
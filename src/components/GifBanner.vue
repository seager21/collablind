<template>
  <div class="gif-banner">
    <button v-if="gifs.length > 1" class="arrow left" @click="prevGif">&#8592;</button>
    <img :src="gifSrc" alt="Background gif" />
    <button v-if="gifs.length > 1" class="arrow right" @click="nextGif">&#8594;</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{ gifs: string[] }>()
const current = ref(0)
const gifSrc = computed(() => props.gifs[current.value])
function nextGif() {
  current.value = (current.value + 1) % props.gifs.length
}
function prevGif() {
  current.value = (current.value - 1 + props.gifs.length) % props.gifs.length
}
</script>

<style scoped>
.gif-banner {
  position: relative;
  width: 100vw;
  max-width: 100vw;
  max-height: 400px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  z-index: 2;
}
.gif-banner img {
  width: 100vw;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.7);
  border: none;
  font-size: 2rem;
  color: #ff00ff;
  cursor: pointer;
  z-index: 2;
  padding: 0 10px;
  border-radius: 50%;
}
.arrow.left {
  left: 10px;
}
.arrow.right {
  right: 10px;
}
@media (max-width: 768px) {
  .gif-banner {
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 100px;
  }
  .gif-banner img {
    aspect-ratio: 16 / 9;
    width: 100vw;
    height: auto;
    min-height: 100px;
    object-fit: cover;
  }
  .arrow {
    font-size: 1.3rem;
    padding: 0 6px;
  }
}
</style>

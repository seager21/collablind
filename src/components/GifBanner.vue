<template>
  <div class="gif-banner animate-fadeIn" role="region" aria-label="Background GIF banner">
    <button
      v-if="gifs.length > 1"
      class="arrow left btn-effect"
      @click="prevGif"
      :aria-label="'Previous background'"
      tabindex="0"
      @keydown.enter.space="prevGif"
    >
      &#8592;
    </button>
    <div class="gif-container">
      <img 
        v-if="gifs.length > 0" 
        :src="gifSrc" 
        alt="Animated background GIF" 
        draggable="false" 
        class="gif-image animate-scaleIn" 
        :key="current"
      />
      <div class="gif-overlay"></div>
    </div>
    <button
      v-if="gifs.length > 1"
      class="arrow right btn-effect"
      @click="nextGif"
      :aria-label="'Next background'"
      tabindex="0"
      @keydown.enter.space="nextGif"
    >
      &#8594;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSound } from '../composables/useSound'

const props = defineProps<{ gifs: string[] }>()
const { playClick } = useSound()

const current = ref(0)
const gifSrc = computed(() => props.gifs[current.value])

function nextGif() {
  playClick()
  current.value = (current.value + 1) % props.gifs.length
}

function prevGif() {
  playClick()
  current.value = (current.value - 1 + props.gifs.length) % props.gifs.length
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.gif-banner {
  position: relative;
  width: 100%;
  max-width: 100vw;
  max-height: 400px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, 
    rgba($color-bg-dark, 0.9), 
    rgba($color-bg-overlay, 0.9)
  );
  border-radius: $radius-large;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 2;
  animation-delay: 0.5s;
}

.gif-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: $radius-large;
  overflow: hidden;
}

.gif-image {
  width: 100%;
  height: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  border-radius: $radius-large;
  animation-delay: 0.3s;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
}

.gif-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba($color-button-primary, 0.1) 0%,
    transparent 50%,
    rgba($color-button-secondary, 0.1) 100%
  );
  pointer-events: none;
  border-radius: $radius-large;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba($color-bg-overlay, 0.9);
  backdrop-filter: blur(10px);
  border: 2px solid rgba($color-button-primary, 0.6);
  font-size: 1.8rem;
  color: $color-button-primary;
  cursor: pointer;
  z-index: 3;
  padding: 12px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgba($color-bg-overlay, 1);
    border-color: $color-button-primary;
    color: $color-button-secondary;
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba($color-button-primary, 0.3);
  }
  
  &:active {
    transform: translateY(-50%) scale(0.95);
  }
  
  &.left {
    left: 15px;
  }
  
  &.right {
    right: 15px;
  }
}

@media (max-width: $breakpoint-mobile) {
  .gif-banner {
    aspect-ratio: 16 / 9;
    height: auto;
    min-height: 100px;
    border-radius: 8px;
    max-height: 300px;
  }
  
  .gif-container {
    border-radius: 8px;
  }
  
  .gif-image {
    aspect-ratio: 16 / 9;
    width: 100%;
    height: auto;
    min-height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .gif-overlay {
    border-radius: 8px;
  }
  
  .arrow {
    font-size: 1.4rem;
    padding: 8px;
    width: 40px;
    height: 40px;
    
    &.left {
      left: 10px;
    }
    
    &.right {
      right: 10px;
    }
    
    &:hover {
      transform: translateY(-50%) scale(1.05);
    }
  }
}

@media (max-width: $breakpoint-small) {
  .gif-banner {
    max-height: 200px;
    border-radius: 6px;
  }
  
  .gif-container {
    border-radius: 6px;
  }
  
  .gif-image {
    border-radius: 6px;
  }
  
  .gif-overlay {
    border-radius: 6px;
  }
  
  .arrow {
    font-size: 1.2rem;
    padding: 6px;
    width: 36px;
    height: 36px;
    
    &.left {
      left: 8px;
    }
    
    &.right {
      right: 8px;
    }
  }
}

// Accessibility: Reduce motion for users who prefer it
@media (prefers-reduced-motion: reduce) {
  .gif-image {
    &:hover {
      transform: none;
    }
  }
  
  .arrow {
    &:hover {
      transform: translateY(-50%);
    }
    
    &:active {
      transform: translateY(-50%);
    }
  }
}
</style>

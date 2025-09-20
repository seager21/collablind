<template>
  <button
    @click="handleRestart"
    class="btn-effect btn-primary animate-fadeIn"
    aria-label="Restart Game"
    tabindex="0"
  >
    <span class="button-text">Restart Game</span>
  </button>
</template>

<script setup lang="ts">
import { useSound } from '../composables/useSound'

const emit = defineEmits(['restart'])
const { playClick } = useSound()

const handleRestart = () => {
  playClick()
  emit('restart')
}
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';
@import '../assets/animations.scss';

button {
  margin: 20px auto;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  min-width: 160px;
  animation-delay: 0.3s;
}

.button-text {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
  z-index: 1;
}

button:hover::before {
  left: 100%;
}

button:active {
  transform: scale(0.95);
}

@media (max-width: $breakpoint-mobile) {
  button {
    font-size: 1rem;
    padding: 10px 20px;
    margin: 16px auto;
    min-width: 140px;

    &:active {
      transform: scale(0.98);
    }
  }
}

@media (max-width: $breakpoint-small) {
  button {
    font-size: 0.9rem;
    padding: 8px 16px;
    margin: 12px auto;
    min-width: 120px;
  }
}
</style>

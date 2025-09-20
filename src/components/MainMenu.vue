<template>
  <main class="main-menu animate-fadeIn" role="main" id="main-content" aria-label="Main menu">
    <h1 class="animate-slideInDown" tabindex="0">Welcome to CollaBlind</h1>
    <div class="button-container">
      <button 
        class="btn-effect animate-slideInUp" 
        @click="handleStartGame" 
        aria-label="Start New Game" 
        tabindex="0"
        style="animation-delay: 0.2s"
      >
        Start New Game
      </button>
      <button 
        class="btn-secondary animate-slideInUp" 
        @click="handleViewScoreboard" 
        aria-label="Check Scoreboard" 
        tabindex="0"
        style="animation-delay: 0.4s"
      >
        Check Scoreboard
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSound } from '../composables/useSound'

const emit = defineEmits(['start-game', 'view-scoreboard'])
const { playClick, playWhoosh } = useSound()

const handleStartGame = () => {
  playClick()
  setTimeout(() => {
    playWhoosh()
    emit('start-game')
  }, 150)
}

const handleViewScoreboard = () => {
  playClick()
  setTimeout(() => {
    emit('view-scoreboard')
  }, 150)
}
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  color: $color-text-invert;
  text-align: center;
  padding: 2rem;

  h1 {
    font-size: $font-size-large;
    margin-bottom: 3rem;
    color: $color-text-invert;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    font-family: $font-main, $font-fallback;
    
    @media (max-width: $breakpoint-mobile) {
      font-size: $font-size-header;
      margin-bottom: 2rem;
    }
  }

  .button-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    
    @media (max-width: $breakpoint-mobile) {
      gap: 1rem;
      width: 100%;
      max-width: 280px;
    }
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (max-width: $breakpoint-mobile) {
  .main-menu {
    padding: 1rem;
    justify-content: space-evenly;
  }
}
</style>

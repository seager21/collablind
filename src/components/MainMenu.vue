<template>
  <main class="main-menu" role="main" id="main-content" aria-label="Main menu">
    <h1 tabindex="0">Welcome to CollaBlind</h1>
    <button @click="$emit('start-game')" aria-label="Start New Game" tabindex="0">
      Start New Game
    </button>
    <button @click="$emit('view-scoreboard')" aria-label="Check Scoreboard" tabindex="0">
      Check Scoreboard
    </button>
  </main>
</template>

<script setup lang="ts">
defineEmits(['start-game', 'view-scoreboard'])
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/vaporwave.gif') center/cover no-repeat;
  color: $color-text-invert;
  text-align: center;

  h1 {
    font-size: $font-size-large;
    margin-bottom: 20px;
    color: $color-text;
  }

  button {
    margin: 10px 0;
    padding: 10px 20px;
    font-size: $font-size-button;
    color: $color-text-invert;
    background: $color-accent;
    border: none;
    cursor: pointer;
    transition: $transition-normal;
  }

  button:hover {
    background: $color-accent-hover;
  }
}
@media (max-width: $breakpoint-mobile) {
  .main-menu {
    height: 100vh;
    padding: 0 2vw;
  }
  .main-menu h1 {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  .main-menu button {
    font-size: $font-size-button-mobile;
    padding: 8px 12px;
    margin: 6px 0;
  }
}
</style>

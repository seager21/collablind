<template>
  <div class="main-menu">
    <h1>Welcome to CollaBlind</h1>
    <button @click="$emit('start-game')">Start New Game</button>
    <button @click="$emit('view-scoreboard')">Check Scoreboard</button>
  </div>
</template>

<script setup lang="ts">
defineEmits(['start-game', 'view-scoreboard'])
</script>

<style scoped lang="scss">
.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url('/vaporwave.gif') center/cover no-repeat;
  color: white;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  button {
    margin: 10px 0;
    padding: 10px 20px;
    font-size: 1.2rem;
    color: white;
    background: #ff00ff;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover {
    background: #ff77ff;
  }
}
</style>

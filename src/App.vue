<script setup lang="ts">
import { ref } from "vue";
import GameGrid from "./components/GameGrid.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import RestartButton from "./components/RestartButton.vue";
import GameHeader from "./components/GameHeader.vue";
import GameFooter from "./components/GameFooter.vue";

const score = ref(0);
const attempts = ref(3);
const streak = ref(0);
const guesses = ref(0);
const gridSize = ref(2);

const increaseScore =() => {
  score.value += 1;
  streak.value += 1;
  guesses.value += 1;

  // Gain +1 life after 8 correct in a row
  if (streak.value % 8 === 0) {
    attempts.value += 1;
}

  // Increase grid size every 15 guesses (max 10x10)
  if (guesses.value % 15 === 0 && gridSize.value < 10) {
    gridSize.value += 1;
  }
};

const decreaseAttempts = () => {
  if (attempts.value > 0) {
    attempts.value -= 1;
    streak.value = 0; // Reset streak on incorrect guess
  }
};

const restartGame = () => {
  score.value = 0;
  attempts.value = 3;
  streak.value = 0;
  guesses.value = 0;
  gridSize.value = 2;
};

</script>

<template>
  <GameHeader />
    <div class ="game-containter">
      <ScoreBoard :score="score" :attempts="attempts" :streak="streak" />
      <GameGrid :gridSize="gridSize" @correct="increaseScore" @wrong="decreaseAttempts" />
      <RestartButton @restart="restartGame" />
    </div>
  <GameFooter />

 
</template>

<style scoped>


.logo {
  display: block;
  margin: 0 auto 2rem;
}
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  background: url('/vaporwave.gif') center/cover no-repeat;
  
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

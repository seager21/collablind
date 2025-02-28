<script setup lang="ts">
import { ref } from "vue";
import GameGrid from "./components/GameGrid.vue";
import ScoreBoard from "./components/ScoreBoard.vue";
import RestartButton from "./components/RestartButton.vue";
import GameHeader from "./components/GameHeader.vue";
import GameFooter from "./components/GameFooter.vue";

const score = ref(0);
const attempts = ref(3);
//const streak = ref(0);
//const guesses = ref(0);
const gridSize = ref(2);

const increaseScore =() => score.value +=1;
const decreaseAttempts = () => {
  if (attempts.value > 0) attempts.value -=1;
};

const restartGame = () => {
  score.value = 0;
  attempts.value = 3;
};

</script>

<template>
  <GameHeader />
    <div class ="game-containter">
      <ScoreBoard :score="score" :attempts="attempts" />
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

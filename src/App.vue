<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import MainMenu from './components/MainMenu.vue'
import GameGrid from './components/GameGrid.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import RestartButton from './components/RestartButton.vue'
import GameHeader from './components/GameHeader.vue'
import GameFooter from './components/GameFooter.vue'

const score = ref(0)
const attempts = ref(3)
const streak = ref(0)
const guesses = ref(0)
const gridSize = ref(2)
const showMainMenu = ref(true)
const showScoreboard = ref(false)

// Timer logic
const timeLeft = ref(15)
const timerActive = ref(false)
let timerInterval: number | null = null

const showGameOver = ref(false)

const startGame = () => {
  showMainMenu.value = false
  showScoreboard.value = false
  showGameOver.value = false
  timeLeft.value = 15
  timerActive.value = true
}

const viewScoreboard = () => {
  showMainMenu.value = false
  showScoreboard.value = true
}

const increaseScore = () => {
  score.value += 1
  streak.value += 1
  guesses.value += 1

  // Gain +1 life after 8 correct in a row
  if (streak.value % 8 === 0) {
    attempts.value += 1
  }

  // Every 5 consecutive correct guesses, add 5 seconds
  if (streak.value > 0 && streak.value % 5 === 0) {
    timeLeft.value += 5
  }

  // Increase grid size every 15 guesses (max 10x10)
  if (guesses.value % 15 === 0 && gridSize.value < 10) {
    gridSize.value += 1
  }
}

const decreaseAttempts = () => {
  if (attempts.value > 0) {
    attempts.value -= 1
    streak.value = 0 // Reset streak on incorrect guess
    if (attempts.value === 0) {
      endGame()
    }
  }
}

const restartGame = () => {
  score.value = 0
  attempts.value = 3
  streak.value = 0
  guesses.value = 0
  gridSize.value = 2
  timeLeft.value = 15
  timerActive.value = false
  showGameOver.value = false
  showMainMenu.value = true
}

function endGame() {
  timerActive.value = false
  showGameOver.value = true
}

// Timer effect
onMounted(() => {
  watch(
    timerActive,
    (active) => {
      if (active) {
        if (timerInterval) clearInterval(timerInterval)
        timerInterval = setInterval(() => {
          if (timerActive.value && timeLeft.value > 0) {
            timeLeft.value--
            if (timeLeft.value === 0) {
              endGame()
            }
          }
        }, 1000) as unknown as number
      } else {
        if (timerInterval) clearInterval(timerInterval)
      }
    },
    { immediate: true },
  )
})
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<template>
  <GameHeader />
  <div class="game-container">
    <MainMenu v-if="showMainMenu" @start-game="startGame" @view-scoreboard="viewScoreboard" />
    <div v-else-if="showScoreboard" class="scoreboard-view">
      <h2>Scoreboard</h2>
      <!-- Add your scoreboard content here -->
      <button @click="showMainMenu = true">Back to Main Menu</button>
    </div>
    <div v-else class="game-content-center">
      <div class="timer" v-if="timerActive">Time Left: {{ timeLeft }}s</div>
      <ScoreBoard :score="score" :attempts="attempts" :streak="streak" />
      <GameGrid
        :gridSize="gridSize"
        @correct="increaseScore"
        @wrong="decreaseAttempts"
        :disabled="showGameOver"
      />
      <RestartButton @restart="restartGame" />
      <GameOverModal v-if="showGameOver" :score="score" @restart="restartGame" />
    </div>
  </div>
  <GameFooter />

  <!-- Modal component import -->
</template>

<style scoped>
.timer {
  font-size: 2rem;
  color: #ff00ff;
  margin-bottom: 1rem;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 2px 8px #000a;
}
.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 120px); /* 60px header + 60px footer */
  margin-top: 60px;
  margin-bottom: 60px;
}

.scoreboard-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.game-content-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

@media (min-width: 1024px) {
  header {
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

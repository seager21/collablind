<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import MainMenu from './components/MainMenu.vue'
import GameGrid from './components/GameGrid.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import RestartButton from './components/RestartButton.vue'
import GameHeader from './components/GameHeader.vue'
import GameFooter from './components/GameFooter.vue'
import GameOverModal from './components/GameOverModal.vue'
import LoadingScreen from './components/LoadingScreen.vue'
const backgrounds = ref<string[]>([])
const showLoading = ref(false)

onMounted(async () => {
  try {
    const res = await fetch('/src/assets/backgrounds.json')
    if (res.ok) {
      backgrounds.value = await res.json()
    }
  } catch {}
})

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
  showLoading.value = true
  // Listen for the custom event from LoadingScreen
  const onLoadingComplete = () => {
    showLoading.value = false
    showMainMenu.value = false
    showScoreboard.value = false
    showGameOver.value = false
    timeLeft.value = 18 // Start with 18 seconds
    timerActive.value = true
    window.removeEventListener('loading-complete', onLoadingComplete)
  }
  window.addEventListener('loading-complete', onLoadingComplete)
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
  <div class="main-bg">
    <template v-if="showLoading">
      <LoadingScreen />
    </template>
    <template v-else>
      <GameHeader />
      <div class="game-container">
        <MainMenu v-if="showMainMenu" @start-game="startGame" @view-scoreboard="viewScoreboard" />
        <div v-else-if="showScoreboard" class="scoreboard-view">
          <h2>Scoreboard</h2>
          <ol class="top-scores" aria-label="Top 10 Scores">
            <li>
              <span class="score-name">BigLarry3000</span><span class="score-sep">:</span
              ><span class="score-value">101</span>
            </li>
            <li>
              <span class="score-name">x_xKillerBee</span><span class="score-sep">:</span
              ><span class="score-value">88</span>
            </li>
            <li>
              <span class="score-name">BlindBandit</span><span class="score-sep">:</span
              ><span class="score-value">87</span>
            </li>
            <li>
              <span class="score-name">CarecaNasPontas</span><span class="score-sep">:</span
              ><span class="score-value">73</span>
            </li>
            <li>
              <span class="score-name">ElonMusk</span><span class="score-sep">:</span
              ><span class="score-value">72</span>
            </li>
            <li>
              <span class="score-name">BombardiroCrocodilo</span><span class="score-sep">:</span
              ><span class="score-value">71</span>
            </li>
            <li>
              <span class="score-name">BigodinFinin</span><span class="score-sep">:</span
              ><span class="score-value">71</span>
            </li>
            <li>
              <span class="score-name">PizzaHutOfficial</span><span class="score-sep">:</span
              ><span class="score-value">71</span>
            </li>
            <li>
              <span class="score-name">MissMatcha</span><span class="score-sep">:</span
              ><span class="score-value">70</span>
            </li>
            <li>
              <span class="score-name">ShadeWizard</span><span class="score-sep">:</span
              ><span class="score-value">68</span>
            </li>
          </ol>
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
      <GameFooter :onNextBg="() => {}" :onPrevBg="() => {}" />
    </template>
  </div>
</template>

<style scoped>
.timer {
  font-size: 2rem;
  color: #ff00ff;
  margin-bottom: 1rem;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 2px 8px #000a;
}
/* Prevent scroll on all devices */
.main-bg {
  background: #fff;
  min-height: 100vh;
  min-width: 100vw;
  width: 100vw;
  height: 100vh;
  overflow: hidden !important;
  position: fixed;
  top: 0;
  left: 0;
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
  overflow-x: hidden;
}

.scoreboard-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.top-scores {
  margin: 1.5rem 0 1.5rem 0;
  padding: 0 1.5rem;
  font-size: 1.05rem;
  color: #ff00ff;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  list-style: decimal inside;
  max-width: 350px;
  width: 100%;
}
.top-scores li {
  margin: 0.3rem 0;
  font-family: 'Press Start 2P', cursive;
  letter-spacing: 1px;
  text-shadow: 0 1px 4px #0002;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
}
.score-name {
  flex: unset;
  text-align: left;
  min-width: unset;
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
}
.score-sep {
  flex: 0 0 auto;
  margin: 0 0.5em;
}
.score-value {
  flex: 0 0 2.5em;
  text-align: right;
  font-weight: bold;
}
@media (max-width: 768px) {
  .top-scores {
    font-size: 0.85rem;
    padding: 0 0.5rem;
    max-width: 98vw;
  }
  .top-scores li {
    gap: 0.3em;
  }
  .score-value {
    font-size: 0.95em;
  }
}

.top-scores {
  margin: 1.5rem 0 1.5rem 0;
  padding: 0 1.5rem;
  font-size: 1.3rem;
  color: #ff00ff;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  list-style: decimal inside;
  max-width: 350px;
  width: 100%;
}
.top-scores li {
  margin: 0.3rem 0;
  font-family: 'Press Start 2P', cursive;
  letter-spacing: 1px;
  text-shadow: 0 1px 4px #0002;
}
@media (max-width: 768px) {
  .top-scores {
    font-size: 1rem;
    padding: 0 0.5rem;
    max-width: 98vw;
  }
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
@media (max-width: 768px) {
  .main-bg {
    min-height: 100dvh;
    min-width: 100vw;
    width: 100vw;
    height: 100dvh;
    overflow: hidden !important;
    position: fixed;
    top: 0;
    left: 0;
  }
  .game-container {
    margin-top: 50px;
    margin-bottom: 50px;
    height: calc(100dvh - 100px);
    padding: 0 4vw;
  }
  .scoreboard-view,
  .game-content-center {
    padding: 0 2vw;
    font-size: 1rem;
  }
  .timer {
    font-size: 1.2rem;
  }
}
</style>

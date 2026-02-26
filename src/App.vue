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
const attemptAnim = ref<{ type: 'plus' | 'minus'; key: number } | null>(null)
let animKey = 0
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
    animKey++
    attemptAnim.value = { type: 'plus', key: animKey }
    setTimeout(() => {
      attemptAnim.value = null
    }, 500)
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
    animKey++
    attemptAnim.value = { type: 'minus', key: animKey }
    setTimeout(() => {
      attemptAnim.value = null
    }, 500)
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
          <h2 class="scoreboard-title">Scoreboard</h2>
          <ol class="top-scores" aria-label="Top 10 Scores">
            <li>
              <span class="score-name">BigLarry3000</span><span class="score-sep">-</span
              ><span class="score-value">101</span>
            </li>
            <li>
              <span class="score-name">x_xKillerBee</span><span class="score-sep">-</span
              ><span class="score-value">88</span>
            </li>
            <li>
              <span class="score-name">BlindBandit</span><span class="score-sep">-</span
              ><span class="score-value">87</span>
            </li>
            <li>
              <span class="score-name">CarecaNasPontas</span><span class="score-sep">-</span
              ><span class="score-value">73</span>
            </li>
            <li>
              <span class="score-name">ElonMusk</span><span class="score-sep">-</span
              ><span class="score-value">72</span>
            </li>
            <li>
              <span class="score-name">BombardiroCrocodilo</span><span class="score-sep">-</span
              ><span class="score-value">71</span>
            </li>
            <li>
              <span class="score-name">BigodinFinin</span><span class="score-sep">-</span
              ><span class="score-value">71</span>
            </li>
            <li>
              <span class="score-name">PizzaHutOfficial</span><span class="score-sep">-</span
              ><span class="score-value">71</span>
            </li>
            <li>
              <span class="score-name">MissMatcha</span><span class="score-sep">-</span
              ><span class="score-value">70</span>
            </li>
            <li>
              <span class="score-name">ShadeWizard</span><span class="score-sep">-</span
              ><span class="score-value">68</span>
            </li>
          </ol>
          <button class="btn-effect" @click="showMainMenu = true">Back to Main Menu</button>
        </div>
        <div v-else class="game-content-center">
          <div class="timer-wrapper">
            <div class="timer" v-if="timerActive" :class="{ 'timer-warning': timeLeft <= 5 }">
              Time Left: <span class="timer-number">{{ timeLeft }}</span
              >s
            </div>
          </div>
          <ScoreBoard :score="score" :attempts="attempts" :streak="streak" />
          <transition name="attempt-float" mode="out-in">
            <div
              v-if="attemptAnim"
              :key="attemptAnim.key"
              :class="['attempt-float', attemptAnim.type === 'plus' ? 'plus' : 'minus']"
              aria-live="polite"
            >
              {{ attemptAnim.type === 'plus' ? '+1' : '-1' }}
            </div>
          </transition>
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

<style scoped lang="scss">
@import './assets/variables.scss';
@import './assets/animations.scss';
.timer-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.timer {
  font-size: 2rem;
  color: #ff00ff;
  margin-bottom: 1rem;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 2px 8px #000a;
  transition: color 0.2s;
}
.timer-warning {
  color: #ff2222 !important;
  animation: timer-pulse 0.5s infinite alternate;
}
@keyframes timer-pulse {
  0% {
    filter: brightness(1);
  }
  100% {
    filter: brightness(1.5);
  }
}
.timer-number {
  font-weight: bold;
}
.attempt-float {
  position: absolute;
  left: 50%;
  top: 4.5em;
  transform: translateX(-50%);
  font-size: 2.2rem;
  font-family: 'Press Start 2P', cursive;
  font-weight: bold;
  pointer-events: none;
  opacity: 1;
  z-index: 10;
}
.attempt-float.plus {
  color: #00ffb3;
  text-shadow: 0 2px 8px #0ff8;
}
.attempt-float.minus {
  color: #800020;
  text-shadow: 0 2px 8px #80002088;
}
.attempt-float.attempt-float-leave-active,
.attempt-float.attempt-float-enter-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}
.attempt-float.attempt-float-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
.attempt-float.attempt-float-enter-to {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.attempt-float.attempt-float-leave-from {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.attempt-float.attempt-float-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-30px);
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
  width: 100%;
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

@import './assets/variables.scss';

.top-scores {
  margin: 1.5rem 0 1.5rem 0;
  padding: 0 1.5rem;
  font-size: $font-size-scoreboard-mobile;
  color: $color-accent;
  background: $color-bg-dark;
  border-radius: $radius-large;
  list-style: decimal inside;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 2px 16px #0006;
}
.scoreboard-title {
  color: $color-accent;
  text-align: center;
  margin-bottom: 0.7em;
  font-family: $font-main, $font-fallback;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #000a;
  font-size: $font-size-header;
}
/* Scoreboard grid layout */
/* Scoreboard grid layout */
.top-scores li {
  margin: 0.3rem 0;
  font-family: $font-main, $font-fallback;
  letter-spacing: 1px;
  text-shadow: 0 1px 4px #0002;
  display: grid;
  grid-template-columns: 1fr auto 3.5em;
  align-items: center;
  gap: 0.2em;
}
.score-name {
  text-align: left;
  overflow: visible;
  text-overflow: unset;
  white-space: normal;
  padding-right: 0.5em;
  font-size: 0.65em;
  color: $color-text;
}
.score-sep {
  text-align: center;
  margin: 0 0.2em;
  color: $color-accent-light;
}
.score-value {
  text-align: right;
  font-weight: bold;
  padding-left: 0.5em;
  color: $color-accent;
}
@media (max-width: $breakpoint-mobile) {
  .top-scores {
    font-size: $font-size-scoreboard-mobile;
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
  color: #111;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  list-style: decimal inside;
  max-width: 500px;
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

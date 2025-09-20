<template>
  <div class="loading-screen" role="status" aria-live="polite">
    <GifBanner :gifs="gifs" style="margin-bottom: 1.5rem" />
    <div class="loading-text" tabindex="0">{{ funnyText }}</div>
    <div
      class="loading-bar-outer"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Loading progress"
    >
      <div class="loading-bar-inner" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import GifBanner from './GifBanner.vue'
import backgrounds from '../assets/backgrounds.json'

const gifs = Array.isArray(backgrounds) ? backgrounds : ['/vaporwave.gif']

const funnyMessages = [
  'Entering into NASA database...',
  "Decrypting your best friend's private files...",
  'Hacking the mainframe...',
  'Reticulating splines...',
  'Contacting Area 51...',
  'Stealing cookies from the cookie jar...',
  'Bypassing the firewall...',
  'Summoning the color gods...',
  'Loading the secret sauce...',
  'Subscribing to @kellyshannaya on YouTube...',
  'Sending frog pictures to your crush...',
  'Booking a flight to Angola...',
  'Using motherlode cheat code in real life...',
  'Checking if you left the bathroom light on...',
  'Reviewing your life choices...',
  'Calculating the meaning of life...',
  'Waiting for the WiFi to connect...',
  'Trying to remember where you left your keys...',
  'Searching for the perfect toilet paper...',
  'Donating your whole bank account money to the creator of this game...',
  'Resetting ALL of your passwords...',
  'Erasing your browser history...',
]

const funnyText = ref(funnyMessages[Math.floor(Math.random() * funnyMessages.length)])
const percent = ref(0)
const loadingDone = ref(false)

onMounted(() => {
  percent.value = 0
  let msgIdx = Math.floor(Math.random() * funnyMessages.length)
  funnyText.value = funnyMessages[msgIdx]
  // Loading bar: total duration between 6-11s
  const totalDuration = 6000 + Math.random() * 5000 // ms
  const start = Date.now()
  // Message interval
  const msgInterval = setInterval(() => {
    let newIdx
    do {
      newIdx = Math.floor(Math.random() * funnyMessages.length)
    } while (newIdx === msgIdx && funnyMessages.length > 1)
    msgIdx = newIdx
    funnyText.value = funnyMessages[msgIdx]
  }, 2500)

  // Progress bar interval
  const progressInterval = setInterval(() => {
    const elapsed = Date.now() - start
    const pct = Math.min(100, (elapsed / totalDuration) * 100)
    percent.value = pct
    if (pct >= 100) {
      percent.value = 100
      clearInterval(progressInterval)
      clearInterval(msgInterval)
      loadingDone.value = true
      funnyText.value = 'Loading Complete!'
      setTimeout(() => {
        if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
          window.dispatchEvent(new CustomEvent('loading-complete'))
        }
      }, 1500)
    }
  }, 100)
})
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.loading-screen {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #1a0033 0%,
    #330066 25%,
    #4d0099 50%,
    #330066 75%,
    #1a0033 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 8s ease-in-out infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba($color-button-primary, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba($color-button-secondary, 0.1) 0%, transparent 50%);
    animation: floatingOrbs 10s ease-in-out infinite;
  }
}

.loading-text {
  font-size: 1.4rem;
  color: $color-button-primary;
  margin-bottom: 2.5rem;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  max-width: 90vw;
  text-shadow:
    0 0 10px rgba($color-button-primary, 0.6),
    0 0 20px rgba($color-button-primary, 0.4),
    0 0 30px rgba($color-button-primary, 0.2);
  animation: textPulse 2s ease-in-out infinite;
  position: relative;
  z-index: 2;
  line-height: 1.4;
  padding: 0 1rem;
}

.loading-bar-outer {
  width: 400px;
  max-width: 85vw;
  height: 24px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid $color-button-primary;
  box-shadow:
    0 0 20px rgba($color-button-primary, 0.4),
    inset 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: barShimmer 2s ease-in-out infinite;
  }
}

.loading-bar-inner {
  height: 100%;
  background: linear-gradient(
    90deg,
    $color-button-primary 0%,
    $color-button-secondary 50%,
    $color-button-primary 100%
  );
  background-size: 200% 100%;
  width: 0%;
  transition: width 0.3s ease;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba($color-button-primary, 0.6);
  animation: progressGlow 2s ease-in-out infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 50%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 5px;
  }
}

@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes floatingOrbs {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-10px) rotate(180deg);
  }
  75% {
    transform: translateY(-30px) rotate(270deg);
  }
}

@keyframes textPulse {
  0%,
  100% {
    text-shadow:
      0 0 10px rgba($color-button-primary, 0.6),
      0 0 20px rgba($color-button-primary, 0.4),
      0 0 30px rgba($color-button-primary, 0.2);
  }
  50% {
    text-shadow:
      0 0 15px rgba($color-button-primary, 0.8),
      0 0 30px rgba($color-button-primary, 0.6),
      0 0 45px rgba($color-button-primary, 0.4);
  }
}

@keyframes barShimmer {
  0%,
  100% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
}

@keyframes progressGlow {
  0%,
  100% {
    background-position: 0% 50%;
    box-shadow: 0 0 15px rgba($color-button-primary, 0.6);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 0 0 25px rgba($color-button-primary, 0.8);
  }
}

@media (max-width: $breakpoint-mobile) {
  .loading-text {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    padding: 0 1.5rem;
  }

  .loading-bar-outer {
    width: 90vw;
    height: 20px;
    border-radius: 10px;
  }

  .loading-bar-inner {
    border-radius: 8px;
  }
}

@media (max-width: $breakpoint-small) {
  .loading-text {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }

  .loading-bar-outer {
    height: 16px;
    border-radius: 8px;
  }

  .loading-bar-inner {
    border-radius: 6px;
  }
}

// Accessibility: Reduce motion for users who prefer it
@media (prefers-reduced-motion: reduce) {
  .loading-screen,
  .loading-screen::before,
  .loading-text,
  .loading-bar-outer::before,
  .loading-bar-inner {
    animation: none;
  }

  .loading-text {
    text-shadow: 0 0 10px rgba($color-button-primary, 0.6);
  }

  .loading-bar-inner {
    box-shadow: 0 0 15px rgba($color-button-primary, 0.6);
  }
}
</style>

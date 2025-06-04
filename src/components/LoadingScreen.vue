<template>
  <div class="loading-screen">
    <div class="loading-text">{{ funnyText }}</div>
    <div class="loading-bar-outer">
      <div class="loading-bar-inner" :style="{ width: percent + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
]

const funnyText = ref(funnyMessages[Math.floor(Math.random() * funnyMessages.length)])
const percent = ref(0)
const loadingDone = ref(false)

onMounted(() => {
  percent.value = 0
  let msgIdx = Math.floor(Math.random() * funnyMessages.length)
  funnyText.value = funnyMessages[msgIdx]
  // Loading bar: total duration between 8-13s
  const totalDuration = 8000 + Math.random() * 5000 // ms
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
      }, 1000)
    }
  }, 100)
})
</script>

<style scoped>
.loading-screen {
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-text {
  font-size: 1.3rem;
  color: #ff00ff;
  margin-bottom: 2rem;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  max-width: 90vw;
}
.loading-bar-outer {
  width: 320px;
  max-width: 80vw;
  height: 18px;
  background: #eee;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid #ff00ff;
}
.loading-bar-inner {
  height: 100%;
  background: linear-gradient(90deg, #ff00ff, #ff77ff);
  width: 0%;
  transition: width 0.3s;
}
@media (max-width: 768px) {
  .loading-text {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
  .loading-bar-outer {
    width: 90vw;
    height: 12px;
  }
}
</style>

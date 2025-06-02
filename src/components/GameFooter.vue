<template>
  <footer>
    <div class="footer-bg-controls">
      <span class="bg-label">Background</span>
      <div class="bg-arrows">
        <button class="bg-arrow" @click="onPrevBg" aria-label="Previous background">&#8592;</button>
        <button class="bg-arrow" @click="onNextBg" aria-label="Next background">&#8594;</button>
      </div>
    </div>
    <div class="footer-right">
      <p class="footer-follow">Follow & Subscribe</p>
      <div class="social-links">
        <a href="https://x.com/thekarpaoff" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com/the.karpa" target="_blank"
          ><i class="fab fa-instagram"></i
        ></a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps<{ onNextBg: () => void; onPrevBg: () => void }>()
const { onNextBg, onPrevBg } = props
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 100px;
  padding: 0 1rem;
}

.footer-bg-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2px;
}
.bg-arrows {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
}
.footer-follow {
  margin: 0 0 2px 0;
  font-size: 1.1rem;
  text-align: right;
}

.bg-arrow {
  background: none;
  border: none;
  color: #ff00ff;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 0.5rem;
  transition: color 0.2s;
  height: 100%;
}
.bg-arrow:hover {
  color: #ff77ff;
}

.social-links {
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.social-links a {
  color: #ff00ff;
  font-size: 1.5rem;
  transition: 0.3s;
}
.social-links a:hover {
  color: #ff77ff;
}

.bg-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
}
.bg-label {
  font-size: 0.85rem;
  color: #ff00ff;
  margin-bottom: 0px;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  footer {
    font-size: 0.9rem;
    padding: 0 0.5rem;
    height: 120px;
  }
  .footer-bg-controls {
    margin-bottom: 0.2rem;
  }
  .bg-arrow {
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }
  .footer-follow {
    font-size: 0.95rem;
  }
  .social-links a {
    font-size: 1.1rem;
    margin: 0 5px;
  }
  .bg-label {
    font-size: 1rem;
  }
}
</style>

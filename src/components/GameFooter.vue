<template>
  <footer>
    <span class="footer-center">
      <p>Follow & Subscribe</p>
      <div class="social-links">
        <a href="https://x.com/thekarpaoff" target="_blank"><i class="fab fa-twitter"></i></a>
        <a href="https://instagram.com/the.karpa" target="_blank"
          ><i class="fab fa-instagram"></i
        ></a>
      </div>
    </span>
    <button class="bg-arrow" @click="onPrevBg" aria-label="Previous background">&#8592;</button>
    <button class="bg-arrow" @click="onNextBg" aria-label="Next background">&#8594;</button>
  </footer>
</template>

<script setup lang="ts">
const props = defineProps<{ onNextBg: () => void; onPrevBg: () => void }>()
const { onNextBg, onPrevBg } = props
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $color-bg-overlay;
  color: $color-text-invert;
  font-size: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $z-header;
  height: 60px;
  padding: 0 1rem;
}

.footer-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    padding-top: 2vw;
  }
}

.bg-arrow {
  background: none;
  border: none;
  color: $color-accent;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 1rem;
  transition: color 0.2s;
  height: 100%;
}
.bg-arrow:hover {
  color: $color-accent-hover;
}

.social-links {
  margin-top: 5px;

  a {
    color: $color-accent;
    margin: 0 10px;
    font-size: 1.5rem;
    transition: 0.3s;

    &:hover {
      color: $color-accent-hover;
    }
  }
}
@media (max-width: $breakpoint-mobile) {
  footer {
    font-size: 0.9rem;
    height: 90px;
    padding: 0 0.5rem;
  }
  .bg-arrow {
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }
  .footer-center p {
    padding-top: 0vw;
    font-size: 0.95rem;
  }
  .social-links a {
    font-size: 1.1rem;
    margin: 0 5px;
  }
}
</style>

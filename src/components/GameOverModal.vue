<template>
  <div class="modal-overlay" role="dialog" aria-modal="true" aria-label="Game Over">
    <div class="modal-content">
      <h2 tabindex="0">Game Over!</h2>
      <p><span aria-label="Your Score">Your Score:</span> {{ score }}</p>
      <button @click="$emit('restart')" aria-label="Back to Main Menu" tabindex="0">
        Back to Main Menu
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ score: number }>()
defineEmits(['restart'])
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $color-bg-overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: $z-modal;
}
.modal-content {
  background: #222;
  color: $color-text-invert;
  padding: 2rem 3rem;
  border-radius: $radius-modal;
  text-align: center;
  box-shadow: 0 4px 32px #000a;
}
button {
  margin-top: 1.5rem;
  padding: 10px 24px;
  font-size: 1.2rem;
  background: $color-accent;
  color: $color-text-invert;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background $transition-fast;
}
button:hover {
  background: $color-accent-hover;
}

@media (max-width: $breakpoint-mobile) {
  .modal-content {
    padding: 1rem 0.5rem;
    font-size: 1rem;
    width: 90vw;
    min-width: unset;
  }
  h2 {
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
  }
  button {
    font-size: 1rem;
    padding: 8px 16px;
  }
}
</style>

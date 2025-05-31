<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2>Game Over!</h2>
      <p>Your Score: {{ score }}</p>
      <button @click="$emit('restart')">Back to Main Menu</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ score: number }>()
defineEmits(['restart'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-content {
  background: #222;
  color: #fff;
  padding: 2rem 3rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 32px #000a;
}
button {
  margin-top: 1.5rem;
  padding: 10px 24px;
  font-size: 1.2rem;
  background: #ff00ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #ff77ff;
}
</style>
@media (max-width: 768px) { .modal-content { padding: 1rem 0.5rem; font-size: 1rem; width: 90vw;
min-width: unset; } h2 { font-size: 1.2rem; } p { font-size: 1rem; } button { font-size: 1rem;
padding: 8px 16px; } }

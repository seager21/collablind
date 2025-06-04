<template>
  <button @click="$emit('restart')">Restart Game</button>
</template>

<script setup lang="ts">
defineEmits(['restart'])
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  color: $color-text-invert;
  background: $color-accent;
  border: none;
  cursor: pointer;
  transition: $transition-normal;
}

button:hover {
  background: $color-accent-hover;
}

@media (max-width: $breakpoint-mobile) {
  button {
    font-size: 0.95rem;
    padding: 8px 12px;
    margin-top: 12px;
  }
}
</style>

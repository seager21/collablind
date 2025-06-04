<template>
  <div class="scoreboard">
    <p>Score: {{ score }} Attempts Left: {{ attempts }}</p>
    <p>Streak: {{ streak }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ score: number; attempts: number; streak: number }>()
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';

.scoreboard {
  font-size: $font-size-scoreboard;
  color: $color-text-invert;
  background: $color-bg-overlay;
  padding: 10px 20px;
  border-radius: $radius-large;
  text-align: center;
}

@media (max-width: $breakpoint-mobile) {
  .scoreboard {
    font-size: $font-size-scoreboard-mobile;
    padding: 6px 8px;
    border-radius: 6px;
  }
}
</style>

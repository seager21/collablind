<template>
  <section class="scoreboard" aria-label="Scoreboard">
    <p>
      <span aria-label="Score">Score:</span> {{ score }}
      <span aria-label="Attempts Left">Attempts Left:</span> {{ attempts }}
    </p>
    <p><span aria-label="Streak">Streak:</span> {{ streak }}</p>
  </section>
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

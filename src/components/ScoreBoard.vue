<template>
  <div class="scoreboard">
    <p>Score: {{ score }} 
    Attempts Left: {{ attempts }}</p>
    <p>Streak: {{ streak }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ score: number; attempts: number; streak: number }>();
</script>

<style scoped lang="scss">
.scoreboard {
  font-size: 1.5rem;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
}
</style>
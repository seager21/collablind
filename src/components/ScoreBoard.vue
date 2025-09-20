<template>
  <section class="scoreboard animate-slideIn" aria-label="Scoreboard">
    <div class="score-row">
      <div class="score-item">
        <span class="score-label" aria-label="Score">Score</span>
        <span class="score-value">{{ score }}</span>
      </div>
      <div class="score-item">
        <span class="score-label" aria-label="Attempts Left">Attempts</span>
        <span class="score-value">{{ attempts }}</span>
      </div>
    </div>
    <div class="streak-row">
      <div class="score-item streak-item">
        <span class="score-label" aria-label="Streak">Streak</span>
        <span class="score-value streak-value">{{ streak }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ score: number; attempts: number; streak: number }>()
</script>

<style scoped lang="scss">
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.scoreboard {
  background: linear-gradient(135deg, 
    rgba($color-bg-overlay, 0.9), 
    rgba($color-bg-overlay, 0.95)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba($color-accent, 0.2);
  border-radius: $radius-large;
  padding: 16px 20px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  animation-delay: 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba($color-accent, 0.3);
  }
}

.score-row, .streak-row {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.streak-row {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba($color-accent, 0.2);
}

.score-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 60px;
}

.streak-item {
  min-width: 80px;
}

.score-label {
  font-size: 0.8rem;
  color: rgba($color-text-invert, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.score-value {
  font-size: 1.4rem;
  color: $color-text-invert;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.streak-value {
  font-size: 1.6rem;
  color: $color-button-primary;
  text-shadow: 0 0 10px rgba($color-button-primary, 0.3);
  animation: pulseGlow 2s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% {
    text-shadow: 0 0 10px rgba($color-button-primary, 0.3);
  }
  50% {
    text-shadow: 0 0 20px rgba($color-button-primary, 0.6),
                 0 0 30px rgba($color-button-primary, 0.3);
  }
}

@media (max-width: $breakpoint-mobile) {
  .scoreboard {
    padding: 12px 16px;
    border-radius: 8px;
  }
  
  .score-row, .streak-row {
    gap: 16px;
  }
  
  .score-item {
    min-width: 50px;
  }
  
  .streak-item {
    min-width: 60px;
  }
  
  .score-label {
    font-size: 0.7rem;
  }
  
  .score-value {
    font-size: 1.2rem;
  }
  
  .streak-value {
    font-size: 1.4rem;
  }
}

@media (max-width: $breakpoint-small) {
  .scoreboard {
    padding: 10px 12px;
  }
  
  .score-row {
    flex-direction: column;
    gap: 8px;
  }
  
  .streak-row {
    margin-top: 8px;
    padding-top: 8px;
  }
  
  .score-item {
    flex-direction: row;
    gap: 8px;
    min-width: auto;
  }
  
  .score-label {
    font-size: 0.65rem;
  }
  
  .score-value {
    font-size: 1rem;
  }
  
  .streak-value {
    font-size: 1.2rem;
  }
}
</style>

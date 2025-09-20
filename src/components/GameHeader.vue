<template>
  <header role="banner" aria-label="Game title" class="game-header animate-slideDown">
    <h1 tabindex="0" class="game-title">
      <span class="title-text">CollaBlind</span>
      <div class="title-glow"></div>
    </h1>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.game-header {
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, 
    rgba($color-bg-overlay, 0.95), 
    rgba($color-bg-overlay, 0.98)
  );
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba($color-accent, 0.2);
  color: $color-text-invert;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-header;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent, 
      rgba($color-button-primary, 0.1), 
      transparent
    );
    animation: shimmer 3s ease-in-out infinite;
    opacity: 0.5;
  }
}

.game-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  z-index: 2;
}

.title-text {
  background: linear-gradient(135deg, 
    $color-button-primary, 
    $color-button-secondary, 
    $color-button-primary
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 3s ease-in-out infinite;
  text-shadow: none;
  position: relative;
  z-index: 3;
}

.title-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, 
    rgba($color-button-primary, 0.2) 0%, 
    transparent 70%
  );
  border-radius: 50%;
  animation: pulseGlow 2s ease-in-out infinite;
  z-index: 1;
}

@keyframes shimmer {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@media (max-width: $breakpoint-mobile) {
  .game-header {
    height: 60px;
  }
  
  .game-title {
    font-size: 1.6rem;
    letter-spacing: 1.5px;
  }
}

@media (max-width: $breakpoint-small) {
  .game-header {
    height: 55px;
  }
  
  .game-title {
    font-size: 1.4rem;
    letter-spacing: 1px;
  }
}

// Accessibility: Reduce motion for users who prefer it
@media (prefers-reduced-motion: reduce) {
  .game-header::before,
  .title-text,
  .title-glow {
    animation: none;
  }
  
  .title-text {
    -webkit-text-fill-color: $color-button-primary;
    background: none;
  }
}
</style>

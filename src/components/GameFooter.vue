<template>
  <footer aria-label="Site footer" class="game-footer animate-slideUp">
    <div class="footer-content">
      <p class="footer-label">Follow & Subscribe</p>
      <nav class="social-links" aria-label="Social media links">
        <a
          href="https://x.com/thekarpaoff"
          target="_blank"
          rel="noopener"
          aria-label="Twitter profile"
          class="social-link"
          @click="playClick"
        >
          <i class="fab fa-twitter" aria-hidden="true"></i>
          <span class="link-glow"></span>
        </a>
        <a
          href="https://instagram.com/the.karpa"
          target="_blank"
          rel="noopener"
          aria-label="Instagram profile"
          class="social-link"
          @click="playClick"
        >
          <i class="fab fa-instagram" aria-hidden="true"></i>
          <span class="link-glow"></span>
        </a>
        <a
          href="https://github.com/seager21/collablind"
          target="_blank"
          rel="noopener"
          aria-label="GitHub repository"
          class="social-link"
          @click="playClick"
        >
          <i class="fab fa-github" aria-hidden="true"></i>
          <span class="link-glow"></span>
        </a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useSound } from '../composables/useSound'

const { playClick } = useSound()
</script>

<style lang="scss" scoped>
@import '../assets/variables.scss';
@import '../assets/animations.scss';

.game-footer {
  width: 100%;
  background: linear-gradient(135deg, rgba($color-bg-overlay, 0.95), rgba($color-bg-overlay, 0.98));
  backdrop-filter: blur(15px);
  border-top: 1px solid rgba($color-accent, 0.2);
  color: $color-text-invert;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $z-header;
  height: 70px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  animation-delay: 0.3s;
}

.footer-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-label {
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  color: rgba($color-text-invert, 0.9);
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.social-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.social-link {
  position: relative;
  color: $color-button-secondary;
  font-size: 1.6rem;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:hover {
    color: $color-button-primary;
    transform: translateY(-2px) scale(1.1);
    box-shadow: 0 4px 15px rgba($color-button-primary, 0.3);
  }

  &:active {
    transform: translateY(0) scale(1.05);
  }

  i {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }
}

.link-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  background: radial-gradient(circle, rgba($color-button-primary, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 1;
}

.social-link:hover .link-glow {
  width: 150%;
  height: 150%;
}

// Specific hover effects for different social platforms
.social-link[href*='twitter']:hover {
  color: #1da1f2;
  box-shadow: 0 4px 15px rgba(29, 161, 242, 0.3);
}

.social-link[href*='instagram']:hover {
  color: #e4405f;
  box-shadow: 0 4px 15px rgba(228, 64, 95, 0.3);
}

.social-link[href*='github']:hover {
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
}

@media (max-width: $breakpoint-mobile) {
  .game-footer {
    height: 60px;
    padding: 0 1rem;
  }

  .footer-label {
    font-size: 1rem;
  }

  .social-links {
    gap: 12px;
  }

  .social-link {
    font-size: 1.4rem;
    padding: 6px;

    &:hover {
      transform: translateY(-1px) scale(1.05);
    }
  }
}

@media (max-width: $breakpoint-small) {
  .game-footer {
    height: 55px;
    padding: 0 0.8rem;
  }

  .footer-label {
    font-size: 0.9rem;
  }

  .social-links {
    gap: 10px;
  }

  .social-link {
    font-size: 1.2rem;
    padding: 4px;
  }
}

// Accessibility: Reduce motion for users who prefer it
@media (prefers-reduced-motion: reduce) {
  .social-link {
    &:hover {
      transform: none;
    }
  }

  .link-glow {
    transition: none;
  }
}
</style>

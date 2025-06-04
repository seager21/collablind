<template>
  <footer aria-label="Site footer">
    <div class="footer-content">
      <p class="footer-label">Follow & Subscribe</p>
      <nav class="social-links" aria-label="Social media links">
        <a
          href="https://x.com/thekarpaoff"
          target="_blank"
          rel="noopener"
          aria-label="Twitter profile"
          ><i class="fab fa-twitter" aria-hidden="true"></i
        ></a>
        <a
          href="https://instagram.com/the.karpa"
          target="_blank"
          rel="noopener"
          aria-label="Instagram profile"
          ><i class="fab fa-instagram" aria-hidden="true"></i
        ></a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '../assets/variables.scss';

footer {
  width: 100%;
  background: $color-bg-overlay;
  color: $color-text-invert;
  font-size: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: $z-header;
  height: 60px;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.footer-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.footer-label {
  margin: 0;
  padding: 0;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: left;
}

.social-links {
  margin-left: auto;
  display: flex;
  align-items: center;

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
  .footer-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .footer-label {
    font-size: 0.95rem;
    text-align: left;
  }
  .social-links {
    margin-left: 0;
    a {
      font-size: 1.1rem;
      margin: 0 5px;
    }
  }
}
</style>

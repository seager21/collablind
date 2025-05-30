<template>
  <footer>
    <p>Follow & Subscribe</p>
    <div class="social-links">
      <a href="https://x.com/thekarpaoff" target="_blank"><i class="fab fa-twitter"></i></a>
      <a href="https://instagram.com/the.karpa" target="_blank"><i class="fab fa-instagram"></i></a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  line-height: 60px;
}

.social-links {
  margin-top: 5px;

  a {
    color: #ff00ff;
    margin: 0 10px;
    font-size: 1.5rem;
    transition: 0.3s;

    &:hover {
      color: #ff77ff;
    }
  }
}
</style>

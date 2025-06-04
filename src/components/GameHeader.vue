<template>
  <header>
    <h1>CollaBlind</h1>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/variables.scss';

header {
  width: 100%;
  text-align: center;
  background: $color-bg-overlay;
  color: $color-text-invert;
  font-size: $font-size-header;
  font-weight: bold;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $z-header;
  height: 60px;
  line-height: 60px;
}
@media (max-width: $breakpoint-mobile) {
  header {
    font-size: $font-size-header-mobile;
    height: 50px;
    line-height: 50px;
  }
  header h1 {
    font-size: 1.2rem;
  }
}
</style>

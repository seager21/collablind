<template>
  <header>
    <h1>CollaBlind</h1>
  </header>
</template>

<style lang="scss" scoped>
header {
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-size: 1.8rem;
  font-weight: bold;
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  height: 60px;
  line-height: 60px;
}
</style>
@media (max-width: 768px) { header { font-size: 1.1rem; height: 50px; line-height: 50px; } header h1
{ font-size: 1.2rem; } }

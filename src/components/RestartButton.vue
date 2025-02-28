<template>
    <button @click="$emit('restart')">Restart Game</button>
  </template>
  
  <script setup lang="ts">
  defineEmits(["restart"]);
  </script>
  
  <style scoped lang="scss">
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background: #ff00ff;
    border: none;
    cursor: pointer;
    transition: 0.3s;
  }
  
  button:hover {
    background: #ff77ff;
  }
  </style>
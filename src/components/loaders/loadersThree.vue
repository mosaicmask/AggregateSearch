<template>
  <div class="load">
    <div class="progress"></div>
    <div class="progress"></div>
    <div class="progress"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .load {
    position: relative;
    width: 0.9em;
    height: 0.9em;
    border-radius: 50%;
    float: left;
  }

  .progress {
    top: 50%;
    left: -80%;
    position: absolute;
    transform: translate(-50%, -50%);
    content: '';
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background: #a5a5a5;
    animation: loading_492 2s ease infinite;
    animation-delay: 1s;
  }

  @keyframes loading_492 {
    0% {
      width: 0%;
      height: 0%;
    }

    50% {
      width: 99%;
      height: 99%;
    }

    100% {
      width: 0%;
      height: 0%;
    }
  }

  .progress:nth-child(2) {
    left: 50%;
    animation-delay: 1.3s;
  }

  .progress:nth-child(3) {
    left: 180%;
    animation-delay: 1.7s;
  }
</style>

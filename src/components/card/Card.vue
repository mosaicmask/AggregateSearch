<template>
  <div class="item-card">
    <div class="card-icon">
      <slot name="icon"></slot>
    </div>
    <div>
      <div class="card-load-extreme-title">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .item-card {
    width: 240px;
    height: 90px;
    background: #ffff;
    box-shadow: 3px 6px 25px rgba(0, 0, 0, 0.102);
    border-radius: 5px;
    padding: 12px 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .card-icon {
      width: 70px;
      height: 70px;
      position: relative;
      border-radius: 50%;
    }

    .card-load-extreme-title {
      width: 120px;
      height: 40px;
      position: relative;
      border-radius: 5px;
    }

    @keyframes load89234 {
      100% {
        background-position: -100% 0;
      }
    }
  }
</style>

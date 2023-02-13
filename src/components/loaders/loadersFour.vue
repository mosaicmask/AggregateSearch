<template>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  ul,
  li {
    position: absolute;
    top: 0;
    left: 0;
  }

  ul {
    width: 100%;
    height: 100%;
    // margin: -200px 0 0 -200px;
    list-style: none;
    animation: breathe 10s infinite ease both;
    margin: 0 auto;
    padding: 0;
  }

  li {
    width: 20px;
    height: 20px;
    margin: -10px 0 0 -10px;
    border-radius: 20px;
    box-shadow: inset 0px 0px 5px rgb(100, 230, 255), 0px 0px 2px rgba(255, 255, 255, 0.5),
      0px 0px 10px rgb(0, 191, 243);
    background: rgb(0, 191, 243);
    opacity: 0.6;
    animation-name: clockwise;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  li:nth-child(even) {
    animation-direction: reverse;
  }

  li:nth-child(3n + 3) {
    animation-duration: 40s;
    opacity: 0.8;
  }

  li:nth-child(4n + 4) {
    animation-duration: 30s;
    opacity: 0.4;
  }

  @for $item from 1 through 40 {
    li:nth-child(#{$item}) {
      animation-delay: -#{$item}s;
    }
  }

  @keyframes breathe {
    0% {
      transform: scale(0.15);
    }
    50% {
      transform: scale(0.27);
    }
    100% {
      transform: scale(0.15);
    }
  }

  @keyframes clockwise {
    0% {
      transform: rotate(0deg) translate(-100px) rotate(0deg);
    }

    100% {
      transform: rotate(360deg) translate(-100px) rotate(-360deg);
    }
  }
</style>

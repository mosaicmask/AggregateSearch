<script setup lang="ts">
  import NavbarHome from './components/NavbarHome.vue'
</script>

<template>
  <NavbarHome></NavbarHome>
  <router-view></router-view>
</template>

<style lang="scss">
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    width: 6px;
    background: rgba(#101f1c, 0.1);
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(#101f1c, 0.5);
    background-clip: padding-box;
    min-height: 28px;
    -webkit-border-radius: 2em;
    -moz-border-radius: 2em;
    border-radius: 2em;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(#101f1c, 1);
  }

  a {
    text-decoration: none;
    color: #000000;
  }

  .icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>

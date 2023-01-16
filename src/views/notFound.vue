<!-- 404 页面 -->
<template>
  <div class="body">
    <Error></Error>
  </div>
</template>

<script setup lang="ts">
  import Error from '../components/error/404.vue'
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none;
  }

  label {
    cursor: pointer;
  }

  a {
    margin: 0;
    padding: 0;
    vertical-align: baseline;
    background: transparent;
    text-decoration: none;
    color: #000;
  }

  input,
  select,
  button,
  textarea {
    margin: 0;
    font-size: 100%;
  }

  html,
  .body {
    height: calc(100vh - 75px);
    overflow: hidden;
  }

  .body {
    padding: 0;
    margin: 0;
    background: #181828;
    font-size: 14px;
    line-height: 1;
    position: relative;
  }
</style>

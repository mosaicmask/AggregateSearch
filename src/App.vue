<script setup lang="ts">
  import NavbarHome from './components/navbar/NavbarHome.vue'
  import { loginStatus } from './stores/loginStateStore'
  import { useRoute, useRouter } from 'vue-router'
  loginStatus.verifyLoginTime()
  const route = useRoute()
  const router = useRouter()
  // 用于处理特定页面跳转不刷新
  watch(
    () => route.fullPath,
    (newVal, oldVal) => {
      if (oldVal == '/register' && newVal == '/landing') {
        router.go(0)
        return
      }
      if (oldVal.indexOf('searchResults') && newVal == '/') {
        router.go(0)
        return
      }
      if (oldVal == '/landing' && newVal == '/') {
        router.go(0)
        return
      }
      if (oldVal == '/personalCenter' && newVal == '/') {
        router.go(0)
        return
      }
    }
  )
</script>

<template>
  <NavbarHome></NavbarHome>
  <Suspense>
    <router-view></router-view>
  </Suspense>
</template>

<style lang="scss">

  *{
    scrollbar-width: thin;
  }

  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    scrollbar-width: thin;
  }

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
</style>

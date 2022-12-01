<template>
  <nav class="navbar-body">
    <div class="git-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-github-fill"></use>
      </svg>
      <a href="https://github.com/mosaicmask">mosaic</a>
    </div>
    <div class="text-box">
      <router-link to="/" class="nav-item">
        <span> 首页 </span>
      </router-link>
      <router-link to="/concerning" class="nav-item">
        <span> 关注 </span>
      </router-link>
      <router-link to="/concern" class="nav-item">
        <span>关于</span>
      </router-link>
      <router-link to="/donation" class="nav-item">
        <span>捐赠</span>
      </router-link>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-androidgengduo"></use>
      </svg>
    </div>
    <div class="button-box">
      <el-button class="login-button" color="#5e4dcd" @click="toPage('landing')">登陆</el-button>
      <el-button class="enroll-button" color="#3d3285" @click="toPage('register')">注册</el-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }
</script>

<style lang="scss" scoped>
  .navbar-body {
    width: 100%;
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0px 0px 8px 6px #413a6d4f;

    .git-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 150px;

      a {
        margin: 0 0 0 5px;
        &:hover {
          color: #5e4dcd;
        }
      }
    }

    .text-box {
      min-width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .nav-item {
        width: 35px;
        height: 20px;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        padding: 15px 0px 10px 0px;
        margin: 0 15px;
        letter-spacing: 1px;

        span {
          display: inline-block;
          margin: 0 auto;
        }
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 4px;
          right: 0;
          width: 0;
          height: 2px;
          background: #5e4dcd;
          transition: all 0.32s ease-out;
        }
        &:hover {
          color: #5e4dcd;
        }
        &:hover:after {
          left: 0;
          width: 100%;
        }
      }

      .router-link-active {
        color: #5e4dcd;
        &:after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #5e4dcd;
          transition: all 0.32s ease-out;
        }
      }
    }
    .button-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 50px 0 0;
      .login-button,
      .enroll-button {
        width: 95px;
        height: 45px;
        color: #fff;
      }
    }
  }
</style>

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
        <span> 关注 </span>
      </router-link>
      <router-link to="/" class="nav-item">
        <span>关于</span>
      </router-link>
      <router-link to="/" class="nav-item">
        <span>捐赠</span>
      </router-link>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-androidgengduo"></use>
      </svg>
    </div>
    <div class="button-box">
      <el-button type="primary">登陆</el-button>
      <el-button type="success">注册</el-button>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
  .navbar-body {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 0px 0px 8px 6px #6666664f;

    .git-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 150px;

      a {
        margin: 0 0 0 5px;
      }
    }

    .text-box {
      min-width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .nav-item {
        // color: #fff;
        font-size: 1.2rem;
        font-weight: 500;
        text-decoration: none;
        position: relative;
        overflow: hidden;
        padding: 15px 0px 10px 0px;
        margin: 0 15px;
        letter-spacing: 1px;
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          bottom: 4px;
          right: 0;
          width: 0;
          height: 2px;
          background: rgb(17, 152, 248);
          transition: all 0.32s ease-out;
        }
        &:hover {
          color: rgb(17, 152, 248);
        }
        &:hover:after {
          left: 0;
          width: 100%;
        }
      }
    }
    .button-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 50px 0 0;
    }
  }
</style>

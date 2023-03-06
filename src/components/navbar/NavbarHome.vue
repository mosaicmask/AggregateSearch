<template>
  <nav :class="['navbar-body', navbarFlg ? 'navbar-body-search' : '']">
    <div class="git-box">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-github-fill"></use>
      </svg>
      <a href="http://www.xz-code.com/" target="_blank">mosaic</a>
    </div>
    <div class="input-box" v-if="navbarFlg">
      <label for="search">
        <input
          class="input"
          type="text"
          v-model="inputVal"
          @keyup.enter.exact="searchData"
          placeholder="Search for something"
          id="search"
        />
        <div class="fancy-bg"></div>
        <div class="search">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
          >
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            ></path>
          </svg>
        </div>
      </label>
    </div>
    <div :class="['text-box', navbarFlg ? 'text-search' : '']">
      <router-link to="/" class="nav-item">
        <span> 首页 </span>
      </router-link>
      <router-link to="/concerning" class="nav-item">
        <span>关于</span>
      </router-link>
      <router-link to="/donation" class="nav-item">
        <span>捐赠</span>
      </router-link>
      <router-link to="/concern" class="nav-item">
        <span> 关注 </span>
      </router-link>
      <el-tooltip effect="dark" content="个人中心" v-if="navbarFlg" placement="bottom-start">
        <svg class="icon icon-nav" @click="toPage('personalCenter')" aria-hidden="true">
          <use xlink:href="#icon-24gf-portraitMaleInfo2"></use>
        </svg>
      </el-tooltip>
      <svg class="icon icon-nav" aria-hidden="true">
        <use xlink:href="#icon-androidgengduo"></use>
      </svg>
    </div>
    <template v-if="!loginStatus.isLogin">
      <div class="button-box" v-if="!navbarFlg">
        <el-button class="login-button" color="#5e4dcd" @click="toPage('landing')">
          登录
        </el-button>
        <el-button class="enroll-button" color="#3d3285" @click="toPage('register')">
          注册
        </el-button>
      </div>
    </template>
    <template v-else>
      <Smiley v-if="!navbarFlg" @click="toPage('personalCenter')"></Smiley>
    </template>
  </nav>
</template>

<script setup lang="ts">
  import { useRouter, useRoute } from 'vue-router'
  import { ref, watch } from 'vue'
  import { loginStatus } from '@/stores/loginStateStore'
  import Smiley from '../smiley/Smiley.vue'
  const router = useRouter()
  const route = useRoute()
  const inputVal = ref('')
  const searchData = async () => {
    if (!inputVal.value) {
      router.go(0)
      return
    }
    // 替换路由参数
    await router.replace({
      name: 'searchResults',
      params: { keyword: inputVal.value }
    })
  }
  // 监听路由
  const navbarFlg = ref(false)
  watch(
    () => route.name,
    (newVal) => {
      if (newVal === 'searchResults') {
        navbarFlg.value = true
        return
      }
      navbarFlg.value = false
    }
  )
  // 页面跳转
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
    background-color: #fff;

    .git-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 150px;
      @media (max-width: 590px) {
        // display: none;
        min-width: 100px;
      }

      a {
        margin: 0 0 0 5px;
        &:hover {
          color: #5e4dcd;
        }
      }
    }

    .input-box {
      --input-text-color: #fff;
      --input-bg-color: #283542;
      --focus-input-bg-color: transparent;
      --text-color: #949faa;
      --active-color: #5e4dcd;
      --width-of-input: 200px;
      --inline-padding-of-input: 1.2em;
      --gap: 0.9rem;
      flex: 1;
      height: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      label {
        width: 100%;
        padding: 0.8em;
        height: 40px;
        padding-inline: var(--inline-padding-of-input);
        display: flex;
        align-items: center;
      }
      .fancy-bg {
        position: absolute;
        width: 100%;
        inset: 0;
        background: var(--input-bg-color);
        border-radius: 30px;
        height: 100%;
        z-index: 1;
        pointer-events: none;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
      }
      .search {
        position: absolute;
        z-index: 2;
      }
      /* styling search-icon */
      .search {
        fill: var(--text-color);
        left: var(--inline-padding-of-input);
      }
      /* svg -- size */
      svg {
        width: 17px;
        display: block;
      }

      /* styling of input */
      .input {
        color: var(--input-text-color);
        width: 100%;
        margin-inline: min(2em, calc(var(--inline-padding-of-input) + var(--gap)));
        background: none;
        border: none;
        z-index: 2;
        &:focus {
          outline: none;
          color: var(--active-color);
        }
        &::placeholder {
          color: var(--text-color);
        }
        /* input background change in focus */
        &:focus ~ .fancy-bg {
          border: 1px solid var(--active-color);
          background: var(--focus-input-bg-color);
        }
        /* search icon color change in focus */
        &:focus ~ .search {
          fill: var(--active-color);
        }
      }
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
        -webkit-transition-delay: 9999s;
      }
    }

    .text-box {
      min-width: 400px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      @media (max-width: 790px) {
        // display: none;
        min-width: 200px;
      }
      @media (max-width: 590px) {
        // display: none;
        min-width: 150px;
      }
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
      @media (max-width: 700px) {
        .nav-item:nth-child(2),
        .nav-item:nth-child(3),
        .nav-item:nth-child(5),
        svg {
          display: none;
        }
      }
      .icon-nav {
        margin: 0 1rem;
        cursor: pointer;
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
    .text-search {
      margin: 0 0 0 3rem;
    }
    .button-box {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 50px 0 0;
      @media (max-width: 600px) {
        padding: 0 20px 0 0;
      }
      .login-button,
      .enroll-button {
        width: 95px;
        height: 45px;
        color: #fff;
        @media (max-width: 600px) {
          width: 55px;
          height: 35px;
        }
      }
    }
  }
  .navbar-body-search {
    justify-content: space-between;
  }
</style>

<template>
  <div class="landing-body">
    <form class="landing-box" @submit.prevent="login">
      <h1>登陆</h1>
      <div class="select-box">
        <span :class="[typeFlg ? '' : 'pick']" @click="checkType(0)">用户名登陆</span>
        <span :class="[typeFlg ? 'pick' : '']" @click="checkType(1)">邮箱登陆</span>
      </div>
      <div class="input-group" v-if="typeFlg">
        <label class="label" for="Email">邮箱</label>
        <input autocomplete="off" type="email" class="input" id="Email" />
      </div>
      <div class="input-group" v-else>
        <label class="label" for="Username">用户名</label>
        <input autocomplete="off" type="text" class="input" id="Username" />
      </div>
      <div class="input-group">
        <label class="label" for="Password">密码</label>
        <input autocomplete="off" type="password" class="input" id="Password" />
      </div>
      <div class="input-group">
        <label class="label" for="Captcha">校验码</label>
        <input autocomplete="off" type="text" class="input" id="Captcha" />
      </div>
      <div class="submit">
        <input class="submit-button" type="submit" />
      </div>
      <div class="text-box">
        <em @click="toPage('register')">遇到问题？</em>
        <span>没有账号？<em @click="toPage('register')">前往注册</em></span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { getJsonData } from '../../http/api/users'
  const router = useRouter()
  const typeFlg = ref(0)

  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }
  const checkType = (type: number) => {
    typeFlg.value = type
  }

  const login = () => {
    getJsonData().then((res) => {
      console.log('res :>> ', res)
    })
  }
</script>

<style lang="scss" scoped>
  .landing-body {
    max-width: 700px;
    height: calc(100vh - 75px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .landing-box {
      // 让元素的长宽包括内边框
      width: 540px;
      height: 720px;
      box-sizing: border-box;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 5px 5px 10px 3px rgba(102, 102, 102, 0.344);
      background-color: #fff;
      h1 {
        text-align: center;
      }
      .select-box {
        width: 350px;
        margin: 0 auto;
        margin-top: 2rem;
        margin-bottom: 1.2rem;
        span {
          font-size: 14px;
          cursor: pointer;
          position: relative;
          display: inline-block;
          height: 25px;
          color: #666;

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
          // &:hover:after {
          //   left: 0;
          //   width: 100%;
          // }
        }
        span:nth-child(2) {
          margin: 0 1rem;
        }
        .pick {
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

      .input-group {
        max-width: 350px;
        margin: 0 auto;
        padding: 0.8rem 0;
        .input {
          box-sizing: border-box;
          min-width: 350px;
          height: 45px;
          background-color: #05060f0a;
          border-radius: 0.5rem;
          padding: 0 1rem;
          border: 2px solid transparent;
          font-size: 1rem;
          transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s, color,
            3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
            background 0.2s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
          &:hover,
          &:focus,
          .input-group:hover .input {
            outline: none;
            border-color: #05060f;
          }
        }

        .label {
          display: block;
          margin-bottom: 0.3rem;
          font-size: 0.9rem;
          font-weight: bold;
          color: #05060f99;
          transition: color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
        }
        &:hover .label,
        .input:focus {
          color: #05060fc2;
        }
      }

      .submit {
        display: flex;
        align-items: center;
        justify-content: center;
        .submit-button {
          width: 200px;
          height: 45px;
          // box-sizing: border-box;
          padding: 1.3em 3em;
          margin: 1rem 0;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          font-weight: 500;
          color: #000;
          background-color: #fff;
          border: none;
          border-radius: 45px;
          box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease 0s;
          cursor: pointer;
          outline: none;
          &:hover {
            background-color: #8e82dc;
            box-shadow: 0px 15px 20px #8e82dc6b;
            color: #fff;
            transform: translateY(-7px);
          }
        }
        &:active {
          transform: translateY(-1px);
        }
      }
      .text-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 10px;
        box-sizing: border-box;
        padding: 0 2rem;
        margin: 1rem 0;
        em {
          color: #8e82dc;
          cursor: pointer;
        }
      }
    }
  }
</style>

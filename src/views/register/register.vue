<template>
  <div class="register-body">
    <form class="register-box" @submit.prevent="register">
      <h1>注册</h1>
      <div class="input-group">
        <label class="label" for="Email">邮箱</label>
        <input autocomplete="off" type="email" class="input" id="Email" />
      </div>
      <div class="input-group">
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
      <div class="cntr">
        <input :checked="chickFlg" type="checkbox" id="cbx" class="hidden-xs-up" />
        <label for="cbx" class="cbx"></label>
        <span>注册即表示您已同意我们的 <em>服务协议</em> 和 <em>隐私政策</em> </span>
      </div>
      <div class="submit">
        <input class="submit-button" type="submit" />
      </div>
      <div class="text-box">
        <em @click="toPage('landing')">遇到问题？</em>
        <span>已有账号？<em @click="toPage('landing')">前往登陆</em></span>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const chickFlg = ref(false)

  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }

  const register = () => {
    console.log('点击了注册按钮！！！')
  }
</script>

<style lang="scss" scoped>
  .register-body {
    max-width: 700px;
    height: calc(100vh - 75px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .register-box {
      // 让元素的长宽包括内边框
      box-sizing: border-box;
      padding: 1rem;
      width: 540px;
      height: 720px;
      border-radius: 10px;
      box-shadow: 5px 5px 10px 3px rgba(102, 102, 102, 0.344);
      background-color: #fff;
      h1 {
        text-align: center;
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
      .cntr {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0.8rem 0;
        span {
          margin: 0 0.3rem;
          font-size: 12px;
          em {
            color: #6871f1;
          }
        }
        .cbx {
          position: relative;
          top: 1px;
          width: 20px;
          height: 20px;
          border: 1px solid #c8ccd4;
          border-radius: 3px;
          // vertical-align: middle;
          transition: background 0.1s ease;
          cursor: pointer;
          display: block;
          &:after {
            content: '';
            position: absolute;
            top: 2px;
            left: 7px;
            width: 4px;
            height: 10px;
            opacity: 0;
            transform: rotate(45deg) scale(0);
            border-right: 2px solid #fff;
            border-bottom: 2px solid #fff;
            transition: all 0.3s ease;
            transition-delay: 0.15s;
          }
        }

        .lbl {
          margin-left: 5px;
          vertical-align: middle;
          cursor: pointer;
        }

        #cbx:checked ~ .cbx {
          border-color: transparent;
          background: #6871f1;
          animation: jelly 0.6s ease;
        }

        #cbx:checked ~ .cbx:after {
          opacity: 1;
          transform: rotate(45deg) scale(1);
        }

        @keyframes jelly {
          from {
            transform: scale(1, 1);
          }

          30% {
            transform: scale(1.25, 0.75);
          }

          40% {
            transform: scale(0.75, 1.25);
          }

          50% {
            transform: scale(1.15, 0.85);
          }

          65% {
            transform: scale(0.95, 1.05);
          }

          75% {
            transform: scale(1.05, 0.95);
          }

          to {
            transform: scale(1, 1);
          }
        }

        .hidden-xs-up {
          display: none !important;
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

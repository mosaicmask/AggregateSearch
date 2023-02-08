<template>
  <div class="landing-body">
    <form class="landing-box" @submit.prevent="login">
      <el-alert
        title="邮箱注册的用户，请记住系统赋予您的初始密码，或者登陆后立即前往修改！"
        type="warning"
        center
        show-icon
        :closable="false"
      />
      <h1>登陆</h1>
      <div class="select-box">
        <span :class="[typeFlg ? '' : 'pick']" @click="checkType(0)">手机登陆</span>
        <span :class="[typeFlg ? 'pick' : '']" @click="checkType(1)">邮箱登陆</span>
      </div>
      <div class="input-group" v-if="typeFlg">
        <label class="label" for="Email">邮箱</label>
        <input
          autocomplete="off"
          v-model="userEmail"
          placeholder="请输入邮箱"
          type="email"
          class="input"
          id="Email"
        />
        <span class="message">
          {{ message.emailTipMessage }}
          <a @click="toPage('register')" v-if="exist">注册</a>
        </span>
      </div>
      <div class="input-group" v-else>
        <label class="label" for="Username">手机号</label>
        <input
          autocomplete="off"
          placeholder="请输入手机号"
          type="text"
          class="input"
          id="Username"
          v-model="userPhone"
        />
        <span class="message">
          {{ message.phoneTipMessage }}
          <a @click="toPage('register')" v-if="exist">注册</a>
        </span>
      </div>
      <div class="input-group" v-if="typeFlg">
        <label class="label" for="Password">密码</label>
        <input
          autocomplete="off"
          placeholder="请输入密码"
          :type="showPSW ? 'text' : 'password'"
          class="input"
          id="Password"
          v-model="userPassword"
        />
        <span class="message">
          {{ message.PasswordTipMessage }}
        </span>
        <svg class="show-or-hide-icon" aria-hidden="true" @click="showPSW = !showPSW">
          <use :xlink:href="showPSW ? '#icon-xianshimima' : '#icon-yincangmima'"></use>
        </svg>
      </div>
      <div class="input-group" v-else>
        <label class="label" for="Captcha">校验码</label>
        <input
          autocomplete="off"
          placeholder="请输入六位校验码"
          type="text"
          class="input"
          id="Captcha"
          v-model="receiptCode"
        />
      </div>
      <div class="submit">
        <input class="submit-button" type="submit" />
      </div>
      <div class="text-box">
        <em @click="toPage('register')">遇到问题？</em>
        <span>没有账号？<em @click="toPage('register')">前往注册</em></span>
      </div>
      <div class="notify-body" v-show="!typeFlg">
        <h3>QAQ该功能正在开发中...</h3>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { refDebounced } from '@vueuse/core'
  import { FormFormatCheck } from '../../utils/Check'
  import { loginStatus } from '../../stores/loginStateStore'
  import { isExist, userLogin } from '../../http/api/users'
  import { messageAlerts } from '@/utils/tip'
  import { signUpData } from '@/stores/signUpStore'

  const router = useRouter()
  const typeFlg = ref(1)
  const exist = ref(false)
  const showPSW = ref(false)
  // 提示文字显示flg
  const message = reactive({
    emailTipMessage: '',
    phoneTipMessage: '',
    PasswordTipMessage: '',
    receiptCodeTipMessage: ''
  })
  // 表单数据
  const userEmail = ref((await signUpData.data.userEmail) || '')
  const userPhone = ref('')
  const userPassword = ref((await signUpData.data.userPassword) || '')
  const receiptCode = ref('')

  const formCheck = new FormFormatCheck()
  // 使用 VueUse 的 refDebounced 实现防抖验证参数
  const emailDebounced = refDebounced(userEmail, 2000)
  watch(emailDebounced, () => {
    if (!formCheck.checkEmail({ userEmail: userEmail.value, message })) return
    checkUser()
  })
  // 验证手机号
  const phoneDebounced = refDebounced(userPhone, 1500)
  watch(phoneDebounced, () => {
    if (!formCheck.checkPhone({ userPhone: userPhone.value, message })) return
    checkUser()
  })
  // 验证回执码
  const receiptCodeDebounced = refDebounced(receiptCode, 1000)
  watch(receiptCodeDebounced, () => {
    formCheck.checkReceiptCode({ receiptCode: receiptCode.value, message })
  })
  // 验证用户是否存在
  const checkUser = async () => {
    const sendData = {
      userEmail: userEmail.value,
      userPhone: userPhone.value
    }
    await isExist(sendData).then((res) => {
      if (res.errno == 1001) {
        message.emailTipMessage = `用户不存在,是否前往`
        message.phoneTipMessage = `用户不存在,是否前往`
        exist.value = true
        return
      }
      message.emailTipMessage = ''
      message.phoneTipMessage = ''
      exist.value = false
    })
  }

  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }
  const checkType = (type: number) => {
    typeFlg.value = type
  }

  const login = async () => {
    const formData = {
      userEmail: userEmail.value,
      userPhone: userPhone.value,
      userPassword: userPassword.value,
      receiptCode: receiptCode.value
    }
    await userLogin(formData).then((res) => {
      const { title, message, type, data } = res
      messageAlerts({
        title,
        message,
        type
      })
      // 登陆成功
      if (res.errno == 2001) {
        // 清除用户注册信息
        signUpData.removeSignUpData()
        // 存储用户登陆状态
        loginStatus.setLoginTime(data)
        setTimeout(() => {
          toPage('home')
        }, 3000)
      }
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
      min-height: 520px;
      box-sizing: border-box;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 5px 5px 10px 3px rgba(102, 102, 102, 0.344);
      background-color: #fff;
      position: relative;
      .el-alert {
        margin: 20px 0 0;
        :deep(.el-alert__content) {
          .el-alert__title {
            display: flex;
            align-items: center;
          }
        }
      }
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
        min-height: 85px;
        margin: 0 auto;
        padding: 0.8rem 0;
        position: relative;
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
        .input::-webkit-input-placeholder {
          font-size: 12px;
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
        .show-or-hide-icon {
          width: 1.5rem;
          height: 1.5rem;
          position: absolute;
          right: 15px;
          top: 45px;
        }
      }
      .message {
        font-size: 10px;
        color: red;
        a {
          color: #28a1f7;
          &:hover {
            color: #28a1f7b9;
          }
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
      .notify-body {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 185px;
        left: 0;
        width: 540px;
        height: 380px;
        border-radius: 0 0 10px 10px;
        /* 主要内容 */
        background: rgba(255, 255, 255, 0.096);
        /* 模糊大小就是靠的blur这个函数中的数值大小 */
        backdrop-filter: blur(10px);
      }
    }
  }
</style>

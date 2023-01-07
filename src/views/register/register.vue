<template>
  <div class="register-body">
    <form class="register-box" @submit.prevent="toRegister">
      <h1>注册</h1>
      <div class="select-box">
        <span :class="[typeFlg ? '' : 'pick']" @click="checkType(0)">手机号注册</span>
        <span :class="[typeFlg ? 'pick' : '']" @click="checkType(1)">邮箱注册</span>
      </div>
      <div class="input-group" v-if="typeFlg">
        <label class="label" for="Email">邮箱</label>
        <input autocomplete="off" v-model="userEmail" type="email" class="input" id="Email" />
        <span class="message">
          {{ message.emailTipMessage }}
          <a @click="toPage('landing')" v-if="showLoginText">登陆</a>
        </span>
      </div>
      <div class="input-group" v-else>
        <label class="label" for="Email">手机号</label>
        <input autocomplete="off" v-model="userPhone" type="email" class="input" id="Email" />
        <span class="message">
          {{ message.phoneTipMessage }}
          <a @click="toPage('landing')" v-if="showLoginText">登陆</a>
        </span>
      </div>
      <div class="input-group">
        <label class="label" for="Password">密码</label>
        <input
          autocomplete="off"
          v-model="userPassword"
          type="password"
          class="input"
          id="PasswordOne"
        />
        <span class="message">
          {{ message.PasswordTipMessage }}
        </span>
      </div>
      <div class="input-group">
        <label class="label" for="Password">再次输入密码</label>
        <input
          autocomplete="off"
          v-model="scendPassword"
          type="password"
          class="input"
          id="PasswordTwo"
        />
        <span class="message">
          {{ message.scendPasswordTipMessage }}
        </span>
      </div>
      <div class="input-group">
        <label class="label" for="Captcha">校验码</label>
        <div class="input-line">
          <input autocomplete="off" v-model="captchaText" type="text" class="input" id="Captcha" />
          <div class="supplement" @click="changeCaptcha()">
            <div v-dompurify-html="captcha.data"></div>
          </div>
          <span class="message">
            {{ message.captchaTextTipMessage }}
          </span>
        </div>
      </div>
      <div class="input-group">
        <label class="label" for="Captcha">{{ typeFlg ? '邮箱' : '手机' }}回执码</label>
        <div class="input-line">
          <input
            autocomplete="off"
            type="text"
            v-model="receiptCode"
            class="input"
            id="receiptCode"
          />
          <div class="supplement">
            <el-button
              class="login-button"
              color="#5e4dcd"
              plain
              :loading="loadingFlg"
              @click="getReceiptCode"
            >
              {{ buttonText }}
            </el-button>
          </div>
        </div>
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
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { refDebounced } from '@vueuse/core'
  import { emailRegex, phoneNoRegex } from '../../utils/regex'
  // import { v4 as uuidV4 } from 'uuid'
  import { getCaptcha, getEmailCode, register, isExist } from '../../http/api/users'
  const router = useRouter()
  // 隐私政策状态
  const chickFlg = ref(false)
  //  注册类型的标签切换状态
  const typeFlg = ref(1)
  // 登陆文字显示状态
  const showLoginText = ref(false)
  // 切换按钮状态
  const loadingFlg = ref(false)
  const buttonText = ref('获取回执码')
  // 提示文字显示flg
  const message = reactive({
    emailTipMessage: '',
    phoneTipMessage: '',
    PasswordTipMessage: '',
    scendPasswordTipMessage: '',
    captchaTextTipMessage: ''
  })
  // 表单数据
  const userEmail = ref('')
  const userPhone = ref('')
  const userPassword = ref('')
  const scendPassword = ref('')
  const captchaText = ref('')
  const receiptCode = ref('')
  // 状态数据
  const exist = ref(true)
  // 使用 VueUse 的 refDebounced 实现防抖更改参数
  const emailDebounced = refDebounced(userEmail, 2000)
  watch(emailDebounced, (newVal) => {
    if (!emailRegex.test(newVal)) {
      message.emailTipMessage = '请输入正确的邮箱'
      return
    }
    checkUser()
  })
  const phoneDebounced = refDebounced(userPhone, 1500)
  watch(phoneDebounced, (newVal) => {
    if (!phoneNoRegex.test(newVal)) {
      message.phoneTipMessage = '请输入正确的手机号'
      return
    }
    checkUser()
  })
  // 验证用户是否存在
  const checkUser = () => {
    const sendData = {
      userEmail: userEmail.value,
      userPhone: userPhone.value
    }
    isExist(sendData).then((res) => {
      console.log('res :>> ', res)
      if (res.errno != 1001) {
        message.emailTipMessage = `用户已存在,是否前往`
        message.phoneTipMessage = `用户已存在,是否前往`
        showLoginText.value = true
        return
      }
      message.emailTipMessage = ''
      message.phoneTipMessage = ''
      showLoginText.value = false
      exist.value = false
    })
  }
  // const uuid = uuidV4()
  const captcha = ref(await getCaptcha())
  // 修改验证码 这里可以添加一个防抖
  const changeCaptcha = async () => {
    captcha.value = await getCaptcha()
  }
  //  获取回执
  const getReceiptCode = () => {
    let countdown = 60
    if (typeFlg.value && !exist.value) {
      loadingFlg.value = true
      setTime(countdown)
      // 邮箱回执
      getEmailCode(userEmail.value).then((res) => {
        console.log('res :>> ', res)
      })
    } else {
      // 手机回执
    }
    // if ( captchaText !== captcha.value.text) {
    //   console.log('请检查验证码是否输入正确！')
    //   return
    // }
  }
  // 回执倒计时函数
  const setTime = (countdown) => {
    if (countdown == 0) {
      buttonText.value = '获取回执码'
      loadingFlg.value = false
    } else {
      buttonText.value = `${countdown}秒后重发`
      --countdown
      setTimeout(() => {
        setTime(countdown)
      }, 1000)
    }
  }

  // 注册按钮点击事件
  const toRegister = () => {
    console.log('点击了注册按钮！！！')

    const formData = {
      userEmail: userEmail.value,
      userPhone: userPhone.value,
      userPassword: userPassword.value,
      receiptCode: receiptCode.value
    }
    register(formData).then((res) => {
      console.log('res :>> ', res)
    })
  }

  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }
  const checkType = (type: number) => {
    typeFlg.value = type
    changeCaptcha()
  }
</script>

<style lang="scss" scoped>
  .register-body {
    max-width: 900px;
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
      height: auto;
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
        min-height: 85px;
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
        .input-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .input {
            min-width: 230px;
            height: 45px;
          }
          .supplement {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 45px;
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

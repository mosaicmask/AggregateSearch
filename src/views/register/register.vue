<template>
  <div class="register-body">
    <form class="register-box" @submit.prevent="toRegister">
      <h1>注册</h1>
      <div class="select-box">
        <span @click="toPage('landing')">手机号注册</span>
        <span class="pick">邮箱注册</span>
      </div>
      <div class="input-group">
        <label class="label" for="Email">邮箱</label>
        <input
          autocomplete="off"
          placeholder="请输入邮箱"
          v-model="userEmail"
          type="email"
          class="input"
          id="Email"
        />
        <span class="message">
          {{ message.emailTipMessage }}
          <a @click="toPage('landing')" v-if="showLoginText">登陆</a>
        </span>
      </div>
      <div class="input-group">
        <label class="label" for="Captcha">校验码</label>
        <div class="input-line">
          <input
            autocomplete="off"
            placeholder="请输入右侧图形校验码"
            v-model="captchaText"
            type="text"
            class="input"
            id="Captcha"
          />
          <div class="supplement" v-if="captcha.data">
            <div @click="changeCaptcha()" v-dompurify-html="captcha.data" class="captcha-svg"></div>
            <span> 点击图片换一张 </span>
          </div>
          <div class="supplement-error" v-else @click="changeCaptcha()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shuaxin"></use>
            </svg>
            <span> 获取验证码 </span>
          </div>
        </div>
        <span class="message">
          {{ message.captchaTextTipMessage }}
        </span>
      </div>
      <div class="input-group">
        <label class="label" for="Captcha">邮箱回执码</label>
        <div class="input-line">
          <input
            autocomplete="off"
            placeholder="请输入邮箱回执码"
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
        <span class="message">
          {{ message.receiptCodeTipMessage }}
        </span>
      </div>
      <div class="cntr">
        <input v-model="checkFlg" type="checkbox" id="cbx" class="hidden-xs-up" />
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
  import { isExist } from '../../http/api/users'
  import { messageAlerts } from '../../utils/tip'
  import { v4 as uuidV4 } from 'uuid'
  import { getCaptcha, getEmailCode, register } from '../../http/api/users'
  import { FormFormatCheck } from '../../utils/Check'
  import { signUpData } from '../../stores/signUpStore'
  const router = useRouter()
  // 隐私政策状态
  const checkFlg = ref(false)
  // 登陆文字显示状态
  const showLoginText = ref(false)
  // 切换按钮状态
  const loadingFlg = ref(false)
  const buttonText = ref('获取回执码')
  // 用户是否已存在
  const exist = ref(false)
  // 提示文字显示flg
  const message = reactive({
    emailTipMessage: '',
    phoneTipMessage: '',
    captchaTextTipMessage: '',
    receiptCodeTipMessage: ''
  })
  // 表单数据
  const userEmail = ref('')
  const userPhone = ref('')
  const captchaText = ref('')
  const receiptCode = ref('')

  const formCheck = new FormFormatCheck()
  // 使用 VueUse 的 refDebounced 实现防抖验证参数
  const emailDebounced = refDebounced(userEmail, 1500)
  watch(emailDebounced, () => {
    formCheck.checkEmail({ userEmail: userEmail.value, message }) ? checkUser() : ''
  })
  // 验证手机号
  const phoneDebounced = refDebounced(userPhone, 1500)
  watch(phoneDebounced, () => {
    formCheck.checkPhone({ userPhone: userPhone.value, message }) ? checkUser() : ''
  })
  // 验证校验码
  const captchaDebounced = refDebounced(captchaText, 1000)
  watch(captchaDebounced, () => {
    formCheck.checkCaptcha({ captchaText: captchaText.value, message, captcha })
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
      if (res.errno != 1001) {
        message.emailTipMessage = `用户已存在,是否前往`
        message.phoneTipMessage = `用户已存在,是否前往`
        showLoginText.value = true
        exist.value = true
        return
      }
      message.emailTipMessage = ''
      message.phoneTipMessage = ''
      showLoginText.value = false
      exist.value = false
    })
  }

  const captcha = reactive({
    data: '',
    text: ''
  })
  // 修改验证码 这里可以添加一个防抖
  const changeCaptcha = async () => {
    const res = await getCaptcha()
    if (!res) {
      messageAlerts({
        title: '服务器错误',
        message: '获取图形校验码失败！',
        type: 'error'
      })
      return
    }
    captcha.data = res.data
    captcha.text = res.text
  }

  //  获取回执
  const getReceiptCode = () => {
    let countdown = 60
    const check =
      formCheck.checkCaptcha({
        captchaText: captchaText.value,
        message,
        captcha
      }) &&
      formCheck.checkEmail({
        userEmail: userEmail.value,
        message
      })
    if (!check) return
    if (exist.value) {
      messageAlerts({
        title: '用户已存在',
        message: '该用户已存在，请直接前往登陆',
        type: 'warning'
      })
      return
    }
    loadingFlg.value = true
    setTime(countdown)
    // 邮箱回执
    getEmailCode(userEmail.value).then((res) => {
      console.log('res :>> ', res)
    })
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
  const toRegister = async () => {
    // 构建数据
    const formData = {
      userEmail: userEmail.value,
      userPhone: userPhone.value,
      // 随机生成密码
      userPassword: uuidV4().substring(0, 14),
      receiptCode: receiptCode.value
    }
    // 使用邮箱注册
    await signUpWithEmail(formData)
  }

  // 注册时使用邮箱
  const signUpWithEmail = async (formData) => {
    // 注册前进行所有验证
    const check =
      formCheck.checkEmail({
        userEmail: userEmail.value,
        message
      }) &&
      formCheck.checkReceiptCode({
        receiptCode: receiptCode.value,
        message
      })
    // 如果验证不通过，不能进行注册
    if (!check && !exist.value) return
    if (!checkFlg.value) {
      messageAlerts({
        title: '请勾选同意政策',
        message: '需要您同意我们的 服务协议 和 隐私政策',
        type: 'warning'
      })
      return
    }
    // 注册接口
    await register(formData).then((res) => {
      if (res.errno != 2000) {
        return
      }
      setTimeout(() => {
        toPage('landing')
      }, 3000)
      // 存储用户注册的数据
      signUpData.setSignUpData(formData)
      // 注册成功后的逻辑还需要优化
      messageAlerts({
        title: '注册成功',
        message: '3s后自动跳转到登陆页面',
        type: 'success'
      })
    })
  }

  const toPage = (where: string) => {
    router.push({
      name: where
    })
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
      position: relative;
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
        .input::-webkit-input-placeholder {
          font-size: 12px;
          border-color: #6b6b6b;
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
          .supplement,
          .supplement-error {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100px;
            height: 45px;
            // cursor: pointer;
            .captcha-svg {
              margin: 15px 0 0 0;
            }
            span {
              font-size: 12px;
              color: #6871f1;
            }
          }
          .supplement-error {
            flex-direction: row;
            .icon {
              width: 14px;
              height: 14px;
              margin: 0 5px;
            }
            span,
            .icon {
              color: #6871f1;
            }
            &:hover {
              span,
              .icon {
                color: #5e4dcd;
              }
            }
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

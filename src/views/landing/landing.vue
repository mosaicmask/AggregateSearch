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
      <template v-if="typeFlg">
        <emailInput
          ref="RefEmailInput"
          v-model:user-email="userEmail"
          v-model:email-exist="emailExist"
        ></emailInput>
      </template>
      <template v-else>
        <!-- 手机号输入框组件 -->
        <phoneOnInput
          v-model:user-phone="userPhone"
          v-model:phone-exist="phoneExist"
          ref="RefPhoneInput"
        ></phoneOnInput>
      </template>
      <template v-if="typeFlg">
        <passwordInput v-model:user-password="userPassword"></passwordInput>
      </template>
      <template v-else>
        <!-- 进行人机验证 -->
        <verifyInput v-model:captcha-text="captchaText" ref="RefVerifyInput"></verifyInput>
        <!-- 验证码输入框组件 -->
        <checkingInput
          @use-check-captcha="useCheckCaptcha"
          v-model:user-phone="userPhone"
          v-model:receipt-code="receiptCode"
          ref="RefCheckingInput"
        ></checkingInput>
      </template>
      <div class="submit">
        <input class="submit-button" type="submit" :value="typeFlg ? '登陆' : '一键注册登陆'" />
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

  import { loginStatus } from '../../stores/loginStateStore'
  import { userLogin, register } from '../../http/api/users'
  import { messageAlerts } from '@/utils/tip'
  import { signUpData } from '@/stores/signUpStore'
  import emailInput from '../../components/input/emailInput/emailInput.vue'
  import verifyInput from '../../components/input/verifyInput/verifyInput.vue'
  import checkingInput from '../../components/input/checkingInput/checkingInput.vue'
  import phoneOnInput from '../../components/input/phoneOnInput/phoneOnInput.vue'
  import passwordInput from '../../components/input/passwordInput/passwordInput.vue'

  const router = useRouter()
  const typeFlg = ref(0)
  const phoneExist = ref(false)
  const emailExist = ref(false)

  // 表单数据
  const userEmail = ref('')
  const userPhone = ref('')
  const userPassword = ref('')
  const captchaText = ref('')
  // 这里用作手机校验码
  const receiptCode = ref('')
  //子组件实例
  const RefVerifyInput = ref<any>()
  const RefPhoneInput = ref<any>()
  const RefCheckingInput = ref<any>()
  const RefEmailInput = ref<any>()
  // 传递给校验码组件的验证方法 让B组件调用A组件的事件
  const useCheckCaptcha = () => {
    RefVerifyInput.value?.checkCaptcha()
  }

  interface FormData {
    userEmail: string
    userPhone: string
    userPassword: string
    receiptCode: string
  }

  // 手机登陆的表单校验
  const checkPhoneFormData = () => {
    const result =
      RefPhoneInput.value?.checkPhone() &&
      RefVerifyInput.value?.checkCaptcha() &&
      RefCheckingInput.value?.checkReceiptCode()
    return result
  }
  //  登陆按钮点击事件
  const login = async () => {
    const formData = {
      userEmail: userEmail.value,
      userPhone: userPhone.value,
      userPassword: userPassword.value,
      receiptCode: receiptCode.value
    }
    if (typeFlg.value) {
      // 邮箱用户登陆
      // 如果邮箱未注册，直接退出
      if (!emailExist.value) return
      await emailUserLogin(formData)
      return
    }
    // 手机用户登陆
    // 验证手机用户表单
    if (!checkPhoneFormData()) return
    if (!phoneExist.value) {
      //phoneUserExist = false 表示用户不存在，走注册&登陆
      await phoneUserRegister(formData)
      await phoneUserLogin(formData)
      return
    }
    await phoneUserLogin(formData)
    // 直接登陆
  }

  // 手机用户登陆
  const phoneUserLogin = async (formData: FormData) => {
    // 手机用户登陆 缓存中有可能有邮箱信息，删掉
    formData.userEmail = ''
    formData.userPassword = ''

    await userLogin(formData)
      .then((res) => {
        const { title, message, type, data } = res
        messageAlerts({
          title,
          message,
          type
        })
        // 登陆成功
        if (res.errno == 2000) {
          // 清除用户注册信息
          signUpData.removeSignUpData()
          // 存储用户登陆状态
          loginStatus.setLoginTime(data)
          setTimeout(() => {
            toPage('home')
          }, 2000)
        }
      })
      .catch((error) => {
        if (error.response.status == 500) {
          messageAlerts({
            title: '验证码错误',
            message: '请检查手机验证码是否填写错误或已过期',
            type: 'error'
          })
        }
      })
  }

  // 手机用户注册
  const phoneUserRegister = async (formData: FormData) => {
    // 如果手机用户登陆 缓存中有可能有邮箱信息，删掉
    formData.userEmail = ''
    formData.userPassword = ''
    // 注册接口
    await register(formData).then((res) => {
      if (res.errno != 2000) {
        return
      }
    })
  }
  // 邮箱用户登陆
  const emailUserLogin = async (formData: FormData) => {
    await userLogin(formData)
      .then((res) => {
        const { title, message, type, data } = res
        messageAlerts({
          title,
          message,
          type
        })
        // 登陆成功
        if (res.errno == 2000) {
          // 清除用户注册信息
          signUpData.removeSignUpData()
          // 存储用户登陆状态
          loginStatus.setLoginTime(data)
          setTimeout(() => {
            toPage('home')
          }, 2000)
        }
      })
      .catch((error) => {
        console.log('error :>> ', error)
        messageAlerts({
          title: '登陆失败',
          message: '可能是服务器出现错误，请稍后再试',
          type: 'error'
        })
      })
  }

  // 跳转页面
  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }
  const checkType = async (type: number) => {
    typeFlg.value = type
    // 清空数据
    userEmail.value = (await signUpData.data.userEmail) || ''
    userPhone.value = ''
    userPassword.value = (await signUpData.data.userPassword) || ''
    receiptCode.value = ''
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

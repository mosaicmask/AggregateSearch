<template>
  <div class="landing-body">
    <form class="landing-box" @submit.prevent="">
      <h1>重置密码</h1>
      <!-- 邮箱输入框 -->
      <emailInput
        ref="RefEmailInput"
        v-model:user-email="userEmail"
        v-model:email-exist="emailExist"
      ></emailInput>
      <!-- 进行人机验证 -->
      <verifyInput v-model:captcha-text="captchaText" ref="RefVerifyInput"></verifyInput>
      <!-- 邮箱回执码 -->
      <verifyEmailCode
        @use-check-captcha="useCheckCaptcha"
        v-model:user-email="userEmail"
        v-model:receipt-code="receiptCode"
        v-model:email-exist="emailExist"
      ></verifyEmailCode>
      <!-- 密码输入框 -->
      <passwordInput v-model:user-password="userPassword">
        <template #label> 新密码 </template>
      </passwordInput>
      <div class="submit">
        <input class="submit-button" type="submit" @click="resetPassword" value="重置密码" />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { forgotPassword } from '@/http/api/users'
  import { messageAlerts } from '@/utils/tip'

  import emailInput from '@/components/input/emailInput/emailInput.vue'
  import verifyInput from '@/components/input/verifyInput/verifyInput.vue'
  // import verifyEmailCode from '@/components/input/verifyEmailCode/verifyEmailCode.vue'
  import passwordInput from '@/components/input/passwordInput/passwordInput.vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const emailExist = ref(false)
  // 表单数据
  const userEmail = ref('')
  const userPassword = ref('')
  const captchaText = ref('')
  // 这里用作邮箱回执码
  const receiptCode = ref('')
  //子组件实例
  const RefVerifyInput = ref<any>()
  const RefEmailInput = ref<any>()

  const resetPassword = () => {
    const isMankind = RefVerifyInput.value.checkCaptcha()
    // 验证
    if (
      !isMankind ||
      !emailExist.value ||
      !receiptCode.value ||
      !userEmail.value ||
      !userPassword.value
    ) {
      return
    }
    const data = {
      receiptCode: receiptCode.value,
      userEmail: userEmail.value,
      userPassword: userPassword.value
    }
    // 发送接口请求
    forgotPassword(data).then((res) => {
      const { message, title, type, errno } = res

      // 成功之后跳转到首页
      if (errno === 2000) {
        messageAlerts({ message: `即将跳转至登录页`, title, type })
        setTimeout(() => {
          toPage('landing')
        }, 2000)
      } else {
        messageAlerts({ message, title, type })
      }
    })
  }
  // 传递给校验码组件的验证方法 让B组件调用A组件的事件
  const useCheckCaptcha = () => {
    RefVerifyInput.value?.checkCaptcha()
  }
  // 跳转页面
  const toPage = (where: string) => {
    router.push({
      name: where
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
      @media (max-width: 600px) {
        width: 95%;
      }
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
    }
  }
</style>

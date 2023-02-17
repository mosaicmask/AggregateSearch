<template>
  <div class="input-group">
    <label class="label" for="Email">邮箱</label>
    <input
      autocomplete="off"
      v-model="inputVal"
      placeholder="请输入邮箱"
      type="email"
      class="input"
      id="Email"
    />
    <span class="message">
      {{ message.emailTipMessage }}
      <a @click="toPage('register')" v-show="!exist">注册</a>
    </span>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { refDebounced } from '@vueuse/core'
  import { FormFormatCheck } from '@/utils/Check'
  import { isExist } from '@/http/api/users'
  const router = useRouter()
  const exist = ref(true)
  // 提示文字显示flg
  const message = reactive({
    emailTipMessage: ''
  })
  // 表单数据
  const inputVal = ref('')
  // 跳转页面
  const toPage = (where: string) => {
    router.push({
      name: where
    })
  }
  defineProps<{
    userEmail: string
    emailExist: boolean
  }>()
  // 父子双向数据绑定
  const emit = defineEmits(['update:userEmail', 'update:emailExist'])
  const handleChange = (e) => {
    emit('update:userEmail', e)
  }
  // 使用 VueUse 的 refDebounced 实现防抖验证参数
  const formCheck = new FormFormatCheck()
  const emailDebounced = refDebounced(inputVal, 2000)
  watch(emailDebounced, (newVal) => {
    handleChange(newVal)
    exist.value = true
    if (!formCheck.checkEmail({ userEmail: newVal, message })) return
    checkUser()
  })
  // 验证(手机||邮箱)用户是否存在
  const checkUser = async () => {
    const sendData = {
      userEmail: inputVal.value,
      userPhone: ''
    }
    await isExist(sendData).then((res) => {
      if (res.errno == 1001) {
        message.emailTipMessage = `用户不存在,是否前往`
        exist.value = false
        emit('update:emailExist', false)
        return
      }
      message.emailTipMessage = ''
      exist.value = true
      emit('update:emailExist', true)
      return
    })
  }
</script>

<style lang="scss" scoped>
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

    .input[type='password']::-ms-reveal {
      display: none;
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
</style>

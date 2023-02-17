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
  import { ref, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { refDebounced } from '@vueuse/core'
  import { FormFormatCheck } from '@/utils/Check'
  import { isExist } from '@/http/api/users'
  import { signUpData } from '@/stores/signUpStore'
  const router = useRouter()
  const exist = ref(true)
  // 提示文字显示flg
  const message = reactive({
    emailTipMessage: ''
  })
  // 表单数据
  const inputVal = ref((await signUpData.data.userEmail) || '')
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
  if (inputVal.value) {
    checkUser()
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/utils/input.scss';
</style>

<template>
  <div class="input-group">
    <label class="label" for="Username">手机号</label>
    <input
      autocomplete="off"
      placeholder="请输入手机号"
      type="text"
      class="input"
      id="Username"
      v-model="itemValue"
    />
    <span class="message">
      {{ message.phoneTipMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { refDebounced } from '@vueuse/core'
  import { FormFormatCheck } from '../../../utils/Check'
  import { isExist } from '../../../http/api/users'
  const exist = ref(false)
  // 表单数据
  const itemValue = ref('')
  const message = reactive({
    phoneTipMessage: ''
  })

  defineProps<{
    userPhone: string
  }>()
  const emit = defineEmits(['update:userPhone'])
  const handleChange = (e) => {
    emit('update:userPhone', e)
  }
  watch(
    () => itemValue.value,
    (newVal) => {
      handleChange(newVal)
    }
  )

  // 使用 VueUse 的 refDebounced 实现防抖验证参数
  const formCheck = new FormFormatCheck()
  // 验证手机号
  const phoneDebounced = refDebounced(itemValue, 1000)
  watch(phoneDebounced, () => {
    if (!formCheck.checkPhone({ userPhone: itemValue.value, message })) return
    checkUser()
  })
  // 验证用户是否存在
  const checkUser = async () => {
    const sendData = {
      userEmail: '',
      userPhone: itemValue.value
    }
    await isExist(sendData).then((res) => {
      if (res.errno == 1001) {
        exist.value = true
        return
      }
      message.phoneTipMessage = ''
      exist.value = false
    })
  }
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/utils/input.scss';
</style>

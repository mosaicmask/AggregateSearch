<template>
  <div class="input-group">
    <label class="label" for="Captcha">邮箱回执码</label>
    <div class="input-line">
      <input
        autocomplete="off"
        placeholder="请输入邮箱回执码"
        type="text"
        v-model="itemValue"
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
</template>

<script setup lang="ts">
  import { getEmailCode } from '@/http/api/users'
  import emitter from '@/utils/Bus'
  const itemValue = ref('')
  const buttonText = ref('获取回执码')
  // 提示文字显示flg
  const message = reactive({
    receiptCodeTipMessage: ''
  })
  const props = defineProps<{
    userEmail: string
    receiptCode: string
    emailExist: boolean
  }>()
  // 父子组件双向数据更新
  const emit = defineEmits(['update:receiptCode', 'useCheckCaptcha'])
  const handleChange = (e: string) => {
    emit('update:receiptCode', e)
  }
  watch(
    () => itemValue.value,
    (newVal) => {
      handleChange(newVal)
    }
  )
  // 接收兄弟组件传参
  // 如果放入某个事件内会出现调用次数越来越多的问题
  // 第一个参数: 监听的连接名
  // 第二个参数: 传递的数据
  const checkCaptchaFlag = ref<boolean>()
  emitter.on('verifyInput', (flag: boolean) => {
    checkCaptchaFlag.value = flag
  })

  // 切换按钮状态
  const loadingFlg = ref(false)
  //  获取回执
  const getReceiptCode = () => {
    // 调用兄弟组件事件
    emit('useCheckCaptcha')
    if (!checkCaptchaFlag.value || !props.emailExist || !props.userEmail) {
      return
    }
    let countdown = 60
    loadingFlg.value = true
    setTime(countdown)
    // 邮箱回执
    getEmailCode(props.userEmail).then((res) => {
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
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/utils/input.scss';
</style>

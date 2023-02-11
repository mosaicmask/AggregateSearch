<template>
  <div class="input-group">
    <label class="label" for="Captcha">手机验证码</label>
    <div class="input-line">
      <input
        autocomplete="off"
        placeholder="请输入手机验证码"
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
  import { defineEmits, defineProps, watch, ref, reactive } from 'vue'
  import { refDebounced } from '@vueuse/core'
  import { FormFormatCheck } from '@/utils/Check'
  import emitter from '@/utils/Bus'
  import { getPhoneCheckCode } from '@/http/api/users'
  import { messageAlerts } from '@/utils/tip'
  const emit = defineEmits(['update:receiptCode', 'useCheckCaptcha'])
  const buttonText = ref('获取验证码')
  // 提示文字显示flg
  const message = reactive({
    receiptCodeTipMessage: ''
  })
  const itemValue = ref('')
  // 切换按钮状态
  const loadingFlg = ref(false)

  // 接收父组件参数
  const props = defineProps<{
    userPhone: string
    receiptCode: string
  }>()
  // 父子双向数据绑定
  const handleChange = (e) => {
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
  const checkCaptchaFlag = ref()
  emitter.on('param', (flag: boolean) => {
    checkCaptchaFlag.value = flag
  })

  const formCheck = new FormFormatCheck()
  // 验证回执码
  const receiptCodeDebounced = refDebounced(itemValue, 1000)
  watch(receiptCodeDebounced, () => {
    checkReceiptCode()
  })

  const checkReceiptCode = () => {
    return formCheck.checkReceiptCode({ receiptCode: itemValue.value, message })
  }

  //  获取回执
  const getReceiptCode = async () => {
    // 调用兄弟组件事件
    emit('useCheckCaptcha')
    // 这里只是进行了判断进行阻拦，后续有时间可以用调用兄弟组件的方法
    if (!checkCaptchaFlag.value || !props.userPhone) return
    // 发送手机校验码
    getPhoneCheckCode(props.userPhone).then((res) => {
      if (res.errno == 2404) {
        messageAlerts({ ...res })
        return
      }
      const countdown = 60
      loadingFlg.value = true
      messageAlerts({ ...res })
      setTime(countdown)
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

  defineExpose({
    checkReceiptCode
  })
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/utils/input.scss';
</style>

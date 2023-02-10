<template>
  <div class="input-group">
    <label class="label" for="Captcha">校验码</label>
    <div class="input-line">
      <input
        autocomplete="off"
        placeholder="请输入右侧图形校验码"
        v-model="itemValue"
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
        <span> 获取校验码 </span>
      </div>
    </div>
    <span class="message">
      {{ message.captchaTextTipMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import { defineEmits, defineProps, defineExpose, watch, ref } from 'vue'
  import { refDebounced } from '@vueuse/core'
  import { FormFormatCheck } from '../../../utils/Check'
  import { getCaptcha } from '../../../http/api/users'
  import { messageAlerts } from '../../../utils/tip'
  import emitter from '@/utils/Bus'

  interface Captcha {
    data: string
    text: string[]
  }

  const itemValue = ref('')
  const captcha = reactive<Captcha>({
    data: '',
    text: []
  })
  const formCheck = new FormFormatCheck()

  // 接收父组件传参 并实现父子组件双向数据绑定
  defineProps<{
    captchaText: string
  }>()
  const emit = defineEmits(['update:captchaText'])
  const handleChange = (e) => {
    emit('update:captchaText', e)
  }
  watch(
    () => itemValue.value,
    (newVal) => {
      handleChange(newVal)
    }
  )

  // 提示文字显示flg
  const message = reactive({
    captchaTextTipMessage: ''
  })

  // 慢更新并监听
  const captchaDebounced = refDebounced(itemValue, 500)
  watch(captchaDebounced, () => {
    checkCaptcha()
  })

  // 验证校验码
  const checkCaptcha = () => {
    const res = formCheck.checkCaptcha({ captchaText: itemValue.value, message, captcha })
    // 给兄弟组件传参
    // 第一个参数: 监听的连接名
    // 第二个参数: 传递的数据
    emitter.emit('param', res)
    return res
  }

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
    captcha.text = [res.text.toLowerCase(), res.text]
  }

  // 暴露子组件方法
  defineExpose({
    checkCaptcha
  })
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/utils/input.scss';
</style>

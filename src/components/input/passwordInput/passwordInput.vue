<template>
  <div class="input-group">
    <label class="label" for="Password">密码</label>
    <input
      autocomplete="off"
      placeholder="请输入密码"
      :type="showPSW ? 'text' : 'password'"
      class="input"
      id="Password"
      v-model="inputVal"
    />
    <span class="message">
      {{ message.PasswordTipMessage }}
    </span>
    <svg class="show-or-hide-icon" v-if="showPSW" aria-hidden="true" @click="showPSW = !showPSW">
      <use xlink:href="#icon-xianshimima"></use>
    </svg>
    <svg class="show-or-hide-icon" v-if="!showPSW" aria-hidden="true" @click="showPSW = !showPSW">
      <use xlink:href="#icon-yincangmima"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, watch } from 'vue'
  import { refDebounced } from '@vueuse/core'
  const inputVal = ref('')
  const showPSW = ref(false)
  const emit = defineEmits(['update:userPassword'])
  defineProps<{
    userPassword: string
  }>()
  // 提示文字显示flg
  const message = reactive({
    PasswordTipMessage: ''
  })
  // 配合监听器，实现同步修改父组件属性
  const handleChange = (e) => {
    emit('update:userPassword', e)
  }
  // 使用 VueUse 的 refDebounced 实现防抖修改参数
  const inputValDebounced = refDebounced(inputVal, 1000)
  watch(
    () => inputValDebounced.value,
    (newVal) => {
      handleChange(newVal)
    }
  )
</script>

<style lang="scss" scoped>
  @import '../../../assets/style/utils/input.scss';
</style>

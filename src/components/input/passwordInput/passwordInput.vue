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

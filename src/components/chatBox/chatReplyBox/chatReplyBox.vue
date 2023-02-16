<template>
  <div class="message-data">
    <span class="message-data-name"> chatGPT</span>
    <span class="message-data-time"> {{ time }}, Today</span>
  </div>
  <!-- white-space: pre-wrap 可以实现字符串中有换行符 \n  自动换行-->
  <div class="message my-message" style="white-space: pre-wrap">
    {{ chatContent }}
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps } from 'vue'
  // 获取当前日期
  const time = `${new Date().getHours()}:${
    new Date().getMinutes().toString().length == 2
      ? new Date().getMinutes()
      : `0${new Date().getMinutes()}`
  }`

  const props = defineProps<{
    text: string
  }>()
  // 实现打字机展示文字内容
  const i = ref(0)
  const chatContent = ref('')
  let timer
  function typewriter() {
    if (i.value <= props.text.length) {
      // 每次调用时 拼接现有0~当前字符以及下一个字符
      chatContent.value = props.text.slice(0, i.value++)
      timer = setTimeout(() => {
        typewriter()
      }, 100)
    } else {
      clearTimeout(timer)
    }
  }
  typewriter()
</script>

<style lang="scss" scoped>
  $green: #86bb71;
  $blue: #94c2ed;
  $orange: #e38968;
  $gray: #92959e;
  .message-data {
    margin-bottom: 15px;
  }

  .message-data-time {
    color: lighten($gray, 8%);
    padding-left: 6px;
  }

  .message {
    color: white;
    padding: 18px 20px;
    line-height: 26px;
    font-size: 16px;
    border-radius: 7px;
    margin-bottom: 30px;
    width: 90%;
    position: relative;

    &:after {
      bottom: 100%;
      left: 7%;
      border: solid transparent;
      content: ' ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
      border-bottom-color: $green;
      border-width: 10px;
      margin-left: -10px;
    }
  }

  .my-message {
    background: $green;
  }

  .other-message {
    background: $blue;

    &:after {
      border-bottom-color: $blue;
      left: 93%;
    }
  }
</style>

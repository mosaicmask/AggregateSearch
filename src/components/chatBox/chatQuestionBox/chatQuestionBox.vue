<template>
  <div class="message-data align-right">
    <span class="message-data-time">{{ time }}, Today </span>
    <span class="message-data-name">My</span> <i class="fa fa-circle me"></i>
  </div>
  <div class="message other-message float-right" style="white-space: pre-wrap">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
  const time = `${new Date().getHours()}:${
    new Date().getMinutes().toString().length == 2
      ? new Date().getMinutes()
      : `0${new Date().getMinutes()}`
  }`
  defineProps<{
    text: string
  }>()
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
  .align-left {
    text-align: left;
  }

  .align-right {
    text-align: right;
  }

  .float-right {
    float: right;
  }
</style>

<template>
  <!-- 搜索结果页的更多搜索卡片组件 -->
  <div class="more-body">
    <h3 class="title">
      <slot name="title"></slot>
    </h3>
    <div class="label-box">
      <template v-for="item in data" :key="item.name">
        <div class="label">
          <a :href="item.href" target="_blank">{{ item.name }}</a>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface InformationLabel {
    name: string
    href: string
  }
  defineProps<{
    data: InformationLabel[]
  }>()
</script>

<style lang="scss" scoped>
  .more-body {
    width: 100%;
    min-height: 100px;
    background-color: #fff;
    border-radius: 10px;
    margin: 1rem;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;

    .title {
      margin: 5px 0;
    }
    .label-box {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .label {
        width: 80px;
        height: 25px;
        border-radius: 7px;
        box-shadow: 3px 5px 7px 1px rgb(234, 234, 234);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        a {
          color: #4e6ef2;
        }
        &:hover{
          transition: all .4s;
          box-shadow: 3px 5px 7px 1px rgb(212, 181, 247);
          a{
            color: rgb(176, 105, 251);
          }
        }
      }
    }
  }
</style>

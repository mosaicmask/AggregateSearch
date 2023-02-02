<template>
  <!-- 搜索结果页的更多搜索卡片组件 -->
  <div class="more-body">
    <h3 class="title">
      <slot name="title"></slot>
    </h3>
    <div class="tool-box">
      <template v-for="item in toolList" :key="item.name">
        <a :href="item.href" target="_blank" class="item">
          <div class="tool">
            <img :src="item.icon" alt="图标" />
            <span>{{ item.name }}</span>
          </div>
        </a>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Tool {
    [key: string]: string
  }
  defineProps<{
    toolList: Tool[]
  }>()
</script>

<style lang="scss" scoped>
  .more-body {
    width: 100%;
    min-height: 150px;
    background-color: #fff;
    border-radius: 10px;
    margin: 1rem;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;

    .title {
      margin: 5px 0;
    }
    .tool-box {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .item {
        width: 95px;
        height: 96px;
        box-sizing: border-box;
        border-radius: 11px;
        max-width: 110px;
        padding: 5px;
        position: relative;
        color: #000;
        &:hover {
          background-color: #f2f3ff;
        }
      }
      .tool {
        border-radius: 7px;
        height: 85px;
        // border: 1px solid rgb(81, 5, 167);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-size: 14px;
        img {
          width: 46px;
          height: 46px;
        }
        span {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          text-align: center;
        }
      }
    }
  }
</style>

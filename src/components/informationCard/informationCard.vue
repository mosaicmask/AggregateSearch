<template>
  <!-- 搜索结果页的资讯卡片组件 -->
  <div class="information-body">
    <h3 class="title">最新资讯</h3>
    <ul class="information-box">
      <li v-for="item in informationData" :key="item.title">
        <a :href="item.href" target="_blank">{{ item.title }}</a>
        <span>{{ item.time }}</span>
      </li>
    </ul>
    <a href="https://www.oschina.net/news" class="look-more" target="_blank">查看更多>></a>
  </div>
</template>

<script setup lang="ts">
  import { crawlingInformationData } from '@/http/api/reptile'

  const informationData = await crawlingInformationData().then((res) => {
    return res.data.splice(0, 5)
  })
</script>

<style lang="scss" scoped>
  .information-body {
    width: 100%;
    height: 300px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;

    .title {
      margin: 5px 0;
    }

    .information-box {
      margin: 0;
      padding: 0;
      height: 220px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
      li {
        list-style: none;
        display: flex;
        a,
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          font-size: 14px;
        }
        a {
          width: 320px;
          color: #4e6ef2;
          &:hover {
            color: #8c28f6;
          }
        }
        span {
          color: #c4c7ce;
        }
      }
    }

    .look-more {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 12px;
      padding: 5px 10px;
      &:hover {
        color: #8c28f6;
      }
    }
  }
</style>

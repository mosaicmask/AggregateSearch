<template>
  <!-- 搜索结果页的资讯卡片组件 -->
  <div class="information-body">
    <template v-if="informationData">
      <h3 class="title">最新资讯</h3>
      <ul class="information-box">
        <li v-for="item in informationData" :key="item.title">
          <a :href="item.href" target="_blank">{{ item.title }}</a>
          <span>{{ item.time }}</span>
        </li>
      </ul>
      <a href="https://www.oschina.net/news" class="look-more" target="_blank">查看更多>></a>
    </template>
    <template v-else>
      <div class="error">
        <span class="loader"></span>
        <h4>抱歉！好像有什么东西坏掉了...</h4>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { crawlingInformationData } from '@/http/api/reptile'

  const informationData = await crawlingInformationData().then((res) => {
    if (!res) return
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
          margin: 0 0 0 5px;
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

    .error {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .loader {
        width: 84px;
        height: 84px;
        position: relative;
      }

      .loader:before,
      .loader:after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background: #8e38fe;
        transform: translate(-50%, -100%) scale(0);
        animation: push_401 2s infinite linear;
      }

      .loader:after {
        animation-delay: 1s;
      }

      @keyframes push_401 {
        0%,
        50% {
          transform: translate(-50%, 0%) scale(1);
        }

        100% {
          transform: translate(-50%, -100%) scale(0);
        }
      }
    }
  }
</style>

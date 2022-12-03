<template>
  <div class="result-body">
    <div :class="['drawer-switch']" @click="drawerLeft = !drawerLeft">
      <svg class="icon icon-switch" aria-hidden="true">
        <use xlink:href="#icon-jiantou-you"></use>
      </svg>
    </div>
    <div :class="['drawer-setting']" @click="drawerRight = !drawerRight">
      <svg class="icon icon-setting" aria-hidden="true">
        <use xlink:href="#icon-wangzhanshezhi"></use>
      </svg>
    </div>
    <el-drawer v-model="drawerLeft" title="I am the title" :with-header="false" direction="ltr">
      <span>this is secent search!!!!</span>
    </el-drawer>
    <el-drawer v-model="drawerRight" title="I am the title" :with-header="false">
      <span>this is setting!!!!</span>
    </el-drawer>
    <div class="result-item">
      <div class="engine">
        <svg class="icon icon-engine" aria-hidden="true">
          <use xlink:href="#icon-baidu"></use>
        </svg>
        <h1>百度 Baidu</h1>
      </div>
      <div class="content-box">
        <div class="content-item" v-for="item in 10" :key="item">
          <div class="item-title">
            <h2>{{ item }}VUE跳转外部链接的方法 - 掘金 </h2>
          </div>
          <div class="item-description">
            <span>
              2021年11月8日 — vue单页应用项目直接使用a标签跳转到外部链接报错问题分析：
              a标记触发的跳转默认被router处理，加上了前缀，见如下代码: 解决方法： 使用浏览器BOM ...
            </span>
          </div>
          <div class="item-url">
            <span>https://juejin.cn › 前端</span>
          </div>
        </div>
      </div>
    </div>
    <div class="result-item">
      <div class="engine">
        <svg class="icon icon-engine" aria-hidden="true">
          <use xlink:href="#icon-weiruan1"></use>
        </svg>
        <h1>必应 Bing</h1>
      </div>
      <div class="content-box">
        <div class="content-item" v-for="item in 10" :key="item">
          <div class="item-title">
            <h2>{{ item }}VUE跳转外部链接的方法 - 掘金 </h2>
          </div>
          <div class="item-description">
            <span>
              2021年11月8日 — vue单页应用项目直接使用a标签跳转到外部链接报错问题分析：
              a标记触发的跳转默认被router处理，加上了前缀，见如下代码: 解决方法： 使用浏览器BOM ...
            </span>
          </div>
          <div class="item-url">
            <span>https://juejin.cn › 前端</span>
          </div>
        </div>
      </div>
    </div>
    <div class="result-item">
      <div class="engine">
        <svg class="icon icon-engine" aria-hidden="true">
          <use xlink:href="#icon-google"></use>
        </svg>
        <h1>谷歌 Googles</h1>
      </div>
      <div class="content-box">
        <div class="content-item" v-for="item in 10" :key="item">
          <div class="item-title">
            <h2>{{ item }}VUE跳转外部链接的方法 - 掘金 </h2>
          </div>
          <div class="item-description">
            <span>
              2021年11月8日 — vue单页应用项目直接使用a标签跳转到外部链接报错问题分析：
              a标记触发的跳转默认被router处理，加上了前缀，见如下代码: 解决方法： 使用浏览器BOM ...
            </span>
          </div>
          <div class="item-url">
            <span>https://juejin.cn › 前端</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const drawerLeft = ref(false)
  const drawerRight = ref(false)
</script>

<style lang="scss" scoped>
  .result-body {
    width: 100%;
    height: calc(100vh - 75px);
    display: flex;
    position: relative;
    .drawer-switch,
    .drawer-setting {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 60px;
      background-color: #fff;
      box-shadow: 0 0 10px 5px rgba(78, 78, 78, 0.182);
      z-index: 1;
      cursor: pointer;
      transition: all 1s;
    }
    .drawer-switch {
      top: 10px;
      border-radius: 0 5px 5px 0;
      .icon-switch {
        width: 1.4rem;
        height: 1.4rem;
        transition: all 0.5s ease-in-out;
      }
      &:hover .icon-switch {
        width: 1.8rem;
        height: 1.8rem;
      }
    }
    .drawer-setting {
      right: 0;
      top: 10px;
      border-radius: 5px 0 0 5px;
      .icon-setting {
        width: 1.2rem;
        height: 1.2rem;
        transition: all 0.5s ease-in-out;
      }

      &:hover .icon-setting {
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    .result-item {
      flex: 1;
      padding: 1.5rem 0 0 3rem;
      box-sizing: border-box;
      .engine {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 0 0 2rem 0;

        .icon-engine {
          width: 2.5rem;
          height: 2.5rem;
          margin: 0 1rem 0 0;
        }
      }
      .content-box {
        height: calc(100vh - 228px);
        overflow-x: auto;
        padding: 0 1rem 1rem 0;
        transition: background-color var(--el-transition-duration-fast), opacity 0.25s,
          transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

        .content-item {
          max-width: 560px;
          min-width: 470px;
          box-sizing: border-box;
          margin: 4rem 0 0 0;
          .item-title {
            h2 {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              color: #5e4dcd;
            }
          }
          .item-description {
            font-size: 12px;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
          .item-url {
            font-size: 10px;
            margin-top: 0.5rem;
            span {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
        .content-item:nth-child(1) {
          margin: 1rem 0 0 0;
        }
      }
    }
  }
</style>

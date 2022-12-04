<template>
  <div class="result-body">
    <!-- 抽屉控制按钮 -->
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
    <!-- 抽屉 ltr -->
    <el-drawer
      v-model="drawerLeft"
      class="drawer-left"
      title="I am the title"
      :with-header="false"
      direction="ltr"
    >
      <div class="doc-input">
        <label for="search">
          <input class="input" type="text" placeholder="Search twitter" id="search" />
          <div class="fancy-bg"></div>
          <div class="search">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
            >
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              ></path>
            </svg>
          </div>
        </label>
      </div>
      <div class="collapse-box">
        <el-collapse accordion>
          <el-collapse-item name="1">
            <template #title>
              相关技术文档<el-icon class="header-icon">
                <info-filled />
              </el-icon>
            </template>
            <ul class="doc-box">
              <li class="item-doc" v-for="i in 5" :key="i">
                <img src="../../assets/image/doc.png" alt="站点图标" />
                <div class="text-box">
                  <h4>for...in - JavaScript MDN</h4>
                  <span>
                    …备注：
                    <mark>for</mark>
                    ...
                    <mark>in</mark>
                    不应该用于迭代一个关注索引顺序的 Array。…
                  </span>
                </div>
              </li>
            </ul>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template #title>
              相关精华博客<el-icon class="header-icon">
                <info-filled />
              </el-icon>
            </template>
            <ul class="doc-box">
              <li class="item-doc" v-for="i in 5" :key="i">
                <img src="../../assets/image/doc.png" alt="站点图标" />
                <div class="text-box">
                  <h4>for...in - JavaScript MDN</h4>
                  <span>
                    …备注：
                    <mark>for</mark>
                    ...
                    <mark>in</mark>
                    不应该用于迭代一个关注索引顺序的 Array。…
                  </span>
                </div>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-drawer>
    <!-- 抽屉 rtl -->
    <el-drawer v-model="drawerRight" title="I am the title" :with-header="false">
      <span>this is setting!!!!</span>
    </el-drawer>
    <!-- 搜索内容 第一列 -->
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

    <!-- 搜索内容 第二列 -->
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
    <!-- 搜索内容第三列 -->
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
  import { InfoFilled } from '@element-plus/icons-vue'
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

    .drawer-left {
      display: flex;
      .doc-input {
        --input-text-color: #fff;
        --input-bg-color: #283542;
        --focus-input-bg-color: transparent;
        --text-color: #949faa;
        --active-color: #5e4dcd;
        --width-of-input: 200px;
        --inline-padding-of-input: 1.2em;
        --gap: 0.9rem;
        flex: 1;
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        label {
          width: 100%;
          padding: 0.8em;
          height: 40px;
          padding-inline: var(--inline-padding-of-input);
          display: flex;
          align-items: center;
        }
        .fancy-bg {
          position: absolute;
          width: 100%;
          inset: 0;
          background: var(--input-bg-color);
          border-radius: 30px;
          height: 100%;
          z-index: 1;
          pointer-events: none;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        }
        .search {
          position: absolute;
          z-index: 2;
        }
        /* styling search-icon */
        .search {
          fill: var(--text-color);
          left: var(--inline-padding-of-input);
        }
        /* svg -- size */
        svg {
          width: 17px;
          display: block;
        }

        /* styling of input */
        .input {
          color: var(--input-text-color);
          width: 100%;
          margin-inline: min(2em, calc(var(--inline-padding-of-input) + var(--gap)));
          background: none;
          border: none;
          z-index: 2;
          &:focus {
            outline: none;
            color: var(--active-color);
          }
          &::placeholder {
            color: var(--text-color);
          }
          /* input background change in focus */
          &:focus ~ .fancy-bg {
            border: 1px solid var(--active-color);
            background: var(--focus-input-bg-color);
          }
          /* search icon color change in focus */
          &:focus ~ .search {
            fill: var(--active-color);
          }
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
          -webkit-transition-delay: 9999s;
        }
      }
      .collapse-box {
        flex: 1;
        margin: 1rem 0 0 0;
        .doc-box {
          margin: 0;
          padding: 0;
          .item-doc {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin: 3px 0;
            position: relative;
            border-bottom: 1px dashed rgb(228, 228, 228);
            border-radius: 5px 5px 0 0;
            cursor: pointer;
            transition: all 700ms;

            &:hover {
              background-color: #5e4dcd9f;
            }

            &:after {
              content: '';
              display: block;
              height: 25%;
              left: 0;
              margin: 1px 0 0 0;
              position: absolute;
              top: 25%;
              width: 100%;
            }
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }

            .text-box {
              padding: 15px 10px;
            }

            &:last-child {
              border-bottom: none;
            }
          }

          span {
            position: relative;
            transition: all 300ms;
            mark {
              position: relative;
              transition: all 300ms;
            }
          }
          // 控制模糊
          &:hover span,
          &:hover h4,
          &:hover mark {
            color: transparent;
            text-shadow: 0 0 3px #aaa;
          }
          // 控制显示
          &:hover li:hover span,
          &:hover li:hover h4 {
            color: #ffffff;
          }
          &:hover li:hover mark {
            color: #000000;
          }
        }
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

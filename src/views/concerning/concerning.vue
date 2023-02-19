<template>
  <!-- 这是关于页面 -->
  <div id="container" class="container">
    <div class="content">
      <div class="page card-b page-width">
        <div id="post1"></div>
        <h1>关于这个网站<a href="#post1" class="fas fa-hashtag"></a></h1>
        <p> 这是我的毕设作品。是的，没错。在将来我会继续维护完善它，提供更完善更健全的搜索功能 </p>
        <p>
          如果这个网站帮助到了你，提高了你的生活、学习效率，欢迎你把它推荐给更多的人
          <a href="#">【分享】</a> 正所谓，赠人玫瑰，手有余香。
        </p>
        <h2>本网站的一些亮点</h2>
        <ul>
          <li>多引擎搜索，多方面展示</li>
          <li>过滤搜索结果，实现真正的无广告，化繁为简，提高信息获取效率 </li>
          <li>引入 chatGPT 次世代的聊天搜索工具</li>
        </ul>
        <p> 十分感谢您的使用，也十分期待你的反馈</p>
      </div>
      <div class="page card-b page-width">
        <div id="post2"></div>
        <h1>本网站后期的发展计划<a href="#post2" class="fas fa-hashtag"></a></h1>
        <p>
          后期的主要发展方向是迎合chatGPT的发展，在使用chatGPT的同时，不抛弃传统搜索引擎，因为目前来看，传统搜索引擎在寻找资源方面，还是更胜一筹的。
        </p>
        <p>
          维护服务器不易，如果你想助我一臂之力，可以前往捐赠页面
          <a href="#">【捐赠】</a> 我将会有更多的动力，将这个小东西完善下去。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import underConstruction from '../../components/error/underConstruction.vue'
</script>

<style lang="scss" scoped>
  $sans-serif: 'Source Sans Pro';
  $serif: 'Poly';
  .container {
    &:not(.dark) {
      --background: #fcfbfe;
      --color: #323133;
      --cardbackground: #ffffff;
      --cardborder: #e9e9e9;
      --cardtext: #323133;
      --cardtext2: #3c3b3d;
      --cardshadow: rgba(0, 0, 0, 0.1);
      --accent: #bf263c;
    }
    &.dark {
      --background: #1c1b20;
      --color: #f5f7fa;
      --cardbackground: #222126;
      --cardborder: #252429;
      --cardtext: #f5f7fa;
      --cardtext2: #e6e9ed;
      --cardshadow: rgba(0, 0, 0, 0.1);
      --accent: #d8334a;
    }
    width: 100%;
    height: calc(100vh - 75px);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    background: rgb(26, 188, 156);
    background: -moz-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    background: -webkit-linear-gradient(
      -45deg,
      rgba(26, 188, 156, 1) 0%,
      rgba(142, 68, 173, 1) 100%
    );
    background: linear-gradient(135deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    *[class*='card'] {
      background: var(--cardbackground);
      color: var(--cardtext);
      box-shadow: 0 0 1rem -0.25rem var(--cardshadow);
      &.card-b {
        border: 1px solid var(--cardborder);
      }
    }
    .darkmode {
      position: fixed;
      bottom: 1rem;
      left: 1rem;
      font-size: 1.75rem;
      padding: 1rem;
      margin: 1px;
      border-radius: 100%;
      border-color: var(--accent) !important;
      box-shadow: 0 0 1rem -0.25rem var(--accent), inset 0 0 1rem -0.75rem var(--accent);
      color: var(--accent);
      cursor: pointer;
      transition: 0.25s -0.05s;
      &:hover {
        box-shadow: 0 0 1rem -0.25rem var(--accent), inset 0 0 1rem -0.25rem var(--accent);
        //background:var(--background);
      }
    }
    .page-width {
      max-width: 800px;
      width: calc(100vw - 8rem);
    }

    .page {
      position: relative;
      margin: 2rem 0;
      padding: 2rem;
      border-radius: 5px;
      &:not(:last-child) {
        margin-bottom: 0rem;
      }
      &:target-within {
        //I want CSS4 today
        border-color: var(--accent) !important;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        margin: 0;
        &:last-child {
          margin-bottom: 0;
        }
      }
      h1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--cardborder);
        a {
          text-decoration: none;
          font-weight: 200;
          &:hover {
            font-weight: 400;
          }
        }
      }
      p:last-child {
        margin-bottom: 0;
      }
      a {
        color: var(--accent);
        &:not(:hover) {
          text-decoration: none;
        }
      }
      i {
        color: var(--cardtext2);
        font-family: $serif, sans-serif;
      }
      ul {
        list-style: none;
        padding-left: 1rem;
        li:before {
          content: '•';
          margin-right: 1rem;
          color: var(--accent);
        }
      }
      > div[id] {
        position: absolute;
        top: calc(-6rem - 2px);
      }
    }
  }
</style>

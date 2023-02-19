<template>
  <!-- 关注页面 -->
  <div class="body">
    <div class="container">
      <div class="avatar">
        <a href="http://www.likecv.cn/">
          <img
            src="https://my-note-images-mac.oss-cn-shanghai.aliyuncs.com/code-image/head.png"
            alt="Skytsunami"
          />
        </a>
      </div>
      <div class="content">
        <h1>聚合搜索</h1>
        <p>关注我:</p>
        <p>
          <span>
            <a href="http://www.xz-code.com/" target="_blank">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-web"></use>
              </svg>
            </a>
          </span>
          <span>
            <a href="https://space.bilibili.com/50437309" target="_blank">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bilibili-fill"></use>
              </svg>
            </a>
          </span>
          <span>
            <a href="https://space.bilibili.com/50437309" target="_blank">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-douyin"></use>
              </svg>
            </a>
          </span>
          <span>
            <a href="https://github.com/mosaicmask" target="_blank">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github-fill"></use>
              </svg>
            </a>
          </span>
        </p>
        <p>BY: 捡破烂的小z</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import underConstruction from '../../components/error/underConstruction.vue'
</script>

<style lang="scss" scoped>
  .body {
    width: 100%;
    height: calc(100vh - 75px);
    margin: 0;
    padding: 0;
    font-family: 'Helvetica', sans-serif;
    background: rgb(26, 188, 156);
    background: -moz-linear-gradient(-45deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
    background: -webkit-linear-gradient(
      -45deg,
      rgba(26, 188, 156, 1) 0%,
      rgba(142, 68, 173, 1) 100%
    );
    background: linear-gradient(135deg, rgba(26, 188, 156, 1) 0%, rgba(142, 68, 173, 1) 100%);
  }

  h1 {
    font-size: 24px;
    margin: 10px 0 0 0;
    font-weight: lighter;
    text-transform: uppercase;
    color: #eeeeee;
  }

  p {
    font-size: 12px;
    font-weight: light;
    color: #333333;
  }

  span a {
    font-size: 18px;
    color: #cccccc;
    text-decoration: none;
    margin: 0 10px;
    transition: all 0.4s ease-in-out;
    &:hover {
      color: #ffffff;
    }
  }

  @keyframes float {
    0% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
    50% {
      box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0.2);
      transform: translatey(-20px);
    }
    100% {
      box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
      transform: translatey(0px);
    }
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .avatar {
    width: 150px;
    height: 150px;
    box-sizing: border-box;
    border: 5px white solid;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.6);
    transform: translatey(0px);
    animation: float 6s ease-in-out infinite;
    img {
      width: 100%;
      height: auto;
    }
  }

  .content {
    width: 100%;
    max-width: 600px;
    padding: 20px 40px;
    box-sizing: border-box;
    text-align: center;
    .icon {
      width: 1.5rem;
    }
  }

  .suppoprt-me {
    display: inline-block;
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 20vw;
    max-width: 250px;
    min-width: 200px;
    z-index: 9;
    img {
      width: 100%;
      height: auto;
    }
  }
</style>

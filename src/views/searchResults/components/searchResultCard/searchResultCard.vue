<template>
  <div class="content-box loaders" v-if="flag">
    <loadersTwo></loadersTwo>
    <h4>加载中...</h4>
  </div>
  <div class="content-body" v-else>
    <div class="engine">
      <svg class="icon icon-engine" aria-hidden="true">
        <use :xlink:href="iconText"></use>
      </svg>
      <h1>Form {{ typeData }}</h1>
    </div>
    <div class="content-box" v-if="searchData?.length" @scroll="onscroll">
      <div class="content-item" v-for="item in searchData" :key="item.title">
        <div class="item-title">
          <a :href="item.href" target="_blank">
            <h3 v-dompurify-html="item.title"> </h3>
          </a>
        </div>
        <div class="item-description">
          <span v-dompurify-html="item.caption"> </span>
        </div>
        <div class="item-url">
          <span>{{ item.cite }}</span>
        </div>
      </div>
    </div>
    <div v-else class="content-box error">
      <loaders></loaders>
      <h4>获取搜索数据被拦截，请稍后再试...</h4>
    </div>
    <Transition name="load">
      <div class="load-box" v-show="loadFlag">
        <div class="load-item"></div>
        <span>加载中...</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { crawlingData } from '../../../../stores/searchStore.js'
  import loaders from '../../../../components/loaders/loadersOne.vue'
  import loadersTwo from '../../../../components/loaders/loadersTwo.vue'
  import { useRoute } from 'vue-router'
  import { throttle } from '../../../../utils/functions/throttle'
  const route = useRoute()
  const iconText = ref('#icon-bing_logo_icon')
  const loadFlag = ref(false)
  // 获取父组件传递过来的搜索类型
  const props = defineProps<{
    typeData: string
  }>()

  const page = ref<number>(0)

  // 加载动画
  const flag = ref(true)
  setTimeout(() => {
    flag.value = false
  }, 1500)

  const onscroll = throttle(async (event: WheelEvent) => {
    const targetElement = event.target as HTMLElement
    const scrollTop = targetElement.scrollTop // 获取滚动距离
    const clientHeight = targetElement.clientHeight //可视区域的高度
    const scrollHeight = targetElement.scrollHeight // 可滚动元素总长
    if (scrollHeight - scrollTop <= clientHeight) {
      page.value++
      loadFlag.value = true
      sendRequest()
    }
  }, 1)

  // 发送请求
  const sendRequest = async () => {
    const keyword = route.params.keyword
    const pageNum = page.value
    await crawlingData.getSearchData(keyword, pageNum, props.typeData)
    setTimeout(() => {
      loadFlag.value = false
    }, 500)
  }

  await sendRequest()
  const getSearchData = async () => {
    //  根据类型 返回 搜索数据
    switch (props.typeData) {
      case 'Bing':
        return crawlingData.bingData
      case 'Google':
        iconText.value = '#icon-google_icon'
        return crawlingData.googleData
      case 'Baidu':
        iconText.value = '#icon-baidu_logo_icon'
        return crawlingData.baiduData
      case 'SoGou':
        iconText.value = '#icon-sougoushuru'
        return crawlingData.sogouData
      default:
        return crawlingData.bingData
    }
  }

  const searchData = reactive(await getSearchData())
</script>

<style lang="scss" scoped>
  .content-body {
    position: relative;
  }
  .engine {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 0 2rem 0;
    @media (max-width: 768px) {
      margin: 0 0 1rem 0;
    }

    .icon-engine {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 1rem 0 0;
    }
  }
  .content-box {
    height: calc(100vh - 270px);
    overflow-x: auto;
    padding: 0 1rem 1rem 0;
    transition: background-color var(--el-transition-duration-fast), opacity 0.25s,
      transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);

    .content-item {
      max-width: 560px;
      min-width: 270px;
      box-sizing: border-box;
      margin: 4rem 0 0 0;
      .item-title {
        h3 {
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

  .load-box {
    position: absolute;
    bottom: 0;
    left: -20px;
    width: 100%;
    height: 30px;
    background: #e4e4e4;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .load-item {
      width: 20px;
      height: 20px;
      border: #ffffff solid 2px;
      border-bottom-color: #5e4dcd;
      border-radius: 50%;
      animation: rotation 1s linear infinite;
      // border-image: linear-gradient(blue, pink) 2/2px;
      // clip-path: inset(0 round 50%);
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    span {
      font-size: 12px;
      color: #666666;
      margin: 0 10px;
    }
  }

  // Vue 的过渡样式
  .load-enter-active {
    transition: all 0.3s ease-in-out;
  }
  .load-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .load-enter-from,
  .load-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  .error,
  .loaders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

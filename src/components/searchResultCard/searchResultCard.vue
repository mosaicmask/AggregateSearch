<template>
  <div class="content-box loaders" v-if="flag">
    <loadersTwo></loadersTwo>
    <h4>加载中...</h4>
  </div>
  <div v-else>
    <div class="engine">
      <svg class="icon icon-engine" aria-hidden="true">
        <use :xlink:href="iconText"></use>
      </svg>
      <h1>For {{ typeData }}</h1>
    </div>
    <div class="content-box" v-if="searchData?.length">
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
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { crawlingData } from '@/stores/searchStore.js'
  import loaders from '../../components/loaders/loadersOne.vue'
  import loadersTwo from '../../components/loaders/loadersTwo.vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const iconText = ref('#icon-bing_logo_icon')
  // 获取父组件传递过来的搜索类型
  const props = defineProps<{
    typeData: string
  }>()

  // 加载动画
  const flag = ref(true)
  setTimeout(() => {
    flag.value = false
  }, 1500)

  //  根据类型进行搜索内容爬取
  switch (props.typeData) {
    case 'Bing':
      await crawlingData.getBingData(route.params.keyword)
      break
    case 'Google':
      await crawlingData.getGoogleData(route.params.keyword)
      break
    case 'Baidu':
      await crawlingData.getBaiduData(route.params.keyword)
      break
    case 'SoGou':
      await crawlingData.getSouGouData(route.params.keyword)
      break
    default:
      break
  }
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
        return crawlingData.soGouData
      default:
        return crawlingData.bingData
    }
  }

  const searchData = reactive(await getSearchData())
</script>

<style lang="scss" scoped>
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

  .error,
  .loaders {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

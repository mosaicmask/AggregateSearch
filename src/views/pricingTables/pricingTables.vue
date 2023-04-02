<template>
  <section>
    <div class="pricing pricing-palden">
      <template v-for="(item, index) in priceList" :key="item.price">
        <div :class="[index === 1 ? 'pricing__item--featured' : '', 'pricing-item']">
          <div class="pricing-deco">
            <svg
              class="pricing-deco-img"
              enable-background="new 0 0 300 100"
              height="100px"
              id="Layer_1"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 300 100"
              width="300px"
              x="0px"
              xml:space="preserve"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              y="0px"
            >
              <path
                class="deco-layer deco-layer--1"
                d="M30.913,43.944c0,0,42.911-34.464,87.51-14.191c77.31,35.14,113.304-1.952,146.638-4.729&#x000A;	c48.654-4.056,69.94,16.218,69.94,16.218v54.396H30.913V43.944z"
                fill="#FFFFFF"
                opacity="0.6"
              ></path>
              <path
                class="deco-layer deco-layer--2"
                d="M-35.667,44.628c0,0,42.91-34.463,87.51-14.191c77.31,35.141,113.304-1.952,146.639-4.729&#x000A;	c48.653-4.055,69.939,16.218,69.939,16.218v54.396H-35.667V44.628z"
                fill="#FFFFFF"
                opacity="0.6"
              ></path>
              <path
                class="deco-layer deco-layer--3"
                d="M43.415,98.342c0,0,48.283-68.927,109.133-68.927c65.886,0,97.983,67.914,97.983,67.914v3.716&#x000A;	H42.401L43.415,98.342z"
                fill="#FFFFFF"
                opacity="0.7"
              ></path>
              <path
                class="deco-layer deco-layer--4"
                d="M-34.667,62.998c0,0,56-45.667,120.316-27.839C167.484,57.842,197,41.332,232.286,30.428&#x000A;	c53.07-16.399,104.047,36.903,104.047,36.903l1.333,36.667l-372-2.954L-34.667,62.998z"
                fill="#FFFFFF"
              ></path>
            </svg>
            <div class="pricing-price">
              <span class="pricing-currency">¥</span>{{ item.price }}
              <span class="pricing-period">/ {{ item.duration }}</span>
            </div>
            <h3 class="pricing-title">Freelance</h3>
          </div>
          <ul class="pricing-feature-list">
            <template v-for="item2 in item.extentOfAuthority" :key="item2">
              <li class="pricing-feature">{{ item2 }}</li>
            </template>
          </ul>
          <button class="pricing-action" @click="toPayment(item)">选择方案</button>
        </div>
      </template>
    </div>
  </section>
  <div class="payment-dialog">
    <el-dialog v-model="visible" :show-close="false">
      <template #header="{ close }">
        <div class="my-header" @click="closePayment">
          <el-button type="danger" @click="close">
            <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
            Close
          </el-button>
        </div>
      </template>
      <div class="payment-box">
        <div class="content-box">
          <div class="head">
            <img src="https://api.dpweixin.com/content/images/alipay/logo.png" alt="支付宝logo" />
          </div>
          <div class="content">
            <p>聚合搜索会员服务</p>
            <p>¥{{ itemPrice }}</p>
            <div class="img-box" v-if="QRCode">
              <img :src="QRCode" alt="支付二维码" />
            </div>
          </div>
          <div class="footer"> <p>请使用支付宝APP扫一扫</p> <p>扫描二维码支付</p> </div>
        </div>
        <div class="example-box">
          <img src="https://api.dpweixin.com/content/images/alipay/alipay-sys.png" alt="操作演示" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { ElButton, ElDialog } from 'element-plus'
  import { CircleCloseFilled } from '@element-plus/icons-vue'
  import { getQRCode, getPaymentStatus } from '@/http/api/payment'
  import { messageAlerts } from '../../utils/tip'
  import { paymentStore } from '@/stores/paymentStore'
  const visible = ref(false)
  const QRCode = ref('')
  const itemPrice = ref(0)
  // 定价列表
  const priceList: Item[] = [
    {
      price: 0.01,
      duration: '月',
      extentOfAuthority: ['增加可选搜索引擎', '一个月内可无限次请求', '与最新的ChatGPT-4进行对话']
    },
    {
      price: 0.01,
      duration: '季度',
      extentOfAuthority: ['增加可选搜索引擎', '季度内可无限次请求', '与最新的ChatGPT-4进行对话']
    },
    {
      price: 0.01,
      duration: '永久',
      extentOfAuthority: ['开放所有功能（包括后续更新）', '无限次请求', '与最新的ChatGPT-4进行对话']
    }
  ]
  interface Item {
    price: number
    duration: string
    extentOfAuthority: string[]
  }

  //弹窗每次切换重置数据
  watch(
    () => visible.value,
    () => {
      QRCode.value = ''
      stopSetInterval()
    }
  )

  // 关闭支付
  const closePayment = () => {
    stopSetInterval()
  }

  // 支付按钮点击事件
  const toPayment = async (item: Item) => {
    itemPrice.value = item.price
    const data = {
      price: item.price
    }
    visible.value = true
    await getQRCode(data).then(async (res) => {
      console.log(res)
      QRCode.value = res.url_qrcode
      // 将支付数据存入缓存
      paymentStore.setPaymentData(res)
      createSetInterval()
    })
  }

  // 轮询，查询支付状态
  let timer: any
  // 开启轮询
  const createSetInterval = async () => {
    stopSetInterval()
    timer = setInterval(async () => {
      // 获取内部订单ID
      const data = {
        openid: (await paymentStore.getPaymentData().openid) as string
      }
      // 调用接口查询支付状态
      await getPaymentStatus(data).then((res) => {
        console.log(typeof res.errno)
        if (res.errno === 4003 || res.errno === 2000) {
          stopSetInterval()
        }
        if (res.errno === 2000) {
          visible.value = false
          messageAlerts({ ...res })
          return
        }
      })
    }, 3000)
  }
  // 关闭轮询
  const stopSetInterval = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }
</script>

<style lang="scss" scoped>
  body {
    -webkit-font-smoothing: antialiased;
  }
  section {
    background: #647df9;
    color: #7a90ff;
    padding: 6em 0 8em;
    height: calc(100vh - 75px);
    box-sizing: border-box;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }

  .pricing {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-justify-content: center;
    justify-content: center;
    width: 100%;
    margin: 0 auto 3em;
    &-item {
      position: relative;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      -webkit-align-items: stretch;
      align-items: stretch;
      text-align: center;
      -webkit-flex: 0 1 330px;
      flex: 0 1 330px;
    }
    &-action {
      color: inherit;
      border: none;
      background: none;
      &:focus {
        outline: none;
      }
    }
  }

  .pricing-feature-list {
    text-align: left;
  }

  .pricing-palden .pricing-item {
    font-family: 'Open Sans', sans-serif;
    cursor: default;
    color: #84697c;
    background: #fff;
    box-shadow: 0 0 10px rgba(46, 59, 125, 0.23);
    border-radius: 20px 20px 10px 10px;
    margin: 1em;
  }

  @media screen and (min-width: 66.25em) {
    .pricing-palden .pricing-item {
      margin: 1em -0.5em;
    }
    .pricing-palden .pricing__item--featured {
      margin: 0;
      z-index: 10;
      box-shadow: 0 0 20px rgba(46, 59, 125, 0.23);
    }
  }
  .pricing-palden {
    .pricing-deco {
      border-radius: 10px 10px 0 0;
      background: rgba(76, 70, 101, 0.99);
      padding: 4em 0 9em;
      position: relative;
    }
    .pricing-deco-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 160px;
    }
    .pricing-title {
      font-size: 0.75em;
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 5px;
      color: #fff;
    }
    .deco-layer {
      -webkit-transition: -webkit-transform 0.5s;
      transition: transform 0.5s;
    }
    .pricing-item {
      &:hover {
        .deco-layer--1 {
          -webkit-transform: translate3d(15px, 0, 0);
          transform: translate3d(15px, 0, 0);
        }
        .deco-layer--2 {
          -webkit-transform: translate3d(-15px, 0, 0);
          transform: translate3d(-15px, 0, 0);
        }
      }
    }
    .icon {
      font-size: 2.5em;
    }
    .pricing-price {
      font-size: 5em;
      font-weight: bold;
      padding: 0;
      color: #fff;
      margin: 0 0 0.25em 0;
      line-height: 0.75;
    }
    .pricing-currency {
      font-size: 0.15em;
      vertical-align: top;
    }
    .pricing-period {
      font-size: 0.15em;
      padding: 0 0 0 0.5em;

      font-style: italic;
    }
    .pricing__sentence {
      font-weight: bold;
      margin: 0 0 1em 0;
      padding: 0 0 0.5em;
    }
    .pricing-feature-list {
      margin: 0;
      padding: 0.25em 0 2.5em;
      list-style: none;
      text-align: center;
    }
    .pricing-feature {
      padding: 1em 0;
    }
    .pricing-action {
      font-weight: bold;
      margin: auto 3em 2em 3em;
      padding: 1em 2em;
      color: #fff;
      border-radius: 30px;
      background: #4d4766;
      -webkit-transition: background-color 0.3s;
      transition: background-color 0.3s;
      &:hover,
      &:focus {
        background-color: #100a13;
      }
    }
  }

  .pricing-palden .pricing-item--featured .pricing-deco {
    padding: 5em 0 8.885em 0;
  }

  .payment-dialog {
    display: flex;

    :deep(.el-dialog) {
      width: 600px;
      border-radius: 10px;
      background-color: #e9e9e9;
    }
    .my-header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .payment-box {
      width: 100%;
      height: 350px;
      display: flex;
      flex-direction: flex;
      align-items: center;
      justify-content: flex-start;
      img {
        width: 50%;
      }
      .content-box {
        flex: 1;
        height: 380px;
        box-sizing: border-box;
        padding: 20px 0 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        position: relative;

        .head {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 100px;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 10px 0;
          p {
            margin: 3px 0;
            font-size: 14px;
            font-weight: 600;
          }
          img {
            width: 200px;
          }
        }

        .footer {
          width: 100%;
          height: auto;
          background-color: #32343d;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          position: absolute;
          bottom: 0;
          p {
            margin: 3px;
            color: #fff;
            font-size: 12px;
          }
        }
      }

      .example-box {
        flex: 1;
        height: 340px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 90%;
        }
      }
    }
  }
</style>

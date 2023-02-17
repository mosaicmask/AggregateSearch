<template>
  <!-- 这是捐赠页面 -->
  <div class="card-body">
    <!-- user donation card -->
    <div class="card-wrap" id="card">
      <!-- user info -->
      <header class="card-user">
        <div class="card-user-hero" :style="'background-image: url(' + userInfo.hero + ')'"></div>
        <div class="card-user-row">
          <div class="card-user-avatar">
            <img :src="userInfo.avatar" :alt="userInfo.name" />
          </div>
          <div class="card-user-details">
            <div class="card-user-name">{{ userInfo.name }}</div>
            <div class="card-user-info">{{ userInfo.info }}</div>
          </div>
          <div class="card-user-cta">
            <a :href="userInfo.website" target="_blank">Website</a>
          </div>
        </div>
      </header>

      <!-- tabs -->
      <main class="tabs-wrap">
        <!-- tab buttons -->
        <nav class="tabs-nav">
          <button
            v-for="w in walletsList"
            :key="w.symbol"
            :class="{ active: w.active }"
            @click="selectWallet(w.symbol)"
          >
            {{ w.symbol }}
          </button>
        </nav>
        <!-- tab content -->
        <section class="tabs-info">
          <!-- qr image -->
          <div class="tabs-info-row">
            <div class="tabs-info-qr">
              <img :src="getQrImage()" :alt="wallet.name" />
            </div>
            <div class="tabs-info-details">
              <div class="tabs-info-title">感谢捐赠</div>
              <div class="tabs-info-warn">
                维护服务器以及续费chatgpt接口不易，您所捐赠的每一份善款，将全额用于系统的开发以及维护，您无需承担网站的任何管理风险。
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  // import underConstruction from '../../components/error/underConstruction.vue'
  // user details
  const userInfo = {
    avatar: 'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg',
    hero: 'https://blog-img-data.oss-cn-shanghai.aliyuncs.com/image-photography/image-list/%E5%A4%95%E9%98%B3%E4%B8%8E%E4%BA%91/7009.jpg',
    website: 'http://www.xz-code.com/',
    name: '捡破烂的小z',
    info: '想要成为很棒的前端开发工程师'
  }

  // crypto wallets
  const cryptoWallets = [
    {
      symbol: '支付宝',
      name: '支付宝',
      image: 'https://my-note-images-mac.oss-cn-shanghai.aliyuncs.com/code-image/z.png'
    },
    {
      symbol: '微信',
      name: '微信',
      image: 'https://my-note-images-mac.oss-cn-shanghai.aliyuncs.com/code-image/w.png'
    }
  ]

  // vue instance
  export default defineComponent({
    el: '#card',
    async setup() {
      const data = reactive({
        userInfo,
        cryptoWallets,
        tab: '支付宝',
        wallet: {},
        statsCache: {},
        stats: {}
      })
      return { ...toRefs(data) }
    },

    // computed methods
    computed: {
      // compute list wallets for tabs
      walletsList() {
        return this.cryptoWallets.map((w) => {
          w.active = w.symbol === this.tab
          return w
        })
      }
    },

    // when component mounts
    mounted() {
      this.selectWallet(this.tab)
    },

    // custom methods
    methods: {
      // select active tab wallet
      selectWallet(symbol) {
        let wallet = this.cryptoWallets.filter((w) => w.symbol === symbol).shift()
        console.log('wallet :>> ', wallet)
        if (!wallet) return
        wallet.copied = 0
        this.wallet = wallet
        this.tab = symbol
      },
      // get qr image url for selected wallet
      getQrImage() {
        return this.wallet.image
      }
    }
  })
</script>

<style lang="scss" scoped>
  /**
  * Vars
  */
  $colorPrimary: #5e4dcd; // try a different color!
  $padSpace: 1em;
  $maxWidth: 520px;
  $heroHeight: 10em;
  $borderRadius: 6px;
  $fxSpeed: 300ms;
  $bgColor: #f0f0f0;
  $fontColor: desaturate(darken($colorPrimary, 35%), 50%);
  $fontFamily: 'Merriweather Sans', Arial, sans-serif;
  $fontSize: 15px;
  $shadowSmall: 0 1px 3px rgba(#000, 0.3);
  $shadowBig: 0 2px 18px rgba(#000, 0.5);

  /**
  * Reset
  */
  *,
  *:before,
  *:after {
    outline: 0;
    margin: 0;
    padding: 0;
    border: 0;
    text-decoration: none;
    box-sizing: border-box;
    transition: color $fxSpeed ease-out, background $fxSpeed ease-out, border $fxSpeed ease-out,
      trandform $fxSpeed ease-out, opacity $fxSpeed ease-out;
  }

  /**
  * Form elms
  */
  input,
  textarea,
  select,
  options,
  button {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    font-weight: normal;
    background: none;
  }

  /**
  * Card
  */
  .card-body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 75px);
  }
  .card-wrap {
    overflow: hidden;
    margin: 0 auto;
    max-width: $maxWidth;
    background-color: $bgColor;
    border-radius: $borderRadius;
    box-shadow: $shadowBig;

    // user info
    .card-user {
      position: relative;

      // user hero bg
      .card-user-hero {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: $heroHeight;
        background-color: $colorPrimary;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 120%;
        z-index: 0;
      }

      // user details row
      .card-user-row {
        display: flex;
        flex-direction: flex-row;
        align-items: center;
        justify-content: stretch;
        position: relative;
        padding: $padSpace;
        padding-top: calc(#{$heroHeight} - 3em);
        margin-bottom: $padSpace;

        // user avatar image
        .card-user-avatar {
          margin-right: $padSpace;
          & > img {
            display: block;
            width: 6em;
            height: 6em;
            border: 3px solid $bgColor;
            border-radius: 100px;
            box-shadow: $shadowBig;
          }
        }

        // user name and info
        .card-user-details {
          flex: 1;
          margin-right: $padSpace;
          margin-top: 0.6em;
          line-height: normal;
          text-wrap: nowrap;
          height: 85px;

          .card-user-name {
            font-size: 200%;
            letter-spacing: -1px;
            line-height: 1em;
            color: $bgColor;
            text-shadow: $shadowBig;
          }
          .card-user-info {
            line-height: 1em;
            padding-top: $padSpace;
            color: desaturate(darken($colorPrimary, 10%), 20%);
          }
        }

        // user cta link
        .card-user-cta {
          & > a {
            display: block;
            cursor: pointer;
            color: $bgColor;
            font-weight: normal;
            padding: ($padSpace * 0.8) $padSpace;
            border-radius: 100px;
            box-shadow: $shadowBig;
            text-shadow: $shadowSmall;
            background-color: desaturate(lighten($colorPrimary, 5%), 20%);

            &:hover {
              background-color: desaturate(lighten($colorPrimary, 0%), 20%);
            }
          }
        }
      }
    }

    // tabs section
    .tabs-wrap {
      position: relative;

      .tabs-nav {
        display: flex;
        flex-direction: flex-row;
        align-items: center;
        justify-content: stretch;
        position: relative;
        overflow: hidden;

        // tab button
        & > button {
          flex: 1;
          display: block;
          cursor: pointer;
          text-align: center;
          padding: ($padSpace * 0.8) 0;
          background-color: rgba(#000, 0.09);
          border-top: 2px solid rgba($colorPrimary, 0);
          font-weight: bold;

          &:hover {
            background-color: rgba(#000, 0.05);
          }
          &.active {
            background-color: rgba(#000, 0);
            border-color: rgba($colorPrimary, 0.5);
            color: $colorPrimary;
          }
          & + button {
            margin-left: 1px;
          }
        }
      }

      // tab content
      .tabs-info {
        min-height: 100px;
        padding-top: $padSpace;

        .tabs-info-row {
          display: flex;
          flex-direction: flex-row;
          align-items: center;
          justify-content: stretch;
          margin-bottom: $padSpace;
          padding: 0 $padSpace;

          .tabs-info-qr {
            margin-right: $padSpace;
            & > img {
              display: block;
              // border-radius: 20%;
              width: 120px;
              height: 120px;
            }
          }
          .tabs-info-title {
            font-size: 200%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>

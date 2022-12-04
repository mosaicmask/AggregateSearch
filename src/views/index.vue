<template>
  <div class="search-box">
    <h1>在可视化图谱中开始 <em class="typewriter">多引擎</em> 探索</h1>
    <h4>要开始，请选择版本并在搜索框内输入内容</h4>
    <div class="label-box">
      <div :class="['label', labelFlg == 1 ? 'label-pick' : '']" @click="changeLabel(1)">
        无限制版
      </div>
      <div :class="['label', labelFlg == 0 ? 'label-pick' : '']" @click="changeLabel(0)">
        前端版
      </div>
    </div>
    <div class="input-group">
      <input
        type="text"
        class="input"
        id="value"
        name="value"
        placeholder="输入你要搜索的内容"
        autocomplete="off"
        v-model="inputVal"
        @keyup.enter.exact="searchData"
      />
      <!-- <input class="button--submit" value="Subscribe" type="submit" /> -->
      <button @click="searchData" class="button--submit">
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>Send</span>
      </button>
    </div>
    <footer class="footer">
      <a href="https://beian.miit.gov.cn">桂ICP备2021009358号-3</a>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const inputVal = ref('')
  const labelFlg = ref(1)
  const changeLabel = (flg: number) => {
    labelFlg.value = flg
  }

  const searchData = () => {
    console.log('inputVal.value :>> ', inputVal.value)
    if (!inputVal.value) {
      router.go(0)
      return
    }
    router.push({
      name: 'searchResults'
    })
  }
</script>

<style lang="scss" scoped>
  .search-box {
    height: calc(100vh - 75px);
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    h1 {
      margin: 12rem 0 0 0;
      font-size: 2.9rem;
      .typewriter {
        color: transparent;
        font-size: 1.4rem;
        position: relative;
        overflow: hidden;

        &::before {
          content: '多引擎';
          position: absolute;
          line-height: 30px;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          border-right: 4px solid #000;
          overflow: hidden;
          color: #000;
          animation: load91371 2s linear infinite;
        }

        @keyframes load91371 {
          0%,
          10%,
          100% {
            width: 0;
          }

          10%,
          20%,
          30%,
          40%,
          50%,
          60%,
          70%,
          80%,
          90%,
          100% {
            border-right-color: transparent;
          }

          11%,
          21%,
          31%,
          41%,
          51%,
          61%,
          71%,
          81%,
          91% {
            border-right-color: #000;
          }

          60%,
          80% {
            width: 100%;
          }
        }
      }
    }
    .label-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 2rem 0 0 0;
      .label {
        width: 80px;
        height: 35px;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        background-color: rgb(216, 216, 216);
        color: rgb(59, 59, 59);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        &:active {
          transform: scale(0.95);
        }
      }
      .label-pick {
        background-color: #5e4dcd;
        color: #fff;
      }
    }
    .input-group {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 1rem 0 0 0;
      .input {
        min-height: 48px;
        width: 100%;
        padding: 0 1rem;
        color: #fff;
        font-size: 15px;
        border: 1px solid #5e4dcd;
        border-radius: 6px 0 0 6px;
        background-color: transparent;
        color: #29225a;
        &:focus,
        &:focus-visible {
          border-color: #3898ec;
          outline: none;
        }
      }
    }
    .button--submit {
      min-width: 120px;
      max-height: 50px;
      font-size: 20px;
      background: #5e4dcd;
      color: white;
      padding: 0.7em 1em;
      // padding-left: 0.9em;
      display: flex;
      align-items: center;
      border: none;
      border-radius: 0 6px 6px 0;
      overflow: hidden;
      transition: all 0.2s;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      span {
        display: block;
        margin-left: 0.3em;
        transition: all 0.3s ease-in-out;
      }
      svg {
        display: block;
        transform-origin: center center;
        transition: transform 0.3s ease-in-out;
      }
      &:hover .svg-wrapper {
        animation: fly-1 0.6s ease-in-out infinite alternate;
      }
      &:hover svg {
        transform: translateX(1.2em) rotate(45deg) scale(1.1);
      }
      &:hover span {
        transform: translateX(5em);
      }
      &:active {
        // transform: scale(0.99);
        transition: none;
        background: #29225a;
        .input-group {
          .input {
            border: 1px solid #29225a;
          }
        }
      }
      @keyframes fly-1 {
        from {
          transform: translateY(0.1em);
        }

        to {
          transform: translateY(-0.1em);
        }
      }
    }

    .footer {
      position: fixed;
      bottom: 10px;

      a {
        color: rgb(162, 162, 162);
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
</style>

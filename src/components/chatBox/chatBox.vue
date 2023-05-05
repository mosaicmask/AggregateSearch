<template>
  <div class="chat-body">
    <div class="chat">
      <div class="chat-header clearfix">
        <div class="portrait">
          <loadersFour></loadersFour>
        </div>
        <!-- <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"
          alt="avatar"
        /> -->
        <div class="chat-about">
          <div class="chat-with">数据来自 chatGPT</div>
          <div class="chat-num-messages">搜索结果仅供学习交流使用</div>
        </div>
        <i class="fa fa-star"></i>
      </div>
      <!-- end chat-header -->
      <!-- tips -->
      <el-alert title="由于访问外网等因素，请求时间可能会较长，请耐心等待" type="warning" />
      <!-- tips-end -->
      <div class="chat-history">
        <ul>
          <li v-for="item in chatData" class="clearfix" :key="item.type">
            <template v-if="item.type == 'question'">
              <chatQuestionBox v-model:text="item.text"></chatQuestionBox>
            </template>
            <template v-else-if="item.type == 'reply'">
              <chatReplyBox v-model:text="item.text"></chatReplyBox>
            </template>
            <template v-else>
              <div class="error-info">
                <span>{{ item.text }}</span>
              </div>
            </template>
          </li>
          <div class="load-box">
            <loadersThree v-show="loadFlag"></loadersThree>
          </div>
        </ul>
      </div>
      <!-- end chat-history -->

      <div class="chat-message clearfix">
        <el-input
          v-model="textarea"
          maxlength="200"
          placeholder="有问题尽管问我..."
          show-word-limit
          type="textarea"
        />
        <button class="send-button" :disabled="loadFlag" @click="sendQuestion">Send</button>
        <button class="stop-button" @click="stopRequest">Stop</button>
      </div>
      <!-- end chat-message -->
    </div>
    <!-- end chat -->
  </div>
  <!-- end container -->
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import chatReplyBox from './chatReplyBox/chatReplyBox.vue'
  import chatQuestionBox from './chatQuestionBox/chatQuestionBox.vue'
  import loadersThree from '/src/components/loaders/loadersThree.vue'
  import loadersFour from '/src/components/loaders/loadersFour.vue'
  import { getChatResponse } from '@/http/api/chat'
  const loadFlag = ref(false)
  const textarea = ref('')
  const chatData = reactive([
    {
      type: 'reply',
      text: '您好啊！有什么问题欢迎问我...'
    }
  ])
  // 发送问题
  const sendQuestion = async () => {
    const text = textarea.value
    textarea.value = ''
    if (!text) {
      return
    }
    // 将用户问题push进聊天列表
    chatData.push({
      type: 'question',
      text
    })
    loadFlag.value = true
    // 请求接口 获取答案
    let chatAnswer = await getChatResponse(text)

    //如果返回的参数为空
    if (!chatAnswer) {
      chatData.push({
        type: 'error',
        text: '抱歉，服务器好像挂掉了，请刷新重试。'
      })
      loadFlag.value = false
      return
    }

    // 如果返回超时或后台出错
    if (typeof chatAnswer != 'string') {
      if (chatAnswer.errno == 1004) {
        chatData.push({
          type: 'error',
          text: '抱歉，要使用该功能请先登录'
        })
        loadFlag.value = false
        return
      }
      // 将错误提示push进聊天列表
      chatData.push({
        type: 'error',
        text: '请求可能超时，请刷新页面或换个问题重试'
      })
      loadFlag.value = false
      return
    }
    // 去除返回字符串头部的两个无用换行符
    chatAnswer = formatString(chatAnswer)
    // 将答案push进聊天列表
    chatData.push({
      type: 'reply',
      text: chatAnswer
    })
    loadFlag.value = false
  }
  // 格式化字符串
  const formatString = (str: string) => {
    // 如果删了之后，首字母还是'\n'就继续删掉
    if (str.indexOf('\n') === 0) {
      return formatString(str)
    }
    return str
  }
  const stopRequest = () => {}
</script>
<style lang="scss" scoped>
  .chat-body {
    width: 100%;
    min-height: 400px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;

    @import url(https://fonts.googleapis.com/css?family=Lato:400,700);

    $green: #86bb71;
    $blue: #94aded;
    $orange: #e38968;
    $gray: #92959e;

    .chat {
      width: 100%;
      float: left;
      // background: #f2f5f8;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;

      color: #434651;

      .chat-header {
        padding: 20px;
        border-bottom: 2px solid white;

        img {
          float: left;
        }
        .portrait {
          float: left;
          width: 60px;
          height: 60px;
          position: relative;
        }

        .chat-about {
          float: left;
          padding-left: 10px;
          margin-top: 6px;
        }

        .chat-with {
          font-weight: bold;
          font-size: 16px;
        }

        .chat-num-messages {
          color: $gray;
          font-size: 12px;
          margin: 5px 0 0 0;
        }

        .fa-star {
          float: right;
          color: #d8dadf;
          font-size: 20px;
          margin-top: 12px;
        }
      }

      .chat-history {
        padding: 0px 20px 10px;
        border-bottom: 2px solid white;
        overflow-y: scroll;
        height: 575px;
        margin: 10px 0 0 0;
        ul {
          padding: 0;
          margin: 0;
          li {
            list-style: none;
            .error-info {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 0 20px 0;
              font-size: 14px;
              color: #92959e;
            }
          }
          .load-box {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              display: inline-block;
              margin: 0 50px 0 0;
            }
          }
        }
      }

      .chat-message {
        padding: 30px;

        textarea {
          width: 100%;
          border: none;
          padding: 10px 20px;
          font: 14px/22px 'Lato', Arial, sans-serif;
          margin-bottom: 10px;
          border-radius: 5px;
          resize: none;
          box-sizing: border-box;
        }
        .send-button,
        .stop-button {
          float: right;
          color: $blue;
          font-size: 16px;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          font-weight: bold;
          background: #fff;
          margin: 10px 0 0 0;

          &:hover {
            color: darken($blue, 7%);
          }
        }
        .stop-button {
          float: left;
        }
      }
    }

    .clearfix:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: ' ';
      clear: both;
      height: 0;
    }
  }
</style>

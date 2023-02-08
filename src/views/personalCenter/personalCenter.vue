<!-- 个人中心页面 -->
<template>
  <div class="personal-body">
    <form class="body-left" @submit.prevent="changeUserInfo">
      <div class="user-info-box">
        <div class="user-img">
          <img :src="userData.picture" alt="用户头像" />
        </div>
        <div class="input-line">
          <label for="userName">用户名</label>
          <input
            id="userName"
            :placeholder="userData.userName"
            type="text"
            name="text"
            class="input"
            :disabled="false"
          />
          <span class="operate-text">更改</span>
        </div>
        <div class="input-line">
          <label for="userEmail">邮箱</label>
          <input
            id="userEmail"
            :placeholder="userData.userEmail"
            type="text"
            name="text"
            class="input"
            :disabled="true"
          />
          <span class="operate-text">更改</span>
        </div>
        <div class="input-line">
          <label for="userPhone">手机号</label>
          <input
            id="userPhone"
            :placeholder="userData.userPhone ? userData.userPhone : '未绑定'"
            type="text"
            name="text"
            class="input"
            :disabled="true"
          />
          <span class="operate-text">绑定</span>
        </div>
        <div class="input-line">
          <label for="userPwd">密码</label>
          <input
            id="userPwd"
            placeholder="已设置密码，可以使用邮箱登录"
            type="text"
            name="text"
            class="input"
            :disabled="true"
          />
          <span class="operate-text">更改</span>
        </div>
        <!-- <div class="input-line">
          <fieldset>
            <legend for="gender">性别</legend>
            <div class="radio-box">
              <div class="radio-item">
                <input type="radio" id="gender1" name="gender" value="1" />
                <label for="gender1">男</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="gender2" name="gender" value="2" />
                <label for="gender2">女</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="gender3" name="gender" value="3" />
                <label for="gender3">保密</label>
              </div>
            </div>
          </fieldset>
        </div> -->
        <!-- <div class="input-line">
          <fieldset>
            <legend for="occupation">职业</legend>
            <div class="radio-box">
              <div class="radio-item">
                <input type="radio" id="occupation1" name="occupation" value="email" />
                <label for="occupation1">学生</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="occupation2" name="occupation" value="phone" />
                <label for="occupation2">开发者</label>
              </div>
              <div class="radio-item">
                <input type="radio" id="occupation3" name="occupation" value="mail" />
                <label for="occupation3">其他</label>
              </div>
            </div>
          </fieldset>
        </div> -->
        <div class="bottom-box">
          <el-button class="login-button" @click="changeUserInfo" color="#5e4dcd" size="large">
            保存修改
          </el-button>
          <el-button
            class="login-button"
            @click="dialogVisible = true"
            color="#aa0d0d"
            size="large"
          >
            退出登录
          </el-button>
        </div>
        <el-dialog v-model="dialogVisible" title="提示" width="30%" draggable>
          <span>确定要退出登录吗？</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false" size="large">取消</el-button>
              <el-button type="primary" @click="signOut" size="large"> 确定 </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </form>
    <div class="body-right">
      <div class="search-conf-box">
        <h3>引擎搜索结果-展示配置</h3>
        <draggable
          v-model="myArray"
          @handle="'.item-card'"
          group="people"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
          class="wrapper"
        >
          <template #item="{ element }">
            <Card>
              <template #options>
                <el-select v-model="element.value" class="m-2" placeholder="Select" size="large">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
              <template #icon>
                <svg style="width: 70px; height: 70px" aria-hidden="true">
                  <use
                    :xlink:href="`#icon-${
                      // 根据当前选中项，寻找图标后缀
                      options.find((item) => item.value == element.value)?.icon
                    }`"
                  ></use>
                </svg>
                <!-- {{ options.find((item) => item.value == element.value)?.label }} -->
              </template>
            </Card>
          </template>
        </draggable>
        <div class="bottom-box">
          <el-button class="login-button" @click="changeUserInfo" color="#5e4dcd" size="large">
            保存修改
          </el-button>
        </div>
      </div>
      <div class="litter-conf-box">
        <!-- <h3>暂时不知道放什么-QAQ</h3> -->
        <InfiniteScroll></InfiniteScroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue'
  import { loginStatus } from '../../stores/loginStateStore'
  // 这里有个坑，不能直接用组合是API 也就是setup 写在script标签里，这样会导致拖动数据不更新
  import draggable from 'vuedraggable'

  export default defineComponent({
    components: { draggable },
    async setup() {
      const data = reactive({
        drag: false,
        dialogVisible: false,
        value: '',
        myArray: [
          { id: 1, value: 'baidu' },
          { id: 2, value: 'google' },
          { id: 3, value: 'bing' }
        ],
        options: [
          {
            value: 'baidu',
            label: '百度',
            icon: 'baidu_logo_icon'
          },
          {
            value: 'google',
            label: '谷歌',
            icon: 'google_icon'
          },
          {
            value: 'bing',
            label: '必应',
            icon: 'bing_logo_icon'
          },
          {
            value: 'sougou',
            label: '搜狗',
            icon: 'sougoushuru'
          },
          {
            value: 'yahu',
            label: '雅虎',
            icon: 'yahoo-fill'
          }
        ],
        userData: await loginStatus.getUserInfo()
      })
      return { ...toRefs(data) }
    },
    methods: {
      changeUserInfo() {
        loginStatus.getUserInfo()
      },
      // 退出登录
      signOut() {
        loginStatus.singOut()
        this.$router.push({
          name: 'home'
        })
      }
    }
  })
</script>

<style lang="scss" scoped>
  .personal-body {
    width: 100%;
    min-height: calc(100vh - 75px);
    display: grid;
    grid-template-columns: 450px auto;
    grid-template-rows: 100%;
    grid-template-areas: 'l r';
    @media screen and (max-width: 1200px) {
      display: flex;
      flex-direction: column;
    }
    .body-left {
      grid-area: l;
      border-right: 1px dashed rgb(167, 167, 167);
      .user-info-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        // box-sizing: content-box;
        .user-img {
          img {
            width: 100px;
            height: 100px;
          }
        }
        .input-line {
          width: auto;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;

          label {
            display: inline-block;
            width: auto;
            font-size: 14px;
            font-weight: 500;
            margin: 0 0 10px 0;
          }
          fieldset {
            border: none;
            min-width: 350px;
            margin: 0;
            padding: 0;
            font-size: 14px;
            font-weight: 500;
            .radio-box {
              display: flex;
              align-items: center;
              justify-content: flex-start;
              width: 100%;
              padding: 20px 0 0 0;
              .radio-item {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                width: calc(350px / 3);

                label {
                  font-size: 13px;
                  margin: 0 10px;
                }
              }
            }
          }
          .input {
            box-sizing: border-box;
            min-width: 350px;
            // height: 15px;
            padding: 12px 49px 12px 12px;
            border-radius: 12px;
            border: 1.5px solid lightgrey;
            outline: none;
            transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
            box-shadow: 0px 0px 20px -18px;
            &:hover {
              border: 2px solid lightgrey;
              box-shadow: 0px 0px 20px -17px;
            }

            &:active {
              transform: scale(0.95);
            }

            &:focus {
              border: 2px solid grey;
            }
            &::-webkit-input-placeholder {
              font-size: 12px;
            }
          }

          .operate-text {
            position: absolute;
            right: 10px;
            bottom: 43px;
            font-size: 13px;
            color: rgb(90, 86, 86);
          }
        }
        .bottom-box {
          width: auto;
          height: auto;
          margin: 50px;
        }
      }
    }
    .body-right {
      grid-area: r;
      padding: 20px;
      .search-conf-box {
        display: flex;
        flex-direction: column;
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
        }
        .bottom-box {
          width: 100%;
          height: auto;
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .litter-conf-box {
        background: #fff;
      }
    }
  }
</style>

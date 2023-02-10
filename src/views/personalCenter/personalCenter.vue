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
            :disabled="userNameFlg"
          />
          <span class="operate-text" @click="userNameFlg = false">更改</span>
        </div>
        <div class="input-line">
          <label for="userEmail">邮箱</label>
          <input
            id="userEmail"
            :placeholder="userData.userEmail ? userData.userEmail : '未绑定'"
            type="text"
            name="text"
            class="input"
            :disabled="userEmailFlg"
          />
          <span class="operate-text" @click="userEmailFlg = false">更改</span>
        </div>
        <div class="bottom-box">
          <el-button class="login-button" @click="changeUserInfo" color="#5e4dcd" size="large">
            保存修改
          </el-button>
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
          <span class="operate-text" @click="dialogChangePhone = true">绑定</span>
        </div>
        <!-- 修改密码弹窗 -->
        <el-dialog v-model="dialogChangePhone" title="绑定手机号码" center>
          <h3>该功能正在开发中...</h3>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogChangePhone = false" size="large">取消</el-button>
              <el-button type="primary" @click="dialogChangePhone = false" size="large">
                提交
              </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 修改密码弹窗结束 -->
        <div class="input-line">
          <label for="userPwd">密码</label>
          <input
            id="userPwd"
            :placeholder="
              userData.userEmail ? '已设置密码，可以使用邮箱登录' : '请先绑定邮箱再设置登录密码'
            "
            type="text"
            name="text"
            class="input"
            :disabled="true"
          />
          <span class="operate-text" @click="dialogChangePassword = true">更改</span>
        </div>
        <!-- 修改密码弹窗 -->
        <el-dialog v-model="dialogChangePassword" title="修改密码" center>
          <form>
            <div class="input-group">
              <label class="label" for="Password">请输入旧密码</label>
              <input
                autocomplete="off"
                placeholder="请输入密码"
                :type="showPSW1 ? 'text' : 'password'"
                class="input"
                id="Password"
                v-model="passwordInfo.oldPassword"
              />
              <svg class="show-or-hide-icon" aria-hidden="true" @click="showPSW1 = !showPSW1">
                <use :xlink:href="showPSW1 ? '#icon-xianshimima' : '#icon-yincangmima'"></use>
              </svg>
            </div>
            <div class="input-group">
              <label class="label" for="Password">请输入新密码</label>
              <input
                autocomplete="off"
                placeholder="请输入密码"
                :type="showPSW2 ? 'text' : 'password'"
                class="input"
                id="Password"
                v-model="passwordInfo.newPasswordTest"
              />
              <svg class="show-or-hide-icon" aria-hidden="true" @click="showPSW2 = !showPSW2">
                <use :xlink:href="showPSW2 ? '#icon-xianshimima' : '#icon-yincangmima'"></use>
              </svg>
            </div>
            <div class="input-group">
              <label class="label" for="Password">再次输入新密码</label>
              <input
                autocomplete="off"
                placeholder="请输入密码"
                :type="showPSW3 ? 'text' : 'password'"
                class="input"
                id="Password"
                v-model="passwordInfo.newPassword"
              />
              <svg class="show-or-hide-icon" aria-hidden="true" @click="showPSW3 = !showPSW3">
                <use :xlink:href="showPSW3 ? '#icon-xianshimima' : '#icon-yincangmima'"></use>
              </svg>
            </div>
          </form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogChangePassword = false" size="large">取消</el-button>
              <el-button type="primary" @click="dialogChangePassword = false" size="large">
                提交
              </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 修改密码弹窗结束 -->
        <div class="bottom-box">
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
          <el-button class="login-button" @click="changeUserCnf" color="#5e4dcd" size="large">
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
  import { logout } from '@/http/api/users'
  import { messageAlerts } from '@/utils/tip'

  export default defineComponent({
    components: { draggable },
    async setup() {
      const data = reactive({
        drag: false,
        dialogVisible: false,
        dialogChangePassword: false,
        dialogChangePhone: false,
        value: '',
        userEmailFlg: true,
        userNameFlg: true,
        showPSW1: false,
        showPSW2: false,
        showPSW3: false,
        passwordInfo: {
          oldPassword: '',
          newPasswordTest: '',
          newPassword: ''
        },
        myArray: [
          { id: 1, value: 'baidu' },
          { id: 2, value: 'google' }
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
      changeUserCnf() {
        console.log('myArray :>> ', this.myArray)
      },
      // 退出登录
      signOut() {
        logout().then((res) => {
          messageAlerts({ ...res })
          if (res.errno == 2002) {
            loginStatus.singOut()
            setTimeout(() => {
              this.$router.push({
                name: 'home'
              })
            }, 2000)
          }
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
        align-items: center;
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

  .input-group {
    max-width: 350px;
    min-height: 85px;
    margin: 0 auto;
    padding: 0.8rem 0;
    position: relative;
    .input {
      box-sizing: border-box;
      min-width: 350px;
      height: 45px;
      background-color: #05060f0a;
      border-radius: 0.5rem;
      padding: 0 1rem;
      border: 2px solid transparent;
      font-size: 1rem;
      transition: border-color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s, color,
        3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s,
        background 0.2s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
      &:hover,
      &:focus,
      .input-group:hover .input {
        outline: none;
        border-color: #05060f;
      }
    }
    .input::-webkit-input-placeholder {
      font-size: 12px;
    }

    .label {
      display: block;
      margin-bottom: 0.3rem;
      font-size: 0.9rem;
      font-weight: bold;
      color: #05060f99;
      transition: color 0.3s cubic-bezier(0.25, 0.01, 0.25, 1) 0s;
    }
    &:hover .label,
    .input:focus {
      color: #05060fc2;
    }
    .show-or-hide-icon {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      right: 15px;
      top: 45px;
    }
  }
  .message {
    font-size: 10px;
    color: red;
    a {
      color: #28a1f7;
      &:hover {
        color: #28a1f7b9;
      }
    }
  }
</style>

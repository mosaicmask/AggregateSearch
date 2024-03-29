/**
 * @description 用户登录状态的管理文件
 * @author mosaic
 */

import { reactive } from 'vue'
import SecureLS from 'secure-ls'
import { messageAlerts } from '@/utils/tip'

// 配置 SecureLS
const ls = new SecureLS({
  encodingType: 'aes', //加密类型
  isCompression: false,
  encryptionSecret: 'encryption' //PBKDF2值
})

// 登录状态

const loginStatus = reactive({
  isLogin: ls.get('_UD') ? true : false,
  verifyLoginTime() {
    // secure-ls封装的获取方法
    const userData = ls.get('_UD')
    if (userData == null) return
    // 如果当前时间>设定时间，视为过期
    if (Date.now() > userData.expire) {
      messageAlerts({
        title: '登录失效',
        message: '登录状态已过期，请重新登录',
        type: 'warning'
      })
      // 清除缓存
      ls.removeAll()
    }
  },
  setLoginTime(data) {
    // 设定失效时间 （测试：60*1000一分钟； 正式：24 * 60 * 60 * 1000 一天）
    Object.assign(data, { expire: Date.now() + 24 * 60 * 60 * 1000 })
    //设置localStorage保存到本地，第一个为变量名，第二个是值
    ls.set('_UD', data)
  },
  // 清除登录状态
  singOut() {
    // 清除缓存
    ls.removeAll()
  },
  // 获取用户信息
  getUserInfo() {
    const userData = ls.get('_UD')
    return userData
  }
})

export { loginStatus }

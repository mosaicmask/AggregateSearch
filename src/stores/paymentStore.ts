/**
 * @description 用户支付状态的管理文件
 * @author mosaic
 */

import { reactive } from 'vue'
// import { messageAlerts } from '@/utils/tip'

// 存储支付数据
const paymentStore = reactive({
  // 存储用户支付数据
  setPaymentData(data) {
    sessionStorage.setItem('_PD', JSON.stringify(data))
  },
  // 获取用户支付数据
  getPaymentData() {
    const result = sessionStorage.getItem('_PD') as string
    return JSON.parse(result)
  }
})

export { paymentStore }

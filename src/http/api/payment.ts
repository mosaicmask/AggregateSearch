/**
 * @description AI问答相关的后端接口
 * @author mosaic
 */

import { axios } from '../axios'

// 获取支付码
export const getQRCode = async (prompt) => {
  return await axios({
    url: '/api/payment/getQRCode',
    method: 'post',
    data: {
      ...prompt
    }
  })
    .then((res) => res.data)
    .catch((error: any) => {
      if (!error.isCancel) {
        //错误数据处理
        console.log(error.message)
      }
    })
}

// 获取支付状态
export const getPaymentStatus = async (prompt) => {
  return await axios({
    url: '/api/payment/getPaymentStatus',
    method: 'post',
    data: {
      ...prompt
    }
  })
    .then((res) => res)
    .catch((error: any) => {
      if (!error.isCancel) {
        //错误数据处理
        console.log(error.message)
      }
    })
}

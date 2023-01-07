/**
 * @description 用户相关的后端接口
 * @author mosaic
 */

import { axios } from '../axios'

// getJson Data
export const isExist = (data) => {
  return axios({
    url: '/api/users/isExist',
    method: 'post',
    data
  })
    .then((res) => res)
    .catch((error: any) => {
      if (!error.isCancel) {
        //错误数据处理
        console.log(error.message)
      }
    })
}
/**
 * @description 注册接口
 * @param {any} params
 * @return {*}
 */
export const register = (params) => {
  const { userEmail, userPassword, receiptCode } = params
  return axios({
    url: '/api/users/register',
    method: 'post',
    data: {
      userEmail,
      userPassword,
      receiptCode
    }
  }).then((res) => res)
}

/**
 *
 * @description 获取图形校验码
 * @return {string}
 */
export const getCaptcha = async () => {
  const res = await axios({
    url: '/api/users/captcha',
    method: 'get'
  }).then((res) => {
    return res.data
  })
  return res
}

export const getEmailCode = async (params) => {
  const res = await axios({
    url: '/api/users/sendEmailCode',
    method: 'post',
    data: {
      toEmail: params.userEmail
    }
  }).then((res) => res)
  return res
}

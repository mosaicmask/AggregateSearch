/**
 * @description 用户相关的后端接口
 * @author mosaic
 */

import { axios } from '../axios'

/**
 *
 * 用户(邮箱||手机号)是否存在
 * @param {object} data
 * @return {*}
 */
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
export const userLogin = async (params) => {
  const { userEmail, userPassword, userPhone, receiptCode } = params
  return axios({
    url: '/api/users/login',
    method: 'post',
    data: {
      userEmail,
      userPassword,
      userPhone,
      receiptCode
    }
  }).then((res) => res)
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
  return await axios({
    url: '/api/users/captcha',
    method: 'get'
  }).then((res) => {
    console.log('res.data :>> ', res.data)
    return res.data
  })
}
/**
 *
 * 发送邮箱验证码
 * @param {string} userEmail
 * @return {*}
 */
export const getEmailCode = async (userEmail) => {
  return await axios({
    url: '/api/users/sendEmailCode',
    method: 'post',
    data: {
      // 接收邮箱
      toEmail: userEmail
    }
  }).then((res) => res)
}

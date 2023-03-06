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
/**
 *
 * 用户登录
 * @param {*} params
 * @return {*}
 */

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
  const { userEmail, userPhone, userPassword, receiptCode } = params

  return axios({
    url: '/api/users/register',
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
 *
 * @description 获取图形校验码
 * @return {string}
 */
export const getCaptcha = async () => {
  return await axios({
    url: '/api/users/captcha',
    method: 'get'
  }).then((res) => {
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

/**
 *
 * 发送手机校验码
 * @param {*} userPhone
 * @return {*}
 */
export const getPhoneCheckCode = async (userPhone) => {
  return await axios({
    url: '/api/users/sendPhoneCode',
    method: 'post',
    data: {
      //接收手机
      toPhoneNumber: userPhone
    }
  }).then((res) => res)
}

/**
 *
 * 退出登录
 * @return {*}
 */
export const logout = async () => {
  return await axios({
    url: '/api/users/logout',
    method: 'post'
  }).then((res) => res)
}

/**
 *
 * 获取用户搜索引擎配置文件
 * @return {*}
 */
export const getEngineConf = async () => {
  return await axios({
    url: 'api/users/engineConf',
    method: 'get'
  }).then((res) => res)
}

/**
 *
 * 修改用户搜索引擎配置文件
 * @return {*}
 */
export const changeEngineConf = async (params) => {
  const { firstEngine, lastEngine } = params
  return await axios({
    url: 'api/users/modifyEngineConf',
    method: 'patch',
    data: { firstEngine, lastEngine }
  }).then((res) => res)
}

/**
 *
 * 修改用户密码
 * @param {*} params
 * @return {*}
 */
export const changePassword = async (params) => {
  const { oldPassword, newPassword } = params
  return await axios({
    url: 'api/users/modifyPassword',
    method: 'patch',
    data: { oldPassword, newPassword }
  })
}

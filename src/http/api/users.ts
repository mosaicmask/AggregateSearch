/**
 * @description 用户相关的后端接口
 * @author mosaic
 */

import { axios } from '../axios'
interface FormData {
  userEmail: string
  captchaText: string
  userPhoneNum: string
  userPassword: string
  scendPassword: string
  receiptCode: string
  agree: boolean
}
// getJson Data
export const getJsonData = () => {
  return axios({
    url: '/api/json',
    method: 'get'
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
export const register = (params: FormData) => {
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

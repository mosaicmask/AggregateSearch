import { axios } from '../axios'

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
export const register = (params: any) => {
  return axios({
    url: '/api/users/login',
    method: 'post',
    data: {
      userName: params.userName,
      password: params.password
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

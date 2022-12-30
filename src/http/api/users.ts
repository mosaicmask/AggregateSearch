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
 *
 *
 * @param {*} params
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
  }).then((res) => {
    return res
  })
}

/**
 * @description 爬虫相关的后端接口
 * @author mosaic
 */

import { axios } from '../axios'

/**
 *
 * 爬取搜狗搜索数据
 * @param {object} data
 * @return {*}
 */
export const crawlingSouGouData = (data) => {
  return axios({
    url: '/api/reptile/SouGo',
    method: 'get',
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
 * 爬取bing搜索数据
 * @param {object} data
 * @return {*}
 */
export const crawlingBingData = (data) => {
  return axios({
    url: '/api/reptile/bing',
    method: 'get',
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
 * 爬取百度搜索数据
 * @param {object} data
 * @return {*}
 */
export const crawlingBaiduData = (data) => {
  return axios({
    url: '/api/reptile/baidu',
    method: 'get',
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
 * 爬取google搜索数据
 * @param {object} data
 * @return {*}
 */
export const crawlingGoogleData = (data) => {
  return axios({
    url: '/api/reptile/google',
    method: 'get',
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

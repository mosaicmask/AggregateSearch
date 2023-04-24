/**
 * @description 技术文档相关的后端接口（请求本地json）
 * @author mosaic
 */

import { axios } from '../axios'

// 获取文档列表
export const getDocumentList = async () => {
  return await axios({
    url: '../data/documentation.json',
    method: 'get'
  })
    .then((res) => res)
    .catch((error) => {
      console.log('error :>> ', error)
    })
}

// 获取文档搜索结果
export const getItemDocumentList = async (key) => {
  return await axios({
    url: '../data/documentation.json',
    method: 'get'
  })
    .then((res) => {
      const obj = {
        DEV: [],
        UI: []
      }
      // 使用关键字过滤数据
      obj.DEV = res.DEV.filter((item) => {
        console.log('item.name :>> ', item.name)
        return !item.name.toLowerCase().indexOf(key.toLowerCase())
      })
      obj.UI = res.UI.filter((item) => {
        return !item.name.toLowerCase().indexOf(key.toLowerCase())
      })
      return obj
    })
    .catch((error) => {
      console.log('error :>> ', error)
    })
}

/**
 * @description 搜索结果的存储仓库
 * @author mosaic
 */
import { reactive } from 'vue'
import {
  crawlingSouGouData,
  crawlingBingData,
  crawlingBaiduData,
  crawlingGoogleData
} from '@/http/api/reptile'

interface SearchData {
  // errno: number
  [key: string]: string
}

interface CrawlingData {
  keyword: string
  soGouData: SearchData[]
  bingData: SearchData[]
  baiduData: SearchData[]
  googleData: SearchData[]
  getSouGouData: Function
  getGoogleData: Function
  getBingData: Function
  getBaiduData: Function
  init: Function
  setHighLight: Function
  resolveKeywords: Function
}

const crawlingData = reactive<CrawlingData>({
  keyword: '',
  soGouData: [],
  baiduData: [],
  bingData: [],
  googleData: [],
  async getSouGouData(keyword) {
    this.keyword = keyword
    const res = await crawlingSouGouData({ keyword: this.keyword })
    this.soGouData = res?.data
    if (!res?.data.errno) await this.init(this.soGouData)
  },

  async getBingData(keyword) {
    this.keyword = keyword
    const res = await crawlingBingData({ keyword: this.keyword })
    this.bingData = res?.data
    if (!res?.data.errno) await this.init(this.bingData)
  },
  async getBaiduData(keyword) {
    this.keyword = keyword
    const res = await crawlingBaiduData({ keyword: this.keyword })
    this.baiduData = res?.data
    if (!res?.data.errno) await this.init(this.baiduData)
  },
  async getGoogleData(keyword) {
    this.keyword = keyword
    const res = await crawlingGoogleData({ keyword: this.keyword })
    this.googleData = res?.data
    if (!res?.data.errno) await this.init(this.googleData)
  },
  init(data) {
    console.log('data :>> ', data)
    const resKeywords = this.resolveKeywords(`${this.keyword} `) || []
    data.map((item, index) => {
      // 高亮关键字中的英文
      resKeywords?.englishKeywords.forEach((itemKeywords) => {
        this.setHighLight({ itemKeywords, item, index, data })
      })
      // 高亮关键字中的中文
      resKeywords?.chineseKeywords.forEach((itemKeywords) => {
        this.setHighLight({ itemKeywords, item, index, data })
      })
    })
  },

  // 设置高亮
  setHighLight({ itemKeywords, item, index, data }) {
    /**
     * 使用正则表达式进行全文匹配关键词
     * ig : 表示 全文查找 ,忽略大小写
     *  i : 忽略大小写
     *  g : 全文查找
     *
     * 使用字符串的replace方法进行替换
     * stringObject.replace('被替换的值',替换的值)
     */
    const replaceReg = new RegExp(itemKeywords, 'ig')
    const replaceString = `<span style="color: #ed4014">${itemKeywords}</span>`
    data[index].title = item.title.replace(replaceReg, replaceString)
    data[index].caption = item.caption.replace(replaceReg, replaceString)
  },

  // 解析关键字
  resolveKeywords(keywords) {
    // 如果关键字 包含字母和数字 如何实现高亮 （实现中）
    const chineseReg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
    const englishReg = new RegExp('[\\x00-\\xff]+', 'g')
    const chineseKeywords: string[] = []
    const englishKeywords: string[] = []
    if (englishReg.test(keywords)) {
      // 截取英文(包括空格)
      const getEnglish = /[\x00-\xff|\u0020|\u2002|\u2003]/g
      const arr: string[] = []
      keywords.match(getEnglish).forEach((item) => {
        // 以空格为间隔，遇到空格就将之之前push的字符用join组合起来，随后清空数组
        if (item == ' ') {
          if (!arr.length) return
          const text = arr.join('')
          arr.splice(0, arr.length)
          englishKeywords.push(text)
          return
        }
        arr.push(item)
      })
    }
    if (chineseReg.test(keywords)) {
      //  截取中文(包括空格)
      const getChinese = /[\u4e00-\u9fa5|\u0020|\u2002|\u2003]/g
      const arr: string[] = []
      keywords.match(getChinese).forEach((item) => {
        // 以空格为间隔，遇到空格就将之之前push的字符用join组合起来，随后清空数组
        if (item == ' ') {
          if (!arr.length) return
          const text = arr.join('')
          arr.splice(0, arr.length)
          chineseKeywords.push(text)
          return
        }
        arr.push(item)
      })
    }
    return {
      englishKeywords,
      chineseKeywords
    }
  }
})

export { crawlingData }

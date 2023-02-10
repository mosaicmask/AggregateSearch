/**
 * @description 用户搜索引擎配置数据的管理文件
 * @author mosaic
 */
import { reactive } from 'vue'
import SecureLS from 'secure-ls'

// 配置 SecureLS
const ls = new SecureLS({
  encodingType: 'aes', //加密类型
  isCompression: false,
  encryptionSecret: 'encryption' //PBKDF2值
})

// 存储注册数据
const engineConfData = reactive({
  data: ls.get('_USC'),
  removeEngineConfData() {
    ls.removeAll()
  },
  setEngineConfData({ firstEngine, lastEngine }) {
    //设置localStorage保存到本地，第一个为变量名，第二个是值
    ls.set('_USC', { firstEngine, lastEngine })
  }
})

export { engineConfData }

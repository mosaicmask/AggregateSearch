/**
 * @description AI问答相关的后端接口
 * @author mosaic
 */

import { axios } from '../axios'

export const getChatResponse = async (prompt) => {
  return await axios({
    url: '/api/chat/chatGPT',
    method: 'post',
    data: {
      prompt
    }
  })
    .then((res) => res)
    .catch((error) => {
      console.log('error :>> ', error)
    })
}

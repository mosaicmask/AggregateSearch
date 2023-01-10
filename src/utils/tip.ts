/**
 * @description 操作提示的封装
 * @author mosaic
 */
import { ElNotification } from 'element-plus'
/**
 *
 *
 * @param {string} title
 * @param {string} message
 * @param {string} type  //success、warning、info、error
 */
const messageAlerts = ({ title, message, type }) => {
  ElNotification({
    title,
    message,
    type,
    offset: 100
  })
}

export { messageAlerts }

/**
 * @description 表单验证的封装 (可以进行数据类型标注的优化)
 * @author mosaic
 */
import { emailRegex, phoneNoRegex, pwdRegex } from './regex'

export class FormFormatCheck {
  checkEmail({ userEmail, message }) {
    if (!userEmail) {
      message.emailTipMessage = '请先输入邮箱'
      return false
    }
    if (!emailRegex.test(userEmail)) {
      message.emailTipMessage = '请输入正确的邮箱'
      return false
    }
    return true
  }
  checkPhone({ userPhone, message }) {
    if (!phoneNoRegex.test(userPhone)) {
      message.phoneTipMessage = '请输入正确的手机号'
      return false
    }
    // this.checkUser({ message, userPhone: userPhone, userEmail: '', showLoginText, exist })
    return true
  }
  checkCaptcha({ captchaText, message, captcha }) {
    if (captchaText != captcha.value.text) {
      message.captchaTextTipMessage = '请检查验证码是否输入正确'
      return false
    }
    message.captchaTextTipMessage = ''
    return true
  }
  checkPassword({ userPassword, message }) {
    if (!pwdRegex.test(userPassword)) {
      message.PasswordTipMessage = '请检查密码格式是否正确'
      return false
    }
    message.PasswordTipMessage = ''
    return true
  }
  checkScendPassword({ scendPassword, message, userPassword }) {
    if (scendPassword != userPassword) {
      message.scendPasswordTipMessage = '两次输入密码不一致'
      return false
    }
    message.scendPasswordTipMessage = ''
    return true
  }
  checkReceiptCode({ receiptCode, message }) {
    if (!receiptCode) {
      message.receiptCodeTipMessage = '请输入回执码'
      return false
    }
    message.receiptCodeTipMessage = ''
    return true
  }
}

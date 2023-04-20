// 定义回调函数类型
type CallBackFun<T extends unknown[]> = (...args: T) => void
// 节流函数
export function throttle<T extends unknown[]>(fun: CallBackFun<T>, time: number) {
  let flag = 0
  return function (this: Object, ...args: T) {
    const now = new Date().valueOf()
    if (now - flag >= time) {
      fun.apply(this, args)
      flag = now
    }
  }
}

import { createApp } from 'vue'
import 'normalize.css'
import './assets/icons/iconfont.css'
import './assets/icons/iconfont.js'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import App from './App.vue'
import router from './router/index'
// A "safe" replacement for the v-html directive. The HTML code is sanitized with DOMPurify before being interpreted.
import VueDOMPurifyHTML from 'vue-dompurify-html'

createApp(App)
  .use(router)
  .use(VueDOMPurifyHTML)
  .use(ElementPlus, { size: 'small', zIndex: 3000 })
  .mount('#app')


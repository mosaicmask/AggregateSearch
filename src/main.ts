import { createApp } from 'vue'
import 'normalize.css'
import './assets/icons/iconfont.css'
import './assets/icons/iconfont.js'
import App from './App.vue'
import router from './router/index'
// A "safe" replacement for the v-html directive. The HTML code is sanitized with DOMPurify before being interpreted.
import VueDOMPurifyHTML from 'vue-dompurify-html'

createApp(App).use(router).use(VueDOMPurifyHTML).mount('#app')

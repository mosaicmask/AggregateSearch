import { createApp } from 'vue'
import 'normalize.css'
import './assets/icons/iconfont.css'
import './assets/icons/iconfont.js'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 5432,
    proxy: {
      '/api': {
        target: 'http://localhost:7001', // 代理的目标地址
        changeOrigin: true // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
      },
      '/reptile': {
        target: 'http://120.78.147.100:9001', // 代理的目标地址
        changeOrigin: true // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 引入全局css⬇️！！！！
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/variable.scss" as *;'
      }
    }
  }
})

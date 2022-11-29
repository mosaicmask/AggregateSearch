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
    strictPort: true, // 端口被占用直接退出
    https: false,
    open: true, // 在开发服务器启动时自动在浏览器中打开应用程序
    proxy: {
      '/api': {
        target: 'http://localhost:7001', // 代理的目标地址
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
        additionalData: '@use "@/assets/style/global.scss" as *;'
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500, // 分块打包，分解块，将大块分解成更小的块
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})

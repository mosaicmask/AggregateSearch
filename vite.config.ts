import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { loadEnv } from 'vite'
import path from 'path'
// 路径
const pathSrc = path.resolve(__dirname, 'src')
export default ({ command, mode }) => {
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue'],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [ElementPlusResolver()],

        dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),

      Components({
        resolvers: [
          // Auto register Element Plus components

          ElementPlusResolver()
        ],

        dts: path.resolve(pathSrc, 'components.d.ts')
      })
    ],
    server: {
      host: '127.0.0.1',
      //port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      port: 6001,
      strictPort: true, // 端口被占用直接退出
      https: false,
      open: true, // 在开发服务器启动时自动在浏览器中打开应用程序
      proxy: {
        '/api': {
          target: 'http://localhost:3030', // 代理的目标地址
          changeOrigin: true // 开发模式，默认的origin是真实的 origin:localhost:3000 代理服务会把origin修改为目标地址
        },
        // 字符串简写写法
        '^/api': {
          target:
            mode === 'development'
              ? loadEnv(mode, process.cwd()).VITE_APP_DEV_URL
              : loadEnv(mode, process.cwd()).VITE_APP_PROD_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      hmr: {
        overlay: false // 屏蔽服务器报错
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
          additionalData: '@use "@/assets/style/index.scss" as *;'
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
}

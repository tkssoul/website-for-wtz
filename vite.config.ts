import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ArcoResolver()],
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    // GZIP 压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // 分包配置
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router'],
          'arco-vendor': ['@arco-design/web-vue'],
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        chunkFileNames: 'static/js/[name]-[hash].js',
        // 用于输出静态资源的命名
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
    // 启用 CSS 代码分离
    cssCodeSplit: true,
    // 启用源码映射
    sourcemap: false,
    // 启用 brotli 压缩大小报告
    reportCompressedSize: false,
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 2000,
  },
  // 开发服务器配置
  server: {
    hmr: true,
    host: true,
    port: 5173,
  },
  // 预构建配置
  optimizeDeps: {
    include: ['vue', '@arco-design/web-vue'],
  },
})

import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url'; //追加

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  // パスにエイリアスを設定する記述を追加
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/lib-main.js'),
      name: 'SimplePianoKeyboard',
      fileName: (format) => `simple-piano-keyboard.${format}.js`,
      formats: ['es', 'umd', 'cjs'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
